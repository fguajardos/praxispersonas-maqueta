// ============================================
// CV Parser v2 - Agente de IA para extraccion
// de datos desde CV en formato PDF
// ============================================

// ---- CONFIGURACION ----
// Proveedores de IA disponibles (todos con planes gratuitos):
//   'groq'    - Gratis. Obtener key en: https://console.groq.com (Llama 3.3 70B)
//   'gemini'  - Gratis. Obtener key en: https://aistudio.google.com/apikey
//   'claude'  - De pago. Key en: https://console.anthropic.com
//   'local'   - Sin API, usa parser regex (menos preciso)
const CV_PARSER_CONFIG = {
    PROVIDER: 'groq',
    API_KEY: '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',

    // Modelos por proveedor (no modificar a menos que sepas lo que haces)
    MODELS: {
        groq: 'llama-3.3-70b-versatile',
        gemini: 'gemini-2.0-flash',
        claude: 'claude-sonnet-4-20250514'
    }
};

// ============================================
// 1. EXTRACTOR DE TEXTO DESDE PDF
// ============================================
async function extractTextFromPDF(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const typedArray = new Uint8Array(e.target.result);
                const pdf = await pdfjsLib.getDocument(typedArray).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    // Reconstruir texto respetando posiciones Y para detectar saltos de linea
                    let lastY = null;
                    let line = '';
                    textContent.items.forEach(item => {
                        const y = Math.round(item.transform[5]);
                        if (lastY !== null && Math.abs(y - lastY) > 5) {
                            fullText += line.trim() + '\n';
                            line = '';
                        }
                        line += item.str + ' ';
                        lastY = y;
                    });
                    fullText += line.trim() + '\n\n';
                }
                resolve(fullText);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// ============================================
// 2. PARSER LOCAL MEJORADO
// ============================================
function parseCV_Local(rawText) {
    const data = {
        nombre: '',
        email: '',
        telefono: '',
        experiencias: [],
        formaciones: [],
        habilidades: [],
        motivacion: ''
    };

    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const fullText = lines.join('\n');

    // ---- PASO 1: Extraer datos de contacto (parte superior del CV) ----
    extractContactInfo(lines, fullText, data);

    // ---- PASO 2: Identificar TODAS las secciones del CV ----
    const sections = identifySections(lines);

    // ---- PASO 3: Procesar cada seccion segun su tipo ----
    for (const section of sections) {
        if (section.type === 'experience') {
            data.experiencias = parseExperienceSection(section.lines);
        } else if (section.type === 'education') {
            data.formaciones = parseEducationSection(section.lines);
        } else if (section.type === 'skills') {
            data.habilidades = parseSkillsSection(section.lines);
        }
    }

    // ---- PASO 4: Generar motivacion si hay datos ----
    if (data.experiencias.length > 0) {
        const lastJob = data.experiencias[0];
        data.motivacion = `Profesional con experiencia como ${lastJob.cargo}${lastJob.empresa ? ' en ' + lastJob.empresa : ''}, busco aportar mis conocimientos y seguir desarrollandome profesionalmente en nuevos desafios.`;
    }

    return data;
}

// ---- Extraccion de datos de contacto ----
function extractContactInfo(lines, fullText, data) {
    // Email
    const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) data.email = emailMatch[0].toLowerCase();

    // Telefono
    const phonePatterns = [
        /\+?56\s*9\s*\d{4}\s*\d{4}/,
        /\+?56\s*\d\s*\d{4}\s*\d{4}/,
        /9\s?\d{4}\s?\d{4}/,
        /\(\d{2,3}\)\s*\d{3,4}[-\s]?\d{4}/,
        /\d{9,12}/
    ];
    for (const pattern of phonePatterns) {
        const match = fullText.match(pattern);
        if (match) {
            let phone = match[0].replace(/[\s\-+()]/g, '');
            if (phone.startsWith('56')) phone = phone.substring(2);
            if (phone.length >= 9 && phone.length <= 12) {
                data.telefono = phone;
                break;
            }
        }
    }

    // Nombre: buscar en las primeras 5 lineas, excluyendo lineas que sean email, telefono, direccion o headers
    const contactKeywords = /email|correo|telefono|fono|cel|movil|linkedin|github|direccion|santiago|chile|@|\d{7,}/i;
    const sectionKeywords = /^(resumen|experiencia|formacion|educacion|habilidades|perfil|objetivo|competencia)/i;

    for (let i = 0; i < Math.min(lines.length, 6); i++) {
        const line = lines[i];
        if (contactKeywords.test(line)) continue;
        if (sectionKeywords.test(line)) continue;
        if (line.length < 5 || line.length > 70) continue;
        // Verificar que parece un nombre (al menos 2 palabras, mayormente letras)
        const cleaned = line.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').trim();
        const words = cleaned.split(/\s+/).filter(w => w.length > 1);
        if (words.length >= 2 && words.length <= 6) {
            data.nombre = titleCase(cleaned);
            break;
        }
    }
}

