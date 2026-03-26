// ============================================
// Test de Liderazgo Situacional - IMCE 2015
// Maqueta integrada con diseno Praxis Personas
// ============================================

// ---- DATOS DEL TEST ----
const situations = [
    {
        id: 1,
        text: "Sus colaboradores no estan respondiendo en el ultimo tiempo a su conversacion amistosa y a su obvia preocupacion por su bienestar. Su desempeno esta declinando rapidamente.",
        alternatives: {
            A: "Enfatizar la aplicacion de procedimientos uniformes y la necesidad del cumplimiento de las tareas.",
            B: "Estar disponible para la discusion pero no presionar por involucrarse.",
            C: "Hablar con los colaboradores y luego establecer metas a alcanzar.",
            D: "No intervenir intencionalmente."
        }
    },
    {
        id: 2,
        text: "El desempeno observable de su grupo esta mejorando. Usted se ha estado asegurando que todos los miembros esten conscientes de sus responsabilidades y los estandares esperados de desempeno.",
        alternatives: {
            A: "Establecer una interaccion amistosa pero continuar asegurandose que todos los miembros esten conscientes de sus responsabilidades y estandares esperados de desempeno.",
            B: "Tomar una accion no definida.",
            C: "Hacer lo que sea posible para que el grupo se sienta importante e involucrado.",
            D: "Dar importancia a las tareas y a las fechas limite."
        }
    },
    {
        id: 3,
        text: "Los miembros de su grupo son incapaces de resolver un problema por si mismos. Usted los ha dejado normalmente solos. El desempeno y las relaciones interpersonales del grupo han sido buenas.",
        alternatives: {
            A: "Trabajar con el grupo y juntos acometer la resolucion del problema.",
            B: "Dejar que el grupo resuelva el problema.",
            C: "Actuar rapida y firmemente para corregir y redirigir.",
            D: "Estimular al grupo a trabajar en el problema y apoyarlos en sus esfuerzos."
        }
    },
    {
        id: 4,
        text: "Usted esta considerando un cambio. Sus colaboradores tienen un excelente historial de logros. Ellos reconocen la necesidad de cambios.",
        alternatives: {
            A: "Permitir que el grupo se involucre en el desarrollo del cambio, no siendo, sin embargo, demasiado directivo.",
            B: "Anunciar los cambios y luego implementarlos bajo supervision estrecha.",
            C: "Permitir que el grupo formule sus propias directrices.",
            D: "Incorporar las recomendaciones del grupo, pero usted dirige el cambio."
        }
    },
    {
        id: 5,
        text: "El desempeno de su grupo ha estado decayendo durante los meses recientes. Los integrantes no estan preocupados con el logro de los objetivos. La redefinicion de roles y responsabilidades ha sido de utilidad en el pasado. Ha sido necesario estarles recordando constantemente que realicen sus tareas a tiempo.",
        alternatives: {
            A: "Permitir que el grupo formule su propia direccion.",
            B: "Incorporar las recomendaciones del grupo, pero ver que se cumplan los objetivos.",
            C: "Redefinir los roles y responsabilidades y supervisar cuidadosamente.",
            D: "Permitir el involucramiento del grupo en la determinacion de roles y responsabilidades, pero no siendo demasiado directivo."
        }
    },
    {
        id: 6,
        text: "Usted ha ingresado a una organizacion manejada en forma eficiente. El anterior administrador controlaba estrechamente la situacion. Usted quiere mantener una situacion productiva, sin embargo, le gustaria comenzar a humanizar el entorno.",
        alternatives: {
            A: "Hacer lo que sea posible para que el grupo se sienta importante e involucrado.",
            B: "Enfatizar la importancia de los plazos y las tareas.",
            C: "No intervenir intencionalmente.",
            D: "Hacer que el grupo se involucre en la toma de decisiones, pero vigilar que se alcancen los objetivos."
        }
    },
    {
        id: 7,
        text: "Usted esta considerando cambiar a una estructura que sera nueva para su grupo. Los miembros del grupo han hecho sugerencias sobre los cambios requeridos. El grupo ha sido productivo y ha demostrado flexibilidad en sus operaciones.",
        alternatives: {
            A: "Definir el cambio y supervisar cuidadosamente.",
            B: "Participar con el grupo en el desarrollo del cambio y permitir que los miembros organicen la implementacion.",
            C: "Estar dispuesto a hacer los cambios tal como son recomendados, pero mantener el control de la implementacion.",
            D: "Evitar la confrontacion; dejar las cosas como estan."
        }
    },
    {
        id: 8,
        text: "El desempeno del grupo y las relaciones interpersonales son buenas. Usted se siente un tanto inseguro acerca de su falta de direccion del grupo.",
        alternatives: {
            A: "Dejar al grupo solo.",
            B: "Discutir la situacion con el grupo y a continuacion iniciar los cambios requeridos.",
            C: "Dar los pasos necesarios para dirigir a los subordinados hacia el trabajo en una forma bien definida.",
            D: "Brindar apoyo en la discusion de la situacion con el grupo, pero no siendo demasiado directivo."
        }
    },
    {
        id: 9,
        text: "Su jefe lo ha designado para encabezar una fuerza de tarea que esta sumamente retrasada en hacer las recomendaciones requeridas para un cambio. El grupo no esta claro con respecto a sus metas. La asistencia a las reuniones ha sido baja. Sus reuniones se han transformado mas bien en encuentros sociales. Potencialmente ellos tienen el talento necesario para ayudar.",
        alternatives: {
            A: "Dejar que el grupo resuelva sus problemas.",
            B: "Incorporar las recomendaciones del grupo pero ver que se cumplan los objetivos.",
            C: "Redefinir las metas y supervisar cuidadosamente.",
            D: "Permitir que el grupo se involucre en el establecimiento de las metas, pero sin presionarlos."
        }
    },
    {
        id: 10,
        text: "Sus colaboradores, que normalmente son capaces de asumir responsabilidades, no estan respondiendo a su reciente definicion de estandares.",
        alternatives: {
            A: "Permitir que el grupo se involucre en la redefinicion de estandares pero sin tomar el control.",
            B: "Redefinir los estandares y supervisar cuidadosamente.",
            C: "Evitar la confrontacion no aplicando presion: dejar la situacion sola.",
            D: "Incorporar las recomendaciones del grupo pero ver que se cumplan los nuevos estandares."
        }
    },
    {
        id: 11,
        text: "Usted ha sido promovido a una nueva posicion. El supervisor anterior no estaba involucrado en los asuntos del grupo. El grupo ha manejado adecuadamente sus tareas y direccion. Las interrelaciones del grupo son buenas.",
        alternatives: {
            A: "Dar los pasos necesarios para dirigir a los colaboradores hacia formas de trabajo bien definidas.",
            B: "Involucrar a los colaboradores en la toma de decisiones y reforzar las buenas contribuciones.",
            C: "Discutir el desempeno previo con el grupo y luego examinar la necesidad de nuevas practicas.",
            D: "Continuar dejando al grupo solo."
        }
    },
    {
        id: 12,
        text: "Informaciones recientes indican que existen algunas dificultades internas entre los colaboradores. El grupo tiene un registro notable de logros. Los miembros han mantenido efectivamente metas de largo plazo. Han trabajado en armonia durante el ultimo ano. Todos estan bien calificados para las tareas.",
        alternatives: {
            A: "Intentar su propia solucion con los colaboradores y examinar la necesidad de introducir nuevas practicas.",
            B: "Permitir que los miembros del grupo lo resuelvan por si mismos.",
            C: "Actuar rapida y firmemente para corregir y redirigir.",
            D: "Participar en la discusion del problema brindando apoyo a los colaboradores."
        }
    }
];

