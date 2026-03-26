// ============================================
// Portal Administracion - PraxisPersonas
// ============================================

// ---- NAVEGACION ----
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById('page-' + pageId);
    if (page) page.classList.add('active');

    // Actualizar sidebar
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`.sidebar-link[data-page="${pageId}"]`);
    if (link) link.classList.add('active');

    // Sublinks
    document.querySelectorAll('.sidebar-sublink').forEach(l => l.classList.remove('active'));
    const sublink = document.querySelector(`.sidebar-sublink[data-page="${pageId}"]`);
    if (sublink) sublink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Renderizar charts si es dashboard
    if (pageId === 'dashboard') setTimeout(renderDashboardCharts, 100);
    if (pageId === 'detalle') setTimeout(renderDetalleCharts, 100);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function toggleSubmenu(el) {
    el.classList.toggle('open');
    const submenu = el.nextElementSibling;
    if (submenu) submenu.classList.toggle('open');
}

// ---- DETALLE TABS ----
function showDetalleTab(tabId) {
    document.querySelectorAll('.detalle-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');

    document.querySelectorAll('#detalleTabs .nav-link').forEach(l => l.classList.remove('active'));
    event.target.classList.add('active');

    if (tabId === 'tests') setTimeout(renderDetalleCharts, 100);
}

function showTestResultTab(tabId) {
    document.querySelectorAll('.test-result-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');

    document.querySelectorAll('#testResultsTabs .nav-link').forEach(l => l.classList.remove('active'));
    event.target.classList.add('active');

    if (tabId === 'disc-result') setTimeout(() => renderRadarChart('chart-disc-admin', [8,5,10,5], ['D','I','S','C'], ['#e74c3c','#f59e0b','#10b981','#6366f1']), 100);
    if (tabId === 'liderazgo-result') setTimeout(() => renderBarChart('chart-liderazgo-admin', [2,4,3,3], ['E1-Dirigir','E2-Instruir','E3-Apoyar','E4-Delegar'], ['#e74c3c','#f59e0b','#10b981','#3498db']), 100);
}

// ---- CHARTS ----
let chartInstances = {};

function renderDashboardCharts() {
    // Candidatos por etapa
    renderPieChart('chart-etapas', [184,54,15,1,15], ['Pre-seleccion','Valorados','Valoracion Cliente','Terna','Seleccionado'], ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6']);
    // Tiempos por etapa
    renderPieChart('chart-tiempos', [7350,4857,4731,5943,1917], ['Reclutamiento','Long List','Valoracion/Presentacion','Entrevista Cliente','Carta de Oferta'], ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6']);
}

function renderPieChart(canvasId, data, labels, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
    chartInstances[canvasId] = new Chart(canvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{ data: data, backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right', labels: { font: { size: 11 }, padding: 12 } }
            }
        }
    });
}

function renderRadarChart(canvasId, data, labels, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
    chartInstances[canvasId] = new Chart(canvas.getContext('2d'), {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Perfil',
                data: data,
                backgroundColor: 'rgba(99,102,241,0.15)',
                borderColor: '#6366f1',
                borderWidth: 2,
                pointBackgroundColor: colors,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: { r: { beginAtZero: true, ticks: { stepSize: 2 } } },
            plugins: { legend: { display: false } }
        }
    });
}

function renderBarChart(canvasId, data, labels, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
    chartInstances[canvasId] = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.map(c => c + 'cc'),
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 12, ticks: { stepSize: 1 } } }
        }
    });
}

function renderDetalleCharts() {
    // Pre-render if visible
}