// ---- Identificacion de secciones ----
function identifySections(lines) {
    const sections = [];
    const sectionPatterns = {
        experience: [
            /^experiencia\s*(laboral|profesional)?$/i,
            /^work\s*experience$/i,
            /^historial\s*laboral$/i,
            /^trayectoria\s*(laboral|profesional)?$/i,
            /^employment(\s*history)?$/i
        ],
        education: [
            /^formaci[oó]n\s*(acad[eé]mica)?$/i,
            /^educaci[oó]n$/i,
            /^estudios$/i,
            /^academic/i,
            /^education$/i,
            /^antecedentes\s*acad[eé]micos$/i
        ],
        skills: [
            /^habilidades\s*(t[eé]cnicas)?$/i,
            /^competencias/i,
            /^conocimientos/i,
            /^skills$/i,
            /^herramientas/i,
            /^technical\s*skills$/i
        ],
        summary: [
            /^resumen\s*(profesional|ejecutivo)?$/i,
            /^perfil\s*(profesional)?$/i,
            /^objetivo\s*(profesional)?$/i,
            /^sobre\s*m[ií]$/i,
            /^summary$/i,
            /^profile$/i
        ]
    };

    let currentSection = null;
    let currentLines = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const normalizedLine = line.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

        // Detectar si esta linea es un header de seccion
        let detectedType = null;
        for (const [type, patterns] of Object.entries(sectionPatterns)) {
            for (const pattern of patterns) {
                if (pattern.test(normalizedLine) || pattern.test(line)) {
                    detectedType = type;
                    break;
                }
            }
            if (detectedType) break;
        }

        // Tambien detectar headers por formato: linea corta en mayusculas
        if (!detectedType && line === line.toUpperCase() && line.length > 4 && line.length < 50) {
            const upper = normalizedLine.toUpperCase();
            if (/EXPERIENCIA/.test(upper)) detectedType = 'experience';
            else if (/FORMACION|EDUCACION|ACADEMICA|ESTUDIOS/.test(upper)) detectedType = 'education';
            else if (/HABILIDAD|COMPETENCIA|CONOCIMIENTO/.test(upper)) detectedType = 'skills';
            else if (/RESUMEN|PERFIL|OBJETIVO/.test(upper)) detectedType = 'summary';
        }

        if (detectedType) {
            // Guardar seccion anterior
            if (currentSection && currentLines.length > 0) {
                sections.push({ type: currentSection, lines: [...currentLines] });
            }
            currentSection = detectedType;
            currentLines = [];
        } else if (currentSection) {
            currentLines.push(line);
        }
    }

    // Guardar ultima seccion
    if (currentSection && currentLines.length > 0) {
        sections.push({ type: currentSection, lines: [...currentLines] });
    }

    return sections;
}

