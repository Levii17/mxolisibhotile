// Dynamically import section scripts only if their section exists
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('about')) {
    import('./about.js');
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
    import('./process.js');
  }
  if (document.body) {
    import('./script.js');
    import('./theme.js');
  }
  if (document.getElementById('works')) {
    import('./works.js');
  }
});