// Clave de correccion - Columna I (Rango de Estilo)
const correctionKey = {
    1:  { A: 'E1', C: 'E2', B: 'E3', D: 'E4' },
    2:  { D: 'E1', A: 'E2', C: 'E3', B: 'E4' },
    3:  { C: 'E1', A: 'E2', D: 'E3', B: 'E4' },
    4:  { B: 'E1', D: 'E2', A: 'E3', C: 'E4' },
    5:  { C: 'E1', B: 'E2', D: 'E3', A: 'E4' },
    6:  { B: 'E1', D: 'E2', A: 'E3', C: 'E4' },
    7:  { A: 'E1', C: 'E2', B: 'E3', D: 'E4' },
    8:  { C: 'E1', B: 'E2', D: 'E3', A: 'E4' },
    9:  { C: 'E1', B: 'E2', D: 'E3', A: 'E4' },
    10: { B: 'E1', D: 'E2', A: 'E3', C: 'E4' },
    11: { A: 'E1', C: 'E2', B: 'E3', D: 'E4' },
    12: { C: 'E1', A: 'E2', D: 'E3', B: 'E4' }
};

// Clave de Adaptabilidad - Columna II
const adaptabilityKey = {
    1:  { D: 0, B: 1, C: 2, A: 3 },
    2:  { B: 0, D: 1, C: 2, A: 3 },
    3:  { C: 0, B: 1, A: 2, D: 3 },
    4:  { B: 0, D: 1, A: 2, C: 3 },
    5:  { A: 0, D: 1, B: 2, C: 3 },
    6:  { C: 0, A: 1, B: 2, D: 3 },
    7:  { A: 0, C: 1, D: 2, B: 3 },
    8:  { C: 0, B: 1, D: 2, A: 3 },
    9:  { A: 0, D: 1, B: 2, C: 3 },
    10: { B: 0, C: 1, A: 2, D: 3 },
    11: { A: 0, C: 1, D: 2, B: 3 },
    12: { C: 0, A: 1, D: 2, B: 3 }
};

// Descripciones de los estilos
const styleDescriptions = {
    E1: {
        name: "Dirigir",
        subtitle: "Alta Tarea - Baja Relacion",
        color: "#e74c3c",
        description: "El lider define los roles y tareas del colaborador y lo supervisa de cerca. Las decisiones las toma el lider y las comunica al colaborador. Se caracteriza por tener metodos de trabajo bien definidos que permiten a los colaboradores cumplir con las metas.",
        effective: "Visto como teniendo metodos bien definidos para el cumplimiento de metas, los que son utiles para los colaboradores.",
        ineffective: "Visto como imponiendo metodos a otros; a veces visto como desagradable e interesado solo en el resultado a corto plazo.",
        facilitation: "Baja facilitacion"
    },
    E2: {
        name: "Instruir",
        subtitle: "Alta Tarea - Alta Relacion",
        color: "#f39c12",
        description: "El lider define roles y tareas pero busca ideas y sugerencias del colaborador. Las decisiones las sigue tomando el lider, pero la comunicacion es bidireccional. Satisface las necesidades del equipo fijando metas y organizando el trabajo, proporcionando soporte socio-emocional.",
        effective: "Visto como satisfaciendo las necesidades de los colaboradores para el establecimiento de metas y la organizacion del trabajo, proporcionando altos niveles de apoyo socio-emocional.",
        ineffective: "Visto como proporcionando mas estructura de la requerida y a menudo aparece no siendo sincero en las relaciones interpersonales.",
        facilitation: "Moderada facilitacion"
    },
    E3: {
        name: "Apoyar",
        subtitle: "Baja Tarea - Alta Relacion",
        color: "#27ae60",
        description: "El lider y el colaborador participan juntos en la toma de decisiones. El rol principal del lider es facilitar y comunicar. Tiene confianza implicita en su personal, provocando facilitar el cumplimiento de las metas a traves de orientar y apoyar al equipo.",
        effective: "Visto como teniendo confianza implicita en las personas y como estando preocupado primariamente por facilitarles el cumplimiento de sus metas.",
        ineffective: "Visto como primariamente interesado en la armonia; a veces no esta dispuesto a efectuar la tarea si hay riesgo de romper una relacion.",
        facilitation: "Moderada facilitacion"
    },
    E4: {
        name: "Delegar",
        subtitle: "Baja Tarea - Baja Relacion",
        color: "#3498db",
        description: "El lider delega y genera empowerment en sus colaboradores para que decidan como efectuar el trabajo con el minimo apoyo socio-emocional requerido. Busca el desarrollo de la autogestion en el equipo.",
        effective: "Visto como delegando en forma apropiada en sus colaboradores las decisiones acerca de como deberia hacerse el trabajo.",
        ineffective: "Visto como proporcionando poca estructura y escaso apoyo socio-emocional, aun cuando los miembros del equipo lo requieran.",
        facilitation: "Alta facilitacion"
    }
};

// ---- ESTADO DE LA APP ----
let currentQuestion = 0;
let answers = {};
let timerInterval = null;
let timerSeconds = 0;
let chartInstance = null;
let currentWizardStep = 1;
let currentTestId = null;
let completedTests = {};
// Estado separado por test generico
let genericTestAnswers = {};

// ---- INICIALIZACION ----
document.addEventListener('DOMContentLoaded', () => {
    goToWizardStep(1);
});