// ---- Parser de experiencia laboral ----
function parseExperienceSection(lines) {
    const entries = [];
    const text = lines.join('\n');

    // Estrategia: buscar bloques que contengan cargo|empresa + fechas
    // Patron comun: "Cargo | Empresa  Fecha - Fecha"
    const blocks = splitIntoBlocks(lines);

    for (const block of blocks) {
        const blockText = block.join('\n');
        const entry = {
            empresa: '',
            cargo: '',
            fecha_inicio: '',
            fecha_fin: '',
            a_la_fecha: false,
            motivo_termino: 'Renuncia voluntaria'
        };

        // Buscar fechas en el bloque
        const dateInfo = extractDates(blockText);
        if (!dateInfo.found) continue; // Sin fechas, probablemente no es una experiencia

        entry.fecha_inicio = dateInfo.start;
        entry.fecha_fin = dateInfo.end;
        entry.a_la_fecha = dateInfo.current;
        if (dateInfo.current) entry.motivo_termino = 'A la fecha';

        // Buscar cargo y empresa
        // Patron 1: "Cargo | Empresa" en la primera linea
        const firstLine = block[0] || '';
        const pipeMatch = firstLine.match(/^(.+?)\s*[|]\s*(.+?)$/);
        if (pipeMatch) {
            entry.cargo = cleanJobText(pipeMatch[1]);
            entry.empresa = cleanJobText(pipeMatch[2]);
        } else {
            // Patron 2: Cargo en una linea, empresa en otra (o viceversa)
            // La primera linea suele ser el cargo o "Cargo | Empresa Fechas"
            const lineWithoutDates = firstLine.replace(/\b(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+\d{4}\b/gi, '')
                .replace(/\b\d{4}\s*[-–]\s*(?:\d{4}|actualidad|presente|actual)\b/gi, '')
                .replace(/\b(?:ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\.?\s*\d{4}\b/gi, '')
                .trim();

            const parts = lineWithoutDates.split(/\s*[|–-]\s*/);
            if (parts.length >= 2) {
                entry.cargo = cleanJobText(parts[0]);
                entry.empresa = cleanJobText(parts[1]);
            } else {
                entry.cargo = cleanJobText(lineWithoutDates);
                // Buscar empresa en segunda linea
                if (block.length > 1) {
                    const secondLine = block[1].replace(/^[-•·]\s*/, '').trim();
                    // Si la segunda linea no empieza con "-" (descripcion) y es corta, es empresa
                    if (!secondLine.startsWith('-') && secondLine.length < 60 && !extractDates(secondLine).found) {
                        entry.empresa = cleanJobText(secondLine);
                    }
                }
            }
        }

        if (entry.cargo || entry.empresa) {
            entries.push(entry);
        }
    }

    return entries;
}

// ---- Parser de formacion academica ----
function parseEducationSection(lines) {
    const entries = [];
    const blocks = splitIntoBlocks(lines);

    for (const block of blocks) {
        const blockText = block.join('\n');
        const entry = {
            formacion: '',
            institucion: '',
            fecha_ingreso: '',
            fecha_egreso: ''
        };

        const dateInfo = extractDates(blockText);

        // Patron: "Titulo | Institucion (Fechas)"
        const firstLine = block[0] || '';
        const pipeMatch = firstLine.match(/^(.+?)\s*[|]\s*(.+?)$/);

        if (pipeMatch) {
            entry.formacion = cleanJobText(pipeMatch[1]).replace(/\(.*?\)/g, '').trim();
            entry.institucion = cleanJobText(pipeMatch[2]).replace(/\(.*?\)/g, '').trim();
        } else {
            // Linea completa: "Titulo en Institucion (fechas)"
            const lineClean = firstLine.replace(/^[-•·]\s*/, '').trim();
            // Intentar separar por | o por "en" o por parentesis
            const dashParts = lineClean.split(/\s*[|]\s*/);
            if (dashParts.length >= 2) {
                entry.formacion = cleanJobText(dashParts[0]);
                entry.institucion = cleanJobText(dashParts[1]).replace(/\(.*?\)\.?/g, '').trim();
            } else {
                entry.formacion = cleanJobText(lineClean)
                    .replace(/\(.*?\)/g, '')
                    .replace(/\b\d{4}\b/g, '')
                    .replace(/[-–]\s*$/, '')
                    .trim();
                // Buscar institucion en segunda linea
                if (block.length > 1) {
                    const secondLine = block[1].replace(/^[-•·]\s*/, '').trim();
                    if (secondLine.length < 80 && !secondLine.startsWith('-')) {
                        entry.institucion = cleanJobText(secondLine).replace(/\(.*?\)/g, '').trim();
                    }
                }
            }
        }

        if (dateInfo.found) {
            entry.fecha_ingreso = dateInfo.start;
            entry.fecha_egreso = dateInfo.end;
        }

        // Solo agregar si tiene al menos formacion
        if (entry.formacion && entry.formacion.length > 3) {
            entries.push(entry);
        }
    }

    return entries;
}

// ---- Parser de habilidades ----
function parseSkillsSection(lines) {
    const skills = [];
    for (const line of lines) {
        const clean = line.replace(/^[-•·]\s*/, '').trim();
        if (clean.length < 3) continue;
        // Si tiene ":" es "Categoria: valor1, valor2"
        if (clean.includes(':')) {
            const parts = clean.split(':');
            if (parts.length === 2) {
                parts[1].split(/[,;]/).forEach(s => {
                    const skill = s.trim();
                    if (skill.length > 1 && skill.length < 60) skills.push(skill);
                });
            }
        } else {
            clean.split(/[,;]/).forEach(s => {
                const skill = s.trim();
                if (skill.length > 1 && skill.length < 60) skills.push(skill);
            });
        }
    }
    return skills;
}

// ============================================
// UTILIDADES DEL PARSER
// ============================================

function splitIntoBlocks(lines) {
    // Divide las lineas en bloques logicos
    // Un nuevo bloque comienza cuando: hay una linea vacia, o una linea con fecha, o un patron cargo|empresa
    const blocks = [];
    let current = [];

    for (const line of lines) {
        const isNewEntry = (
            (line === '') ||
            /\|\s/.test(line) && extractDates(line).found || // Cargo | Empresa con fecha
            /\b\d{4}\s*[-–]\s*(actualidad|presente|actual|\d{4})\b/i.test(line) && current.length > 0 // Linea con rango de fechas
        );

        // Detectar patron "Titulo | Lugar" como inicio de bloque
        const isPipeHeader = /^[^|]+\|[^|]+$/.test(line) && !line.startsWith('-');

        if ((isNewEntry || isPipeHeader) && current.length > 0) {
            blocks.push([...current]);
            current = [];
        }

        if (line !== '') {
            current.push(line);
        }
    }

    if (current.length > 0) blocks.push(current);
    return blocks;
}

function extractDates(text) {
    const result = { found: false, start: '', end: '', current: false };

    const months = {
        'enero':'01','febrero':'02','marzo':'03','abril':'04','mayo':'05','junio':'06',
        'julio':'07','agosto':'08','septiembre':'09','octubre':'10','noviembre':'11','diciembre':'12',
        'ene':'01','feb':'02','mar':'03','abr':'04','may':'05','jun':'06',
        'jul':'07','ago':'08','sep':'09','oct':'10','nov':'11','dic':'12'
    };

    // Detectar "Actualidad" / "Presente"
    if (/actualidad|presente|actual|a\s*la\s*fecha/i.test(text)) {
        result.current = true;
        result.end = new Date().toISOString().split('T')[0];
    }

    // Patron: "Mes Ano - Mes Ano" o "Mes Ano - Actualidad"
    const monthYearPattern = /\b(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\.?\s*(?:de\s+)?(\d{4})\b/gi;
    const monthYearMatches = [...text.matchAll(monthYearPattern)];

    if (monthYearMatches.length >= 1) {
        result.found = true;
        const m1 = monthYearMatches[0];
        result.start = `${m1[2]}-${months[m1[1].toLowerCase()]}-01`;

        if (monthYearMatches.length >= 2 && !result.current) {
            const m2 = monthYearMatches[1];
            result.end = `${m2[2]}-${months[m2[1].toLowerCase()]}-01`;
        } else if (result.current) {
            // end ya esta seteado
        }
        return result;
    }

    // Patron: "2020 - 2024" o "2020 - Actualidad"
    const yearRangeMatch = text.match(/\b(\d{4})\s*[-–]\s*(\d{4}|actualidad|presente|actual|en\s*curso)\b/i);
    if (yearRangeMatch) {
        result.found = true;
        result.start = `${yearRangeMatch[1]}-03-01`;
        if (/\d{4}/.test(yearRangeMatch[2])) {
            result.end = `${yearRangeMatch[2]}-12-01`;
        } else {
            result.current = true;
            result.end = new Date().toISOString().split('T')[0];
        }
        return result;
    }

    // Patron: "(2020 - 2024)" o "(En curso, 2024 - 2027)"
    const parenDateMatch = text.match(/\(.*?(\d{4})\s*[-–]\s*(\d{4}|actualidad|presente|actual|en\s*curso).*?\)/i);
    if (parenDateMatch) {
        result.found = true;
        result.start = `${parenDateMatch[1]}-03-01`;
        if (/\d{4}/.test(parenDateMatch[2])) {
            result.end = `${parenDateMatch[2]}-12-01`;
        } else {
            result.current = true;
            result.end = new Date().toISOString().split('T')[0];
        }
        return result;
    }

    // Patron simple: solo un ano
    const singleYear = text.match(/\b(20\d{2})\b/);
    if (singleYear) {
        result.found = true;
        result.start = `${singleYear[1]}-03-01`;
    }

    return result;
}

function cleanJobText(text) {
    return text
        .replace(/^[-•·]\s*/, '')
        .replace(/\b(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+\d{4}/gi, '')
        .replace(/\b\d{4}\s*[-–]\s*(actualidad|presente|actual|\d{4})\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function titleCase(str) {
    return str.toLowerCase().split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

// ============================================
// 3. PARSER CON IA (Multi-proveedor)
// ============================================

const CV_EXTRACTION_PROMPT = `Analiza el siguiente texto extraido de un CV/curriculum vitae y extrae la informacion estructurada.

TEXTO DEL CV:
---
{CV_TEXT}
---

Responde UNICAMENTE con JSON valido, sin texto adicional, sin markdown, sin backticks:
{
    "nombre": "Nombre completo",
    "email": "email@ejemplo.com",
    "telefono": "912345678",
    "experiencias": [
        {
            "empresa": "Nombre de la empresa",
            "cargo": "Cargo o puesto",
            "fecha_inicio": "YYYY-MM-DD",
            "fecha_fin": "YYYY-MM-DD",
            "a_la_fecha": true,
            "motivo_termino": "A la fecha"
        }
    ],
    "formaciones": [
        {
            "formacion": "Nombre del titulo o carrera",
            "institucion": "Nombre de la institucion",
            "fecha_ingreso": "YYYY-MM-DD",
            "fecha_egreso": "YYYY-MM-DD"
        }
    ],
    "habilidades": ["skill1", "skill2"],
    "motivacion": "Breve motivacion profesional"
}

REGLAS:
- SEPARA experiencia laboral de formacion academica. Universidades e institutos van en formaciones. Empresas van en experiencias.
- Ordena experiencias de mas reciente a mas antigua
- Si el cargo es actual: a_la_fecha=true, fecha_fin=fecha de hoy (${new Date().toISOString().split('T')[0]})
- motivo_termino: "A la fecha", "Renuncia voluntaria", "Cambio de Cargo" o "Termino de contrato"
- Fechas YYYY-MM-DD, usa dia 01 si no se indica
- telefono: solo numeros, sin +56
- Solo JSON, nada mas`;

async function parseCV_AI(text) {
    const provider = CV_PARSER_CONFIG.PROVIDER;
    const apiKey = CV_PARSER_CONFIG.API_KEY;

    if (!apiKey) {
        console.warn('No API key configured, using local parser');
        return parseCV_Local(text);
    }

    const prompt = CV_EXTRACTION_PROMPT.replace('{CV_TEXT}', text.substring(0, 8000));

    try {
        let responseText;

        if (provider === 'groq') {
            responseText = await callGroq(prompt, apiKey);
        } else if (provider === 'gemini') {
            responseText = await callGemini(prompt, apiKey);
        } else if (provider === 'claude') {
            responseText = await callClaude(prompt, apiKey);
        } else {
            return parseCV_Local(text);
        }

        // Extraer JSON de la respuesta
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            console.log('AI extraction successful:', parsed);
            return parsed;
        }
        throw new Error('No JSON found in AI response');

    } catch (error) {
        console.error(`${provider} API error:`, error);
        showCVStatus('loading', `Error con ${provider}, usando parser local...`);
        return parseCV_Local(text);
    }
}

// ---- GROQ (Gratis - Llama 3.3 70B) ----
async function callGroq(prompt, apiKey) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: CV_PARSER_CONFIG.MODELS.groq,
            messages: [
                { role: 'system', content: 'Eres un experto en extraccion de datos de CVs. Responde SOLO con JSON valido.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.1,
            max_tokens: 4096
        })
    });
    if (!response.ok) throw new Error(`Groq API error: ${response.status} ${await response.text()}`);
    const result = await response.json();
    return result.choices[0].message.content;
}

// ---- GOOGLE GEMINI (Gratis) ----
async function callGemini(prompt, apiKey) {
    const model = CV_PARSER_CONFIG.MODELS.gemini;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 4096 }
        })
    });
    if (!response.ok) throw new Error(`Gemini API error: ${response.status} ${await response.text()}`);
    const result = await response.json();
    return result.candidates[0].content.parts[0].text;
}

