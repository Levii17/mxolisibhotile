// Dynamically import section scripts only if their section exists
document.addEventListener('DOMContentLoaded', () => {
  // HERO section: particles.js and 3D model
  if (document.getElementById('particles-js')) {
    // Load particles.js from CDN and initialize
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS.load('particles-js', '/particles.json', function() {
          // particles.js loaded
        });
      }
    };
    document.body.appendChild(script);
  }

  if (document.getElementById('three-canvas')) {
    import('./model.js').then(mod => {
      if (mod.initModel) mod.initModel();
    });
  }
  if (document.getElementById('about')) {
    import('./about.js').then(mod => {
      if (mod.initAbout) mod.initAbout();
    });
  }
  if (document.getElementById('benefits')) {
    import('./benefits.js');
  }
  if (document.getElementById('contact')) {
    import('./contact.js');
  }
  if (document.querySelector('footer')) {
    import('./footer.js');
  }
  if (document.getElementById('process')) {
    import('./process.js').then(mod => mod.initProcess());
  }
  if (document.body) {
    import('./script.js').then(mod => mod.initScript());
    import('./theme.js').then(mod => mod.initTheme());
  }
  if (document.getElementById('works')) {
    import('./works.js');
  }
});