// ---- WIZARD NAVIGATION ----
function goToWizardStep(step) {
    if (step < 1 || step > 6) return;

    // Validaciones antes de avanzar
    if (step > currentWizardStep) {
        const error = validateWizardStep(currentWizardStep);
        if (error) {
            showWizardError(error);
            return;
        }
        clearWizardError();
    }

    currentWizardStep = step;
    document.querySelectorAll('.wizard-screen').forEach(s => s.classList.remove('active'));
    const wizardScreen = document.getElementById('wizard-step-' + step);
    if (wizardScreen) wizardScreen.classList.add('active');
    updateWizardSteps(step);
    document.getElementById('wizard-progress').style.width = (step / 6) * 100 + '%';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateWizardStep(step) {
    if (step === 1) {
        const terms = document.getElementById('acceptTerms');
        if (!terms || !terms.checked) {
            return 'Debes aceptar los Terminos y Condiciones para continuar.';
        }
    }
    return null;
}

function showWizardError(message) {
    clearWizardError();
    const activeScreen = document.querySelector('.wizard-screen.active');
    if (!activeScreen) return;
    const footer = activeScreen.querySelector('.pp-footer-buttons');
    if (!footer) return;
    const alert = document.createElement('div');
    alert.className = 'wizard-error-alert';
    alert.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    footer.insertAdjacentElement('beforebegin', alert);
    alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearWizardError() {
    document.querySelectorAll('.wizard-error-alert').forEach(el => el.remove());
}

function updateWizardSteps(activeStep) {
    document.querySelectorAll('.pp-step').forEach(stepEl => {
        const stepNum = parseInt(stepEl.dataset.wizard);
        stepEl.classList.remove('active', 'completed');
        if (stepNum < activeStep) stepEl.classList.add('completed');
        else if (stepNum === activeStep) stepEl.classList.add('active');
    });
}

// ---- TEST MODAL ----
function openTestModal(testId) {
    currentTestId = testId;
    const overlay = document.getElementById('test-modal-overlay');
    const body = document.getElementById('test-modal-body');
    const title = document.getElementById('test-modal-title');
    const subtitle = document.getElementById('test-modal-subtitle');

    const testMeta = {
        barrat: { name: 'Test BARRAT', sub: 'Escala de Impulsividad de Barratt (BIS-11)', icon: 'fa-bolt', questions: getBarratQuestions() },
        disc: { name: 'Test DISC', sub: 'Perfil de Comportamiento DISC', icon: 'fa-users-cog', questions: getDiscQuestions() },
        liderazgo: { name: 'Test de Liderazgo Situacional', sub: 'IMCE 2015 - Hersey y Blanchard', icon: 'fa-clipboard-list', questions: null },
        valanti: { name: 'Test VALANTI', sub: 'Valores y Antivalores Laborales', icon: 'fa-balance-scale', questions: getValantiQuestions() }
    };

    const meta = testMeta[testId];
    title.textContent = meta.name;
    subtitle.textContent = meta.sub;
    document.getElementById('test-modal-icon').innerHTML = `<i class="fas ${meta.icon}"></i>`;

    if (testId === 'liderazgo') {
        renderLiderazgoInModal(body);
    } else if (testId === 'disc') {
        renderDiscInModal(body);
    } else {
        renderGenericTestInModal(body, testId, meta);
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeTestModal() {
    document.getElementById('test-modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
    if (timerInterval) clearInterval(timerInterval);
}

function markTestCompleted(testId) {
    completedTests[testId] = true;
    const row = document.querySelector(`tr[data-test="${testId}"]`);
    if (row) {
        row.querySelector('td:last-child').innerHTML = '<span class="text-muted">Contestado</span>';
    }
    // Verificar si todos estan contestados
    const allDone = ['barrat','disc','liderazgo','valanti'].every(t => completedTests[t]);
    document.getElementById('btn-send-postulation').disabled = !allDone;
}

// ---- GENERIC TEST RENDERER (BARRAT, DISC, VALANTI) ----
function renderGenericTestInModal(container, testId, meta) {
    if (!genericTestAnswers[testId]) genericTestAnswers[testId] = {};
    const qs = meta.questions;
    let currentQ = 0;

    function render() {
        const q = qs[currentQ];
        const answered = genericTestAnswers[testId][currentQ];
        container.innerHTML = `
            <div class="test-topbar">
                <span class="fw-bold" style="color:var(--pp-primary);">Pregunta ${currentQ + 1} de ${qs.length}</span>
                <div class="flex-grow-1 mx-3"><div class="progress" style="height:8px"><div class="progress-bar" style="width:${((currentQ+1)/qs.length)*100}%;background:var(--pp-primary)"></div></div></div>
            </div>
            <div class="question-dots mb-3">${qs.map((_, i) => `<div class="q-dot ${genericTestAnswers[testId][i] !== undefined ? 'answered' : ''} ${i === currentQ ? 'current' : ''}" onclick="this.dispatchEvent(new CustomEvent('goto',{bubbles:true,detail:${i}}))">${i+1}</div>`).join('')}</div>
            <div class="situation-text mb-4">${q.text}</div>
            <div class="alternatives">${q.options.map((opt, oi) => `
                <div class="alternative ${answered === oi ? 'selected' : ''}" onclick="this.dispatchEvent(new CustomEvent('pick',{bubbles:true,detail:${oi}}))">
                    <div class="alt-letter">${String.fromCharCode(65+oi)}</div>
                    <div class="alt-text">${opt}</div>
                </div>
            `).join('')}</div>
            <div class="modal-test-footer">
                <button class="btn btn-info" ${currentQ === 0 ? 'disabled' : ''} onclick="this.dispatchEvent(new CustomEvent('nav',{bubbles:true,detail:'prev'}))">Anterior</button>
                ${currentQ < qs.length - 1
                    ? `<button class="btn btn-dark" onclick="this.dispatchEvent(new CustomEvent('nav',{bubbles:true,detail:'next'}))">Siguiente</button>`
                    : `<button class="btn btn-success" onclick="this.dispatchEvent(new CustomEvent('nav',{bubbles:true,detail:'finish'}))"><i class="fas fa-check"></i> Finalizar test</button>`
                }
            </div>
        `;
    }

    container.addEventListener('pick', e => { genericTestAnswers[testId][currentQ] = e.detail; render(); });
    container.addEventListener('goto', e => { currentQ = e.detail; render(); });
    container.addEventListener('nav', e => {
        if (e.detail === 'prev' && currentQ > 0) { currentQ--; render(); }
        else if (e.detail === 'next' && currentQ < qs.length - 1) { currentQ++; render(); }
        else if (e.detail === 'finish') {
            const answeredCount = Object.keys(genericTestAnswers[testId]).length;
            if (answeredCount < qs.length) {
                container.querySelector('.modal-test-footer').insertAdjacentHTML('beforebegin',
                    `<div class="alert alert-danger mt-3"><i class="fas fa-exclamation-triangle"></i> Debes responder las ${qs.length} preguntas. Faltan ${qs.length - answeredCount}.</div>`);
                return;
            }
            markTestCompleted(testId);
            container.innerHTML = `
                <div class="text-center py-5">
                    <div style="width:80px;height:80px;background:var(--pp-success-light);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                        <i class="fas fa-check" style="font-size:36px;color:var(--pp-success);"></i>
                    </div>
                    <h4>Test completado!</h4>
                    <p class="text-muted">Tus respuestas han sido registradas exitosamente.</p>
                    <button class="btn btn-dark mt-3" onclick="closeTestModal()"><i class="fas fa-arrow-left"></i> Volver a los tests</button>
                </div>`;
        }
    });

    render();
}

// ---- DISC TEST IN MODAL (28 preguntas) ----
let discAnswers = {}; // { questionId: { mas: index, menos: index } }
let discCurrentQ = 0;

function renderDiscInModal(container) {
    discAnswers = {};
    discCurrentQ = 0;
    renderDiscPhase(container, 'instructions');
}

function renderDiscPhase(container, phase) {
    if (!container) container = document.getElementById('test-modal-body');
    const questions = getDiscQuestions();

    if (phase === 'instructions') {
        container.innerHTML = `
            <div class="welcome-box">
                <h5><i class="fas fa-hand-peace" style="color:var(--pp-primary)"></i> Bienvenido/a al Test DISC</h5>
                <p>Este test evalua tu perfil de comportamiento en 4 dimensiones. <strong>No hay respuestas correctas ni incorrectas</strong>, responde segun como te comportas naturalmente.</p>
            </div>
            <div class="alert alert-info d-flex gap-3 align-items-start">
                <i class="fas fa-info-circle mt-1 fs-5"></i>
                <div><strong>Como responder</strong>
                <p class="mb-0 small">En cada pregunta veras 4 adjetivos. Debes seleccionar cual te describe <strong>MAS</strong> (con +) y cual te describe <strong>MENOS</strong> (con -). No puedes elegir el mismo adjetivo para ambos.</p></div>
            </div>
            <div class="row g-2 mt-3 mb-3">
                <div class="col-6 col-md-3"><div class="style-preview-card" style="border-left:4px solid #e74c3c"><strong>D - Dominancia</strong><br><small class="text-muted">Decisivo, competitivo, directo</small></div></div>
                <div class="col-6 col-md-3"><div class="style-preview-card" style="border-left:4px solid #f59e0b"><strong>I - Influencia</strong><br><small class="text-muted">Sociable, entusiasta, optimista</small></div></div>
                <div class="col-6 col-md-3"><div class="style-preview-card" style="border-left:4px solid #10b981"><strong>S - Estabilidad</strong><br><small class="text-muted">Paciente, leal, tranquilo</small></div></div>
                <div class="col-6 col-md-3"><div class="style-preview-card" style="border-left:4px solid #6366f1"><strong>C - Cumplimiento</strong><br><small class="text-muted">Preciso, analitico, cuidadoso</small></div></div>
            </div>
            <div class="modal-test-footer">
                <button class="btn btn-info" onclick="closeTestModal()">Cancelar</button>
                <button class="btn btn-dark" onclick="discCurrentQ=0; renderDiscQuestion()">Comenzar Test <i class="fas fa-arrow-right"></i></button>
            </div>`;
    } else if (phase === 'results') {
        renderDiscResults(container);
    }
}

function renderDiscQuestion() {
    const container = document.getElementById('test-modal-body');
    const questions = getDiscQuestions();
    const q = questions[discCurrentQ];
    const ans = discAnswers[q.id] || {};
    const progress = ((discCurrentQ + 1) / questions.length) * 100;
    const answeredCount = Object.values(discAnswers).filter(a => a.mas !== undefined && a.menos !== undefined).length;

    container.innerHTML = `
        <div class="test-topbar">
            <span class="fw-bold" style="color:var(--pp-primary)">Pregunta ${discCurrentQ + 1} de ${questions.length}</span>
            <div class="flex-grow-1 mx-3"><div class="progress" style="height:8px"><div class="progress-bar" style="width:${progress}%;background:var(--pp-primary)"></div></div></div>
            <span class="text-muted small">${answeredCount}/${questions.length} completas</span>
        </div>
        <div class="question-dots mb-3">${questions.map((qq, i) => {
            const a = discAnswers[qq.id];
            const done = a && a.mas !== undefined && a.menos !== undefined;
            return `<div class="q-dot ${done ? 'answered' : ''} ${i === discCurrentQ ? 'current' : ''}" onclick="discCurrentQ=${i}; renderDiscQuestion()">${i+1}</div>`;
        }).join('')}</div>

        <div class="situation-text mb-4">
            <strong>Pregunta ${q.id}:</strong> De las siguientes palabras, selecciona la que <strong>MAS</strong> te identifica (<span style="color:var(--pp-success)">+</span>) y la que <strong>MENOS</strong> te identifica (<span style="color:var(--pp-danger)">-</span>).
        </div>

        <div class="disc-words">
            ${q.words.map((w, wi) => {
                const isMas = ans.mas === wi;
                const isMenos = ans.menos === wi;
                return `<div class="disc-word-row ${isMas ? 'is-mas' : ''} ${isMenos ? 'is-menos' : ''}">
                    <button class="disc-btn disc-btn-mas ${isMas ? 'active' : ''}" onclick="pickDisc(${q.id}, ${wi}, 'mas')" title="Mas me identifica">
                        <i class="fas fa-plus"></i>
                    </button>
                    <span class="disc-word-text">${w.text}</span>
                    <button class="disc-btn disc-btn-menos ${isMenos ? 'active' : ''}" onclick="pickDisc(${q.id}, ${wi}, 'menos')" title="Menos me identifica">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>`;
            }).join('')}
        </div>

        <div class="modal-test-footer">
            <button class="btn btn-info" ${discCurrentQ === 0 ? 'disabled' : ''} onclick="discCurrentQ--; renderDiscQuestion()">Anterior</button>
            ${discCurrentQ < questions.length - 1
                ? `<button class="btn btn-dark" onclick="discCurrentQ++; renderDiscQuestion()">Siguiente</button>`
                : `<button class="btn btn-success" onclick="finishDisc()"><i class="fas fa-check-double"></i> Finalizar test</button>`
            }
        </div>`;
}

function pickDisc(qId, wordIndex, type) {
    if (!discAnswers[qId]) discAnswers[qId] = {};
    const ans = discAnswers[qId];
    // No permitir mismo adjetivo para mas y menos
    if (type === 'mas') {
        if (ans.menos === wordIndex) return;
        ans.mas = ans.mas === wordIndex ? undefined : wordIndex;
    } else {
        if (ans.mas === wordIndex) return;
        ans.menos = ans.menos === wordIndex ? undefined : wordIndex;
    }
    renderDiscQuestion();
}

function finishDisc() {
    const questions = getDiscQuestions();
    const answeredCount = Object.values(discAnswers).filter(a => a.mas !== undefined && a.menos !== undefined).length;
    if (answeredCount < questions.length) {
        const container = document.getElementById('test-modal-body');
        const footer = container.querySelector('.modal-test-footer');
        if (!container.querySelector('.alert-danger')) {
            footer.insertAdjacentHTML('beforebegin',
                `<div class="alert alert-danger mt-3"><i class="fas fa-exclamation-triangle"></i> Debes responder las ${questions.length} preguntas. Faltan ${questions.length - answeredCount}.</div>`);
        }
        return;
    }
    renderDiscPhase(null, 'results');
}

function renderDiscResults(container) {
    if (!container) container = document.getElementById('test-modal-body');
    const questions = getDiscQuestions();

    // Calcular puntajes DISC
    const scores = { D: 0, I: 0, S: 0, C: 0 };
    const masScores = { D: 0, I: 0, S: 0, C: 0 };
    const menosScores = { D: 0, I: 0, S: 0, C: 0 };

    questions.forEach(q => {
        const ans = discAnswers[q.id];
        if (ans && ans.mas !== undefined) {
            const dim = q.words[ans.mas].dim;
            masScores[dim]++;
            scores[dim]++;
        }
        if (ans && ans.menos !== undefined) {
            const dim = q.words[ans.menos].dim;
            menosScores[dim]++;
            scores[dim]--;
        }
    });

    // Determinar perfil predominante
    const maxDim = Object.entries(scores).sort((a,b) => b[1] - a[1])[0][0];
    const dimNames = { D:'Dominancia', I:'Influencia', S:'Estabilidad', C:'Cumplimiento' };
    const dimColors = { D:'#e74c3c', I:'#f59e0b', S:'#10b981', C:'#6366f1' };
    const dimDescs = {
        D: 'Eres directo/a, decidido/a y orientado/a a resultados. Te gustan los desafios, tomas decisiones rapidas y prefieres tener el control. En tu mejor momento, eres un lider nato que logra resultados. Bajo presion, puedes ser impaciente o demasiado exigente.',
        I: 'Eres entusiasta, sociable y optimista. Te motiva influir en los demas, construir relaciones y trabajar en equipo. En tu mejor momento, eres inspirador/a y persuasivo/a. Bajo presion, puedes ser desorganizado/a o poco atento/a a los detalles.',
        S: 'Eres paciente, leal y consistente. Valoras la estabilidad, la cooperacion y un ambiente armonioso. En tu mejor momento, eres un pilar de confiabilidad para el equipo. Bajo presion, puedes resistirte al cambio o evitar conflictos necesarios.',
        C: 'Eres analitico/a, preciso/a y orientado/a a la calidad. Valoras los estandares altos, los datos y los procedimientos correctos. En tu mejor momento, aseguras excelencia y precision. Bajo presion, puedes ser demasiado critico/a o perfeccionista.'
    };

    markTestCompleted('disc');

    container.innerHTML = `
        <div id="report-content">
        <div class="report-candidate-section mb-3" style="border-radius:var(--pp-radius)">
            <div class="row">
                <div class="col-md-6"><strong>Evaluado:</strong> Francisco Javier Guajardo Sempertegui</div>
                <div class="col-md-6"><strong>Fecha:</strong> ${formatDate(new Date())}</div>
            </div>
        </div>

        <h5 class="report-section-title">Perfil DISC - Puntajes</h5>
        <div class="row g-3 mb-4">
            ${['D','I','S','C'].map(dim => `
                <div class="col-6 col-md-3">
                    <div class="score-box" style="--score-color:${dimColors[dim]}">
                        <div class="score-label">${dim} - ${dimNames[dim]}</div>
                        <div class="score-value">${masScores[dim]}</div>
                        <div class="progress" style="height:8px"><div class="progress-bar" style="background:${dimColors[dim]};width:${(masScores[dim]/28)*100}%"></div></div>
                        <small class="text-muted">+${masScores[dim]} mas / -${menosScores[dim]} menos</small>
                    </div>
                </div>
            `).join('')}
        </div>

        <h5 class="report-section-title">Grafico de Perfil</h5>
        <div class="chart-container mb-4"><canvas id="chart-disc" width="500" height="280"></canvas></div>

        <h5 class="report-section-title">Perfil Predominante: ${maxDim} - ${dimNames[maxDim]}</h5>
        <div class="d-flex gap-4 align-items-start mb-4">
            <div class="predominant-badge" style="background:${dimColors[maxDim]}">${maxDim}</div>
            <div>
                <h5 class="mb-1">${dimNames[maxDim]}</h5>
                <p>${dimDescs[maxDim]}</p>
                <span class="predominant-tag" style="background:${dimColors[maxDim]}20;color:${dimColors[maxDim]}">Puntaje neto: ${scores[maxDim]}</span>
            </div>
        </div>

        <h5 class="report-section-title">Detalle por Pregunta</h5>
        <table class="table table-striped table-bordered">
            <thead class="table-dark"><tr><th>#</th><th>Mas me identifica (+)</th><th>Menos me identifica (-)</th></tr></thead>
            <tbody>${questions.map(q => {
                const ans = discAnswers[q.id] || {};
                const masW = ans.mas !== undefined ? q.words[ans.mas] : null;
                const menosW = ans.menos !== undefined ? q.words[ans.menos] : null;
                return `<tr>
                    <td>${q.id}</td>
                    <td>${masW ? `<span class="style-tag" style="background:${dimColors[masW.dim]}">${masW.text} (${masW.dim})</span>` : '-'}</td>
                    <td>${menosW ? `<span class="style-tag" style="background:#94a3b8">${menosW.text} (${menosW.dim})</span>` : '-'}</td>
                </tr>`;
            }).join('')}</tbody>
        </table>
        </div>

        <div class="modal-test-footer">
            <button class="btn btn-primary" onclick="downloadPDF()"><i class="fas fa-file-pdf"></i> Descargar PDF</button>
            <button class="btn btn-dark" onclick="closeTestModal()"><i class="fas fa-arrow-left"></i> Volver a los tests</button>
        </div>`;

    // Render chart
    setTimeout(() => {
        const ctx = document.getElementById('chart-disc');
        if (ctx) {
            if (chartInstance) chartInstance.destroy();
            chartInstance = new Chart(ctx.getContext('2d'), {
                type: 'radar',
                data: {
                    labels: ['D - Dominancia', 'I - Influencia', 'S - Estabilidad', 'C - Cumplimiento'],
                    datasets: [{
                        label: 'Perfil DISC',
                        data: [masScores.D, masScores.I, masScores.S, masScores.C],
                        backgroundColor: 'rgba(99,102,241,0.15)',
                        borderColor: '#6366f1',
                        borderWidth: 2,
                        pointBackgroundColor: ['#e74c3c','#f59e0b','#10b981','#6366f1'],
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    scales: { r: { beginAtZero: true, max: Math.max(masScores.D,masScores.I,masScores.S,masScores.C) + 3, ticks: { stepSize: 2 } } },
                    plugins: { legend: { display: false }, title: { display: true, text: 'Perfil DISC', font: { size: 16, weight: '600' } } }
                }
            });
        }
    }, 150);
}

// ---- LIDERAZGO TEST IN MODAL ----
let liderazgoPhase = 'instructions'; // instructions, test, review, results

function renderLiderazgoInModal(container) {
    liderazgoPhase = 'instructions';
    answers = {};
    currentQuestion = 0;
    renderLiderazgoPhase(container);
}

function renderLiderazgoPhase(container) {
    if (!container) container = document.getElementById('test-modal-body');

    if (liderazgoPhase === 'instructions') {
        container.innerHTML = `
            <div class="welcome-box">
                <h5><i class="fas fa-hand-peace" style="color:var(--pp-primary)"></i> Bienvenido/a al Test de Liderazgo</h5>
                <p>Esta evaluacion te ayudara a identificar tu estilo natural de liderazgo. Recuerda: <strong>no hay respuestas correctas ni incorrectas</strong>.</p>
            </div>
            <div class="alert alert-info d-flex gap-3 align-items-start">
                <i class="fas fa-info-circle mt-1 fs-5"></i>
                <div><strong>Modelo de Hersey y Blanchard</strong>
                <p class="mb-0 small">Evalua tu tendencia a utilizar cuatro estilos: Dirigir, Instruir, Apoyar y Delegar.</p></div>
            </div>
            <h5 class="mt-4 mb-3">Instrucciones:</h5>
            <ul class="instructions-list">
                <li>Son <strong>12 situaciones</strong> con <strong>4 alternativas</strong> cada una.</li>
                <li>Selecciona <strong>solo una alternativa</strong> por situacion.</li>
                <li>Debes responder <strong>todas</strong> para finalizar.</li>
                <li>Puedes revisar antes de enviar.</li>
            </ul>
            <div class="row g-2 mt-3 mb-3">
                <div class="col-6 col-md-3"><div class="style-preview-card" style="border-left:4px solid #e74c3c"><strong>E1 - Dirigir</strong><br><small class="text-muted">Alta tarea, baja relacion</small></div></div>
                <div class="col-6 col-md-3"><div class="style-preview-card" style="border-left:4px solid #f39c12"><strong>E2 - Instruir</strong><br><small class="text-muted">Alta tarea, alta relacion</small></div></div>
                <div class="col-6 col-md-3"><div class="style-preview-card" style="border-left:4px solid #27ae60"><strong>E3 - Apoyar</strong><br><small class="text-muted">Baja tarea, alta relacion</small></div></div>
                <div class="col-6 col-md-3"><div class="style-preview-card" style="border-left:4px solid #3498db"><strong>E4 - Delegar</strong><br><small class="text-muted">Baja tarea, baja relacion</small></div></div>
            </div>
            <div class="modal-test-footer">
                <button class="btn btn-info" onclick="closeTestModal()">Cancelar</button>
                <button class="btn btn-dark" onclick="liderazgoPhase='test'; startTimer(); renderLiderazgoPhase()">Comenzar Test <i class="fas fa-arrow-right"></i></button>
            </div>`;
    } else if (liderazgoPhase === 'test') {
        renderLiderazgoQuestion(container);
    } else if (liderazgoPhase === 'review') {
        renderLiderazgoReview(container);
    } else if (liderazgoPhase === 'results') {
        renderLiderazgoResults(container);
    }
}

function renderLiderazgoQuestion(container) {
    if (!container) container = document.getElementById('test-modal-body');
    const s = situations[currentQuestion];
    const progress = ((currentQuestion + 1) / 12) * 100;
    const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const secs = (timerSeconds % 60).toString().padStart(2, '0');

    container.innerHTML = `
        <div class="help-tip"><i class="fas fa-lightbulb"></i> Selecciona la accion que mejor represente como actuarias</div>
        <div class="test-topbar">
            <span class="fw-bold" style="color:var(--pp-primary)">Situacion ${s.id} de 12</span>
            <div class="flex-grow-1 mx-3"><div class="progress" style="height:8px"><div class="progress-bar" style="width:${progress}%;background:var(--pp-primary)"></div></div></div>
            <span class="text-muted" id="test-timer"><i class="fas fa-clock"></i> ${mins}:${secs}</span>
        </div>
        <div class="question-dots mb-3">${situations.map((_, i) => `<div class="q-dot ${answers[i+1] ? 'answered' : ''} ${i === currentQuestion ? 'current' : ''}" onclick="currentQuestion=${i}; renderLiderazgoPhase()">${i+1}</div>`).join('')}</div>
        <h5 style="color:var(--pp-primary);font-weight:700" class="mb-3">Situacion ${s.id}</h5>
        <div class="situation-text">${s.text}</div>
        <div class="alternatives mt-4">
            ${['A','B','C','D'].map(letter => `
                <div class="alternative ${answers[s.id] === letter ? 'selected' : ''}" onclick="answers[${s.id}]='${letter}'; renderLiderazgoPhase()">
                    <div class="alt-letter">${letter}</div>
                    <div class="alt-text">${s.alternatives[letter]}</div>
                </div>
            `).join('')}
        </div>
        <div class="modal-test-footer">
            <button class="btn btn-info" ${currentQuestion === 0 ? 'disabled' : ''} onclick="currentQuestion--; renderLiderazgoPhase()">Anterior</button>
            ${currentQuestion < 11
                ? `<button class="btn btn-dark" onclick="currentQuestion++; renderLiderazgoPhase()">Siguiente</button>`
                : `<button class="btn btn-success" onclick="liderazgoPhase='review'; renderLiderazgoPhase()"><i class="fas fa-check-double"></i> Revisar</button>`
            }
        </div>`;
}

function renderLiderazgoReview(container) {
    if (!container) container = document.getElementById('test-modal-body');
    let answeredCount = Object.keys(answers).length;
    container.innerHTML = `
        <div class="welcome-box" style="background:linear-gradient(135deg,#ecfdf5,#f0fdf4)">
            <h5><i class="fas fa-clipboard-check" style="color:var(--pp-success)"></i> Revisa tus respuestas</h5>
            <p>Haz clic en cualquier situacion para modificarla.</p>
        </div>
        <div class="review-grid">${situations.map(s => {
            const ans = answers[s.id];
            return `<div class="review-item ${ans ? '' : 'unanswered'}" onclick="currentQuestion=${s.id-1}; liderazgoPhase='test'; renderLiderazgoPhase()">
                <div class="review-item-header">Situacion ${s.id}</div>
                <div class="review-item-answer ${ans ? '' : 'empty'}">${ans ? `Alt. ${ans}: ${s.alternatives[ans].substring(0,50)}...` : 'Sin responder'}</div>
            </div>`;
        }).join('')}</div>
        <div class="alert ${answeredCount === 12 ? 'alert-success' : 'alert-danger'} mt-3">
            <i class="fas ${answeredCount === 12 ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <strong>${answeredCount}/12</strong> situaciones respondidas. ${answeredCount === 12 ? 'Puedes enviar.' : 'Completa todas para enviar.'}
        </div>
        <div class="modal-test-footer">
            <button class="btn btn-info" onclick="liderazgoPhase='test'; renderLiderazgoPhase()">Anterior</button>
            <button class="btn btn-dark" ${answeredCount < 12 ? 'disabled' : ''} onclick="clearInterval(timerInterval); liderazgoPhase='results'; renderLiderazgoPhase()">
                <i class="fas fa-paper-plane"></i> Enviar y ver resultados
            </button>
        </div>`;
}

function renderLiderazgoResults(container) {
    if (!container) container = document.getElementById('test-modal-body');
    const results = calculateResults();
    markTestCompleted('liderazgo');

    const pStyle = styleDescriptions[results.predominantStyle];
    let levelClass = results.adaptabilityLevel === 'Alto' ? 'high' : results.adaptabilityLevel === 'Moderado' ? 'moderate' : 'low';
    let levelColor = results.adaptabilityLevel === 'Alto' ? '#10b981' : results.adaptabilityLevel === 'Moderado' ? '#f59e0b' : '#ef4444';

    container.innerHTML = `
        <div id="report-content">
            <div class="report-candidate-section mb-3" style="border-radius:var(--pp-radius)">
                <div class="row">
                    <div class="col-md-6"><strong>Evaluado:</strong> Francisco Javier Guajardo Sempertegui</div>
                    <div class="col-md-6"><strong>Fecha:</strong> ${formatDate(new Date())}</div>
                </div>
            </div>
            <h5 class="report-section-title">Puntajes por Estilo</h5>
            <div class="row g-3 mb-4">
                ${['E1','E2','E3','E4'].map(style => {
                    const s = styleDescriptions[style]; const score = results.styleScores[style];
                    return `<div class="col-6 col-md-3"><div class="score-box" style="--score-color:${s.color}"><div class="score-label">${style} - ${s.name}</div><div class="score-value">${score}</div><div class="progress" style="height:8px"><div class="progress-bar" style="background:${s.color};width:${(score/12)*100}%"></div></div></div></div>`;
                }).join('')}
            </div>
            <h5 class="report-section-title">Grafico Comparativo</h5>
            <div class="chart-container mb-4"><canvas id="chart-styles" width="500" height="280"></canvas></div>
            <h5 class="report-section-title">Estilo Predominante</h5>
            <div class="d-flex gap-4 align-items-start mb-4">
                <div class="predominant-badge" style="background:${pStyle.color}">${results.predominantStyle}</div>
                <div>
                    <h5 class="mb-1">${results.predominantStyle} - ${pStyle.name}</h5>
                    <p class="text-muted small mb-2">${pStyle.subtitle}</p>
                    <p class="small">${pStyle.description}</p>
                    <span class="predominant-tag" style="background:${pStyle.color}20;color:${pStyle.color}">Puntaje: ${results.styleScores[results.predominantStyle]}/12</span>
                </div>
            </div>
            <h5 class="report-section-title">Adaptabilidad de Estilo</h5>
            <div class="d-flex gap-4 align-items-start mb-4">
                <div class="text-center p-3 bg-light rounded" style="min-width:100px">
                    <div class="adaptability-big-number" style="color:${levelColor}">${results.adaptabilityScore}</div>
                    <div class="text-muted small">de 36</div>
                </div>
                <div>
                    <p class="small"><strong>30-36:</strong> Alto | <strong>24-29:</strong> Moderado | <strong>&lt;24:</strong> Necesita desarrollo</p>
                    <span class="adapt-level ${levelClass}">${results.adaptabilityLevel}</span>
                </div>
            </div>
            <h5 class="report-section-title">Detalle de Respuestas</h5>
            <table class="table table-striped table-bordered">
                <thead class="table-dark"><tr><th>Situacion</th><th>Respuesta</th><th>Estilo</th></tr></thead>
                <tbody>${results.detailPerSituation.map(d => {
                    const s = styleDescriptions[d.style];
                    return `<tr><td>Situacion ${d.situation}</td><td><strong>Alt. ${d.answer}</strong></td><td><span class="style-tag" style="background:${s.color}">${d.style} - ${s.name}</span></td></tr>`;
                }).join('')}</tbody>
            </table>
        </div>
        <div class="modal-test-footer">
            <button class="btn btn-primary" onclick="downloadPDF()"><i class="fas fa-file-pdf"></i> Descargar PDF</button>
            <button class="btn btn-dark" onclick="closeTestModal()"><i class="fas fa-arrow-left"></i> Volver a los tests</button>
        </div>`;

    // Render chart after DOM is ready
    setTimeout(() => renderChart(results.styleScores), 100);
}

function startTimer() {
    timerSeconds = 0;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timerSeconds++;
    }, 1000);
}

// ---- CALCULOS LIDERAZGO ----
function calculateResults() {
    const styleScores = { E1: 0, E2: 0, E3: 0, E4: 0 };
    const detailPerSituation = [];

    for (let i = 1; i <= 12; i++) {
        const answer = answers[i];
        const style = correctionKey[i][answer];
        styleScores[style]++;
        detailPerSituation.push({ situation: i, answer, style });
    }

    let adaptabilityScore = 0;
    for (let i = 1; i <= 12; i++) {
        adaptabilityScore += adaptabilityKey[i][answers[i]];
    }

    let maxScore = 0;
    let predominantStyle = 'E1';
    Object.entries(styleScores).forEach(([style, score]) => {
        if (score > maxScore) { maxScore = score; predominantStyle = style; }
    });

    const secondaryStyles = Object.entries(styleScores)
        .filter(([style, score]) => style !== predominantStyle && score >= 2)
        .map(([style]) => style);

    const styleRange = Object.entries(styleScores)
        .filter(([, score]) => score >= 2)
        .map(([style]) => style);

    let adaptabilityLevel;
    if (adaptabilityScore >= 30) adaptabilityLevel = 'Alto';
    else if (adaptabilityScore >= 24) adaptabilityLevel = 'Moderado';
    else adaptabilityLevel = 'Necesita desarrollo';

    return { styleScores, adaptabilityScore, predominantStyle, secondaryStyles, styleRange, adaptabilityLevel, detailPerSituation };
}

function renderChart(styleScores) {
    const ctx = document.getElementById('chart-styles').getContext('2d');
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['E1 - Dirigir', 'E2 - Instruir', 'E3 - Apoyar', 'E4 - Delegar'],
            datasets: [{
                label: 'Puntaje',
                data: [styleScores.E1, styleScores.E2, styleScores.E3, styleScores.E4],
                backgroundColor: ['rgba(231,76,60,0.8)', 'rgba(243,156,18,0.8)', 'rgba(39,174,96,0.8)', 'rgba(52,152,219,0.8)'],
                borderColor: ['#e74c3c', '#f39c12', '#27ae60', '#3498db'],
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Distribucion de Estilos de Liderazgo',
                    font: { size: 16, weight: '600' },
                    color: '#2a3042'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 12,
                    ticks: { stepSize: 1 },
                    title: { display: true, text: 'Numero de respuestas' }
                },
                x: {
                    ticks: { font: { size: 13, weight: '600' } }
                }
            }
        }
    });
}

// ---- DESCARGA PDF ----
function downloadPDF() {
    const element = document.getElementById('report-content');
    html2pdf().set({
        margin: [10, 10, 10, 10],
        filename: 'Reporte_Liderazgo_Situacional_Francisco_Guajardo.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }).from(element).save();
}

// ---- UTILIDADES ----
function formatDate(date) {
    return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ============================================
// DATOS DE TESTS GENERICOS (demo)
// ============================================

function getBarratQuestions() {
    return [
        { text: "Planifico mis tareas con cuidado.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] },
        { text: "Hago las cosas sin pensarlas.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] },
        { text: "Me decido rapidamente.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] },
        { text: "Soy una persona despreocupada.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] },
        { text: "No presto atencion a los detalles.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] },
        { text: "Tengo pensamientos que van muy rapido.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] },
        { text: "Planifico mis viajes con anticipacion.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] },
        { text: "Soy una persona que se controla bien.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] },
        { text: "Me concentro facilmente.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] },
        { text: "Ahorro con regularidad.", options: ["Raramente o nunca", "Ocasionalmente", "A menudo", "Siempre o casi siempre"] }
    ];
}

function getDiscQuestions() {
    // Test DISC clasico - 28 preguntas con 4 adjetivos cada una
    // Cada adjetivo mapea a: D=Dominancia, I=Influencia, S=Estabilidad, C=Cumplimiento
    // El evaluado selecciona "MAS me identifica" y "MENOS me identifica"
    return [
        { id:1,  words: [{text:"Entusiasta",dim:"I"},{text:"Audaz",dim:"D"},{text:"Diplomatico/a",dim:"S"},{text:"Satisfecho/a",dim:"C"}] },
        { id:2,  words: [{text:"Cauteloso/a",dim:"C"},{text:"Determinado/a",dim:"D"},{text:"Convincente",dim:"I"},{text:"Bonachon/a",dim:"S"}] },
        { id:3,  words: [{text:"Amigable",dim:"I"},{text:"Preciso/a",dim:"C"},{text:"Franco/a",dim:"D"},{text:"Tranquilo/a",dim:"S"}] },
        { id:4,  words: [{text:"Conversador/a",dim:"I"},{text:"Controlado/a",dim:"C"},{text:"Convencional",dim:"S"},{text:"Decidido/a",dim:"D"}] },
        { id:5,  words: [{text:"Aventurero/a",dim:"D"},{text:"Perspicaz",dim:"C"},{text:"Sociable",dim:"I"},{text:"Moderado/a",dim:"S"}] },
        { id:6,  words: [{text:"Gentil",dim:"S"},{text:"Persuasivo/a",dim:"I"},{text:"Humilde",dim:"C"},{text:"Original",dim:"D"}] },
        { id:7,  words: [{text:"Expresivo/a",dim:"I"},{text:"Concienzudo/a",dim:"C"},{text:"Dominante",dim:"D"},{text:"Receptivo/a",dim:"S"}] },
        { id:8,  words: [{text:"Equilibrado/a",dim:"S"},{text:"Observador/a",dim:"C"},{text:"Modesto/a",dim:"S"},{text:"Impaciente",dim:"D"}] },
        { id:9,  words: [{text:"Diplomatico/a",dim:"C"},{text:"Complaciente",dim:"S"},{text:"Atractivo/a",dim:"I"},{text:"Insistente",dim:"D"}] },
        { id:10, words: [{text:"Valiente",dim:"D"},{text:"Inspirador/a",dim:"I"},{text:"Sumiso/a",dim:"S"},{text:"Timido/a",dim:"C"}] },
        { id:11, words: [{text:"Reservado/a",dim:"C"},{text:"Complaciente",dim:"S"},{text:"Voluntarioso/a",dim:"D"},{text:"Alegre",dim:"I"}] },
        { id:12, words: [{text:"Estimulante",dim:"I"},{text:"Amable",dim:"S"},{text:"Perceptivo/a",dim:"C"},{text:"Independiente",dim:"D"}] },
        { id:13, words: [{text:"Competitivo/a",dim:"D"},{text:"Considerado/a",dim:"S"},{text:"Jovial",dim:"I"},{text:"Reservado/a",dim:"C"}] },
        { id:14, words: [{text:"Exigente",dim:"C"},{text:"Obediente",dim:"S"},{text:"Firme",dim:"D"},{text:"Jugueton/a",dim:"I"}] },
        { id:15, words: [{text:"Encantador/a",dim:"I"},{text:"Introspectivo/a",dim:"C"},{text:"Obstinado/a",dim:"D"},{text:"Predecible",dim:"S"}] },
        { id:16, words: [{text:"Logico/a",dim:"C"},{text:"Audaz",dim:"D"},{text:"Leal",dim:"S"},{text:"Encantador/a",dim:"I"}] },
        { id:17, words: [{text:"Sociable",dim:"I"},{text:"Paciente",dim:"S"},{text:"Autosuficiente",dim:"D"},{text:"Prudente",dim:"C"}] },
        { id:18, words: [{text:"Dispuesto/a",dim:"S"},{text:"Ansioso/a",dim:"D"},{text:"Meticuloso/a",dim:"C"},{text:"Animado/a",dim:"I"}] },
        { id:19, words: [{text:"Agresivo/a",dim:"D"},{text:"Extrovertido/a",dim:"I"},{text:"Amable",dim:"S"},{text:"Temeroso/a",dim:"C"}] },
        { id:20, words: [{text:"Seguro/a de si",dim:"D"},{text:"Simpatico/a",dim:"I"},{text:"Imparcial",dim:"C"},{text:"Tolerante",dim:"S"}] },
        { id:21, words: [{text:"Disciplinado/a",dim:"C"},{text:"Generoso/a",dim:"S"},{text:"Vivaz",dim:"I"},{text:"Persistente",dim:"D"}] },
        { id:22, words: [{text:"Impulsivo/a",dim:"D"},{text:"Introvertido/a",dim:"C"},{text:"Energico/a",dim:"I"},{text:"Tranquilo/a",dim:"S"}] },
        { id:23, words: [{text:"Buen/a comunicador/a",dim:"I"},{text:"Refinado/a",dim:"C"},{text:"Vigoroso/a",dim:"D"},{text:"Tolerante",dim:"S"}] },
        { id:24, words: [{text:"Cautivador/a",dim:"I"},{text:"Contento/a",dim:"S"},{text:"Exigente",dim:"D"},{text:"Cumplidor/a",dim:"C"}] },
        { id:25, words: [{text:"Argumentativo/a",dim:"D"},{text:"Sistematico/a",dim:"C"},{text:"Cooperador/a",dim:"S"},{text:"Despreocupado/a",dim:"I"}] },
        { id:26, words: [{text:"Jovial",dim:"I"},{text:"Preciso/a",dim:"C"},{text:"Directo/a",dim:"D"},{text:"Ecuanime",dim:"S"}] },
        { id:27, words: [{text:"Inquieto/a",dim:"D"},{text:"Amistoso/a",dim:"S"},{text:"Atrayente",dim:"I"},{text:"Cuidadoso/a",dim:"C"}] },
        { id:28, words: [{text:"Respetuoso/a",dim:"C"},{text:"Pionero/a",dim:"D"},{text:"Optimista",dim:"I"},{text:"Servicial",dim:"S"}] }
    ];
}

function getValantiQuestions() {
    return [
        { text: "Prefiero un trabajo donde pueda:", options: ["Tener autonomia e independencia", "Ayudar a otros y contribuir socialmente", "Obtener reconocimiento y estatus", "Tener estabilidad y seguridad"] },
        { text: "Lo mas importante para mi en una empresa es:", options: ["Las oportunidades de crecimiento", "El ambiente de trabajo y companerismo", "La remuneracion y beneficios", "La etica y transparencia"] },
        { text: "En mi trabajo ideal, valoro principalmente:", options: ["La creatividad y la innovacion", "Las relaciones interpersonales", "El logro de objetivos medibles", "El orden y la estructura"] },
        { text: "Ante un dilema etico en el trabajo, yo:", options: ["Priorizo la honestidad aunque tenga costos", "Busco una solucion que beneficie a todos", "Analizo el impacto en los resultados", "Sigo las normas y procedimientos establecidos"] },
        { text: "Me motiva mas un trabajo que ofrece:", options: ["Desafios intelectuales constantes", "Impacto positivo en la comunidad", "Reconocimiento por mis logros", "Balance entre vida personal y laboral"] },
        { text: "Considero que el exito profesional significa:", options: ["Alcanzar posiciones de liderazgo", "Sentir que mi trabajo hace una diferencia", "Tener libertad financiera", "Desarrollar maestria en mi area"] },
        { text: "En un conflicto laboral, valoro mas:", options: ["La justicia y equidad", "La preservacion de las relaciones", "La eficiencia en la resolucion", "El cumplimiento de las reglas"] },
        { text: "Lo que menos toleraria en un trabajo es:", options: ["La falta de desafios", "La falta de respeto entre colegas", "La deshonestidad o corrupcion", "La desorganizacion cronica"] }
    ];
}