// ---- CLAUDE (De pago) ----
async function callClaude(prompt, apiKey) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: CV_PARSER_CONFIG.MODELS.claude,
            max_tokens: 4096,
            messages: [{ role: 'user', content: prompt }]
        })
    });
    if (!response.ok) throw new Error(`Claude API error: ${response.status}`);
    const result = await response.json();
    return result.content[0].text;
}

// ============================================
// 4. FUNCION PRINCIPAL
// ============================================
async function processCV(file) {
    showCVStatus('loading', 'Leyendo el documento PDF...');

    try {
        const text = await extractTextFromPDF(file);

        if (!text || text.trim().length < 50) {
            showCVStatus('error', 'No se pudo extraer texto del PDF. Asegurate de que no sea una imagen escaneada.');
            return null;
        }

        const provider = CV_PARSER_CONFIG.PROVIDER;
        const providerNames = { groq: 'Groq (Llama 3.3)', gemini: 'Google Gemini', claude: 'Claude AI', local: 'parser local' };
        showCVStatus('loading', `Extrayendo datos con ${providerNames[provider] || 'IA'}...`);

        let parsedData;
        if (provider !== 'local' && CV_PARSER_CONFIG.API_KEY) {
            parsedData = await parseCV_AI(text);
        } else {
            await new Promise(resolve => setTimeout(resolve, 1200));
            parsedData = parseCV_Local(text);
        }

        showCVStatus('loading', 'Completando los campos del formulario...');
        await new Promise(resolve => setTimeout(resolve, 600));

        fillFormWithData(parsedData);

        const expCount = parsedData.experiencias ? parsedData.experiencias.length : 0;
        const eduCount = parsedData.formaciones ? parsedData.formaciones.length : 0;
        showCVStatus('success', `CV analizado: ${expCount} experiencias laborales y ${eduCount} formaciones academicas extraidas.`);

        return parsedData;
    } catch (error) {
        console.error('Error processing CV:', error);
        showCVStatus('error', 'Error al procesar el CV. Puedes completar los datos manualmente.');
        return null;
    }
}

