document.addEventListener('DOMContentLoaded', () => {
    const appsContainer = document.getElementById('apps-container');

    if (!appsContainer) return;

    // Check if the global 'apps' variable is available (loaded from apps.js)
    if (typeof apps !== 'undefined' && Array.isArray(apps)) {
        renderApps(apps, appsContainer);
    } else {
        console.error('Apps data not found. Ensure apps.js is loaded correctly.');
        // Fallback or attempt fetch if not running locally for some reason, 
        // but for this specific request we assume usage of the global var.
        appsContainer.innerHTML = '<p style="text-align: center;">Unable to load apps. Please ensure apps.js is loading.</p>';
    }
});

function renderApps(appsList, container) {
    container.innerHTML = appsList.map(app => `
        <div class="project-card">
            <div class="project-icon">
                <img src="${app.image}" alt="${app.name} App Icon">
            </div>
            <div class="project-content">
                <h3>${app.name}</h3>
                <p class="tagline">${app.tagline}</p>
                <p class="description">
                    ${app.description}
                </p>
                <ul class="features">
                    ${app.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="project-links">
                    <a href="${app.link || '#'}" class="btn btn-primary">View Project</a>
                </div>
            </div>
        </div>
    `).join('');
}
