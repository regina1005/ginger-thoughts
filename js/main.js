const applyTheme = (theme) => {
  document.body.classList.toggle('dark', theme === 'dark');
  const button = document.querySelector('[data-theme-toggle]');
  if (button) {
    button.textContent = theme === 'dark' ? '☀︎ Light' : '☾ Dark';
    button.setAttribute('aria-label', theme === 'dark' ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln');
  }
};

const storedTheme = localStorage.getItem('ginger-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem('ginger-theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  const searchInput = document.querySelector('[data-search]');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const posts = document.querySelectorAll('[data-post]');
  const emptyState = document.querySelector('[data-empty]');

  if (posts.length) {
    let activeFilter = 'Alle';

    const updatePosts = () => {
      const query = (searchInput?.value || '').trim().toLowerCase();
      let visibleCount = 0;

      posts.forEach((post) => {
        const text = post.dataset.search.toLowerCase();
        const category = post.dataset.category;
        const matchesFilter = activeFilter === 'Alle' || category === activeFilter;
        const matchesQuery = !query || text.includes(query);
        const visible = matchesFilter && matchesQuery;
        post.style.display = visible ? '' : 'none';
        if (visible) visibleCount += 1;
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        activeFilter = button.dataset.filter;
        updatePosts();
      });
    });

    searchInput?.addEventListener('input', updatePosts);
    updatePosts();
  }
});