// ============================================
// 5. RELLENAR FORMULARIO
// ============================================
function fillFormWithData(data) {
    if (!data) return;

    fillField('field-nombre', data.nombre);
    fillField('field-email', data.email);
    fillField('field-telefono', data.telefono);

    const expContainer = document.getElementById('experience-container');
    if (expContainer && data.experiencias && data.experiencias.length > 0) {
        expContainer.innerHTML = '';
        data.experiencias.forEach((exp, i) => {
            expContainer.innerHTML += createExperienceCard(exp, i);
        });
    }

    const eduContainer = document.getElementById('education-container');
    if (eduContainer && data.formaciones && data.formaciones.length > 0) {
        eduContainer.innerHTML = '';
        data.formaciones.forEach((edu, i) => {
            eduContainer.innerHTML += createEducationCard(edu, i);
        });
    }

    if (data.motivacion) {
        fillField('field-motivacion', data.motivacion);
    }

    animateFilledFields();
}

function fillField(id, value) {
    const field = document.getElementById(id);
    if (field && value) {
        field.value = value;
        field.classList.add('field-filled');
    }
}

function createExperienceCard(exp, index) {
    return `
    <div class="experience-card ${exp.a_la_fecha ? 'current-job' : ''}" data-index="${index}">
        <div class="experience-header">
            <span class="experience-number">${index + 1}</span>
            <span class="experience-title">${exp.a_la_fecha ? 'Experiencia actual' : 'Experiencia anterior'}</span>
            ${index > 0 ? '<button class="btn btn-sm btn-outline-danger ms-auto" onclick="this.closest(\'.experience-card\').remove()"><i class="fas fa-trash"></i> Eliminar</button>' : ''}
        </div>
        <div class="row g-3">
            <div class="col-md-6"><label class="form-label-pp">Empresa</label><input type="text" class="form-control form-control-modern field-filled" value="${esc(exp.empresa)}"></div>
            <div class="col-md-6"><label class="form-label-pp">Cargo</label><input type="text" class="form-control form-control-modern field-filled" value="${esc(exp.cargo)}"></div>
            <div class="col-md-3"><label class="form-label-pp">Fecha Inicio</label><input type="date" class="form-control form-control-modern field-filled" value="${exp.fecha_inicio}"></div>
            <div class="col-md-3"><label class="form-label-pp">Fecha Fin</label><input type="date" class="form-control form-control-modern field-filled" value="${exp.fecha_fin}"></div>
            <div class="col-md-2 d-flex align-items-end"><div class="form-check"><input class="form-check-input" type="checkbox" ${exp.a_la_fecha ? 'checked' : ''} id="current-${index}"><label class="form-check-label small" for="current-${index}">A la fecha</label></div></div>
            <div class="col-md-4"><label class="form-label-pp">Motivo Termino</label><select class="form-select form-control-modern field-filled">
                <option ${exp.motivo_termino === 'A la fecha' ? 'selected' : ''}>A la fecha</option>
                <option ${exp.motivo_termino === 'Renuncia voluntaria' ? 'selected' : ''}>Renuncia voluntaria</option>
                <option ${exp.motivo_termino === 'Cambio de Cargo' ? 'selected' : ''}>Cambio de Cargo</option>
                <option ${exp.motivo_termino === 'Termino de contrato' ? 'selected' : ''}>Termino de contrato</option>
                <option ${exp.motivo_termino === 'Despido' ? 'selected' : ''}>Despido</option>
                <option ${exp.motivo_termino === 'Mutuo acuerdo' ? 'selected' : ''}>Mutuo acuerdo</option>
            </select></div>
        </div>
    </div>`;
}