// ---- GENERADOR DE REPORTE IA ----
async function generateAIReport() {
    const area = document.getElementById('ai-report-area');
    const chkDisc = document.getElementById('chk-disc').checked;
    const chkBarrat = document.getElementById('chk-barrat').checked;
    const chkValanti = document.getElementById('chk-valanti').checked;
    const chkLiderazgo = document.getElementById('chk-liderazgo').checked;

    if (!chkDisc && !chkBarrat && !chkValanti && !chkLiderazgo) {
        area.innerHTML = '<p class="text-danger"><i class="fas fa-exclamation-triangle"></i> Selecciona al menos un test para generar el reporte.</p>';
        return;
    }

    area.innerHTML = '<div class="text-center py-4"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Generando reporte con IA...</p></div>';

    // Construir prompt con los tests seleccionados
    let testData = 'Datos del candidato: Francisco Guajardo Sempertegui, postulando a Tecnico en instalaciones electricas.\n\n';
    if (chkDisc) testData += 'RESULTADOS DISC: D(Dominancia)=8, I(Influencia)=5, S(Estabilidad)=10, C(Cumplimiento)=5. Perfil predominante: S (Estabilidad).\n\n';
    if (chkBarrat) testData += 'RESULTADOS BARRAT (BIS-11): Impulsividad Cognitiva=12, Impulsividad Motora=18, Impulsividad No Planificada=15. Total=45 (rango normal).\n\n';
    if (chkValanti) testData += 'RESULTADOS VALANTI: Valores=72, Antivalores=28, Indice Etico=Alto, Consistencia=85%.\n\n';
    if (chkLiderazgo) testData += 'RESULTADOS LIDERAZGO SITUACIONAL: E1(Dirigir)=2, E2(Instruir)=4, E3(Apoyar)=3, E4(Delegar)=3. Estilo predominante: E2 (Instruir). Adaptabilidad: 28/36 (Moderada).\n\n';

    const prompt = `Eres un psicologo organizacional experto en seleccion de personal. Genera un reporte consolidado analizando los siguientes resultados de tests psicologicos de un candidato.

${testData}

Genera un analisis profesional en español que incluya:
1. Perfil comportamental del candidato
2. Fortalezas identificadas
3. Areas de desarrollo
4. Recomendaciones para el cargo
5. Conclusion general

El tono debe ser profesional, objetivo y constructivo. Escribe en parrafos fluidos, no en bullets. Maximo 400 palabras.`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: 'Eres un psicologo organizacional experto. Responde en español profesional.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 2048
            })
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const result = await response.json();
        const text = result.choices[0].message.content;

        // Formatear el texto en HTML
        const formatted = text.split('\n').filter(l => l.trim()).map(p => `<p>${p}</p>`).join('');
        area.innerHTML = formatted;

    } catch (error) {
        console.error('AI Report error:', error);
        area.innerHTML = `<p class="text-danger"><i class="fas fa-exclamation-triangle"></i> Error al generar el reporte: ${error.message}</p>
        <p class="text-muted">Puedes escribir tu analisis manualmente en este espacio.</p>`;
    }
}

// ---- LOGIN / LOGOUT ----
function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    if (!email || !password) {
        errorEl.textContent = 'Ingresa tu correo y contrasena.';
        errorEl.classList.remove('d-none');
        return;
    }

    // Simulacion de validacion (en produccion seria una llamada API)
    if (password.length < 3) {
        errorEl.textContent = 'Contrasena incorrecta. Intenta de nuevo.';
        errorEl.classList.remove('d-none');
        return;
    }

    errorEl.classList.add('d-none');

    // Actualizar header con datos del usuario
    const initials = email.split('@')[0].substring(0, 2).toUpperCase();
    document.getElementById('header-avatar').textContent = initials;
    document.getElementById('header-username').textContent = email;

    // Guardar sesion
    sessionStorage.setItem('pp_logged_in', 'true');
    sessionStorage.setItem('pp_user_email', email);

    // Ocultar login con animacion
    document.getElementById('login-overlay').classList.add('hidden');
}

function handleLogout() {
    sessionStorage.removeItem('pp_logged_in');
    sessionStorage.removeItem('pp_user_email');

    // Mostrar login
    const overlay = document.getElementById('login-overlay');
    overlay.classList.remove('hidden');

    // Limpiar password
    document.getElementById('login-password').value = '';
}

function togglePasswordVisibility() {
    const pw = document.getElementById('login-password');
    const icon = document.getElementById('pw-toggle-icon');
    if (pw.type === 'password') {
        pw.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        pw.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function checkSession() {
    const loggedIn = sessionStorage.getItem('pp_logged_in');
    if (loggedIn === 'true') {
        const email = sessionStorage.getItem('pp_user_email') || '';
        const initials = email.split('@')[0].substring(0, 2).toUpperCase();
        document.getElementById('header-avatar').textContent = initials;
        document.getElementById('header-username').textContent = email;
        document.getElementById('login-overlay').classList.add('hidden');
    }
}

// Enter key en login
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !document.getElementById('login-overlay').classList.contains('hidden')) {
        handleLogin();
    }
});

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    // Verificar sesion
    checkSession();

    // Abrir submenu de Informes por defecto
    const informesSubmenu = document.querySelector('.sidebar-submenu');
    if (informesSubmenu) informesSubmenu.classList.add('open');
    const informesLink = document.querySelector('.has-sub');
    if (informesLink) informesLink.classList.add('open');

    // Render dashboard charts
    setTimeout(renderDashboardCharts, 300);
});
