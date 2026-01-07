document.addEventListener('DOMContentLoaded', () => {
    const appsContainer = document.getElementById('apps-container');

    // Initialize Card Rendering
    if (appsContainer && typeof apps !== 'undefined' && Array.isArray(apps)) {
        renderApps(apps, appsContainer);
    }

    // Initialize Animations
    initializeAnimations();
});

function renderApps(appsList, container) {
    // Add delay variable for staggered animation
    let delay = 0.1;

    container.innerHTML = appsList.map((app, index) => {
        const staggerStyle = `style="transition-delay: ${index * 0.1}s"`;

        return `
        <article class="project-card fade-up" ${staggerStyle}>
            <div class="card-header">
                <div class="project-icon">
                    <img src="${app.image}" alt="${app.name} icon" loading="lazy">
                </div>
                <div class="project-title">
                    <h3>${app.name}</h3>
                    <span class="tagline">${app.tagline}</span>
                </div>
            </div>
            
            <p class="description">
                ${app.description}
            </p>
            
            <ul class="features">
                ${app.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <div class="card-footer">
                <a href="${app.link || '#'}" class="btn btn-primary">
                    View Project
                </a>
            </div>
        </article>
    `}).join('');

    // Trigger reflow to ensure animations play if elements are added dynamically
    // But since we use IntersectionObserver, we just need to observe them now
    observerNewElements(container);
}

function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observer existing elements with fade-up class
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

function observerNewElements(container) {
    // Re-run observer for newly added cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    container.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}