function createEducationCard(edu, index) {
    return `
    <div class="experience-card" data-index="${index}">
        <div class="experience-header">
            <span class="experience-number"><i class="fas fa-university"></i></span>
            <span class="experience-title">${edu.fecha_egreso && new Date(edu.fecha_egreso) > new Date() ? 'En curso' : 'Completado'}</span>
            ${index > 0 ? '<button class="btn btn-sm btn-outline-danger ms-auto" onclick="this.closest(\'.experience-card\').remove()"><i class="fas fa-trash"></i> Eliminar</button>' : ''}
        </div>
        <div class="row g-3">
            <div class="col-md-3"><label class="form-label-pp">Formacion</label><input type="text" class="form-control form-control-modern field-filled" value="${esc(edu.formacion)}"></div>
            <div class="col-md-3"><label class="form-label-pp">Institucion</label><input type="text" class="form-control form-control-modern field-filled" value="${esc(edu.institucion)}"></div>
            <div class="col-md-3"><label class="form-label-pp">Fecha Ingreso</label><input type="date" class="form-control form-control-modern field-filled" value="${edu.fecha_ingreso}"></div>
            <div class="col-md-3"><label class="form-label-pp">Fecha Egreso</label><input type="date" class="form-control form-control-modern field-filled" value="${edu.fecha_egreso}"></div>
        </div>
    </div>`;
}

// ============================================
// 6. UI HELPERS
// ============================================
function showCVStatus(type, message) {
    const statusEl = document.getElementById('cv-status');
    if (!statusEl) return;
    const icons = {
        loading: '<div class="cv-status-spinner"></div>',
        success: '<i class="fas fa-check-circle text-success"></i>',
        error: '<i class="fas fa-exclamation-triangle text-danger"></i>'
    };
    const classes = { loading: 'cv-status-loading', success: 'cv-status-success', error: 'cv-status-error' };
    statusEl.className = 'cv-status ' + classes[type];
    statusEl.innerHTML = `${icons[type]} <span>${message}</span>`;
    statusEl.style.display = 'flex';
}

function animateFilledFields() {
    document.querySelectorAll('.field-filled').forEach((field, i) => {
        setTimeout(() => {
            field.classList.add('field-highlight');
            setTimeout(() => field.classList.remove('field-highlight'), 2000);
        }, i * 40);
    });
}

function esc(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============================================
// 7. EVENT HANDLERS
// ============================================
function initCVUpload() {
    const fileInput = document.getElementById('cv-file-input');
    const dropZone = document.getElementById('cv-drop-zone');

    if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) { updateDropZoneFile(file); await processCV(file); }
        });
    }

    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
        dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('drag-over'); });
        dropZone.addEventListener('drop', async (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'application/pdf') {
                updateDropZoneFile(file);
                await processCV(file);
            } else {
                showCVStatus('error', 'Por favor sube un archivo PDF');
            }
        });
        dropZone.addEventListener('click', () => { if (fileInput) fileInput.click(); });
    }
}

function updateDropZoneFile(file) {
    const dropZone = document.getElementById('cv-drop-zone');
    if (!dropZone) return;
    dropZone.innerHTML = `
        <div class="cv-upload-icon"><i class="fas fa-file-pdf"></i></div>
        <div class="cv-file-info">
            <strong>${file.name}</strong>
            <small class="text-muted d-block">${(file.size / 1024).toFixed(1)} KB</small>
        </div>
        <button class="btn btn-sm btn-outline-primary ms-auto" onclick="event.stopPropagation(); document.getElementById('cv-file-input').click();">
            <i class="fas fa-sync-alt"></i> Cambiar
        </button>`;
}

// ============================================
// 8. SELECTOR DE PROVEEDOR IA (UI)
// ============================================
function updateAIProvider() {
    const select = document.getElementById('ai-provider-select');
    const keyContainer = document.getElementById('api-key-container');
    const helpContainer = document.getElementById('api-help-container');
    const helpLink = document.getElementById('api-help-link');
    const desc = document.getElementById('ai-provider-desc');
    const keyInput = document.getElementById('ai-api-key');

    if (!select) return;
    const provider = select.value;

    const providerInfo = {
        local:  { needsKey: false, desc: 'Usa expresiones regulares para extraer datos. Funciona sin conexion.' },
        groq:   { needsKey: true, url: 'https://console.groq.com/keys', desc: 'Llama 3.3 70B: modelo potente y rapido. API 100% gratuita.' },
        gemini: { needsKey: true, url: 'https://aistudio.google.com/apikey', desc: 'Google Gemini Flash: rapido y preciso. Plan gratuito generoso.' },
        claude: { needsKey: true, url: 'https://console.anthropic.com/settings/keys', desc: 'Claude AI: maxima precision. Requiere plan de pago.' }
    };

    const info = providerInfo[provider];
    keyContainer.style.display = info.needsKey ? '' : 'none';
    helpContainer.style.display = info.needsKey ? '' : 'none';
    desc.textContent = info.desc;

    if (info.url) helpLink.href = info.url;

    // Actualizar config
    CV_PARSER_CONFIG.PROVIDER = provider;
    if (keyInput && keyInput.value) {
        CV_PARSER_CONFIG.API_KEY = keyInput.value.trim();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCVUpload();
    // Sincronizar input de API key en tiempo real
    const keyInput = document.getElementById('ai-api-key');
    if (keyInput) {
        keyInput.addEventListener('input', () => {
            CV_PARSER_CONFIG.API_KEY = keyInput.value.trim();
        });
    }
});
