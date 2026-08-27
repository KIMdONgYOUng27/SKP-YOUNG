const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.querySelector('.sr-only').textContent = willOpen ? '메뉴 닫기' : '메뉴 열기';
  mobileMenu?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    menuButton.click();
    menuButton.focus();
  }
});

// Mark the current menu item on every page.
const currentPage = document.body.dataset.page;
const pageFiles = {
  report: 'report.html',
  contents: 'contents.html',
  sns: 'sns.html',
  'final-project': 'final-project.html',
};
if (pageFiles[currentPage]) {
  document.querySelectorAll(`a[href$="${pageFiles[currentPage]}"]`).forEach((link) => {
    link.classList.add('is-current');
    link.setAttribute('aria-current', 'page');
  });
}

// Gentle reveal only when elements enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Report search and category filtering.
const reportItems = [...document.querySelectorAll('[data-report-item]')];
const reportSearch = document.querySelector('[data-report-search]');
const reportFilters = document.querySelectorAll('[data-report-filter]');
const reportEmpty = document.querySelector('[data-report-empty]');
let reportCategory = 'all';

const filterReport = () => {
  const query = reportSearch?.value.trim().toLocaleLowerCase('ko') ?? '';
  let visibleCount = 0;
  reportItems.forEach((item) => {
    const categoryMatch = reportCategory === 'all' || item.dataset.category === reportCategory;
    const searchMatch = (item.dataset.search ?? item.textContent).toLocaleLowerCase('ko').includes(query);
    const visible = categoryMatch && searchMatch;
    item.classList.toggle('is-hidden', !visible);
    if (visible) visibleCount += 1;
  });
  reportEmpty?.classList.toggle('is-visible', visibleCount === 0);
};

reportSearch?.addEventListener('input', filterReport);
reportFilters.forEach((button) => button.addEventListener('click', () => {
  reportCategory = button.dataset.reportFilter;
  reportFilters.forEach((item) => item.classList.toggle('is-active', item === button));
  filterReport();
}));

// Contents filtering and accessible detail modal.
const contentItems = [...document.querySelectorAll('[data-content-item]')];
const contentFilters = document.querySelectorAll('[data-content-filter]');
const contentCount = document.querySelector('[data-content-count]');
contentFilters.forEach((button) => button.addEventListener('click', () => {
  const type = button.dataset.contentFilter;
  let visibleCount = 0;
  contentFilters.forEach((item) => item.classList.toggle('is-active', item === button));
  contentItems.forEach((item) => {
    const visible = type === 'all' || item.dataset.type === type;
    item.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  if (contentCount) contentCount.textContent = String(visibleCount).padStart(2, '0');
}));

const modal = document.querySelector('[data-modal]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalMeta = document.querySelector('[data-modal-meta]');
const modalDescription = document.querySelector('[data-modal-description]');
let modalTrigger = null;

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
  modalTrigger?.focus();
};

document.querySelectorAll('[data-modal-open]').forEach((button) => button.addEventListener('click', () => {
  modalTrigger = button;
  if (modalTitle) modalTitle.textContent = button.dataset.title;
  if (modalMeta) modalMeta.textContent = button.dataset.meta;
  if (modalDescription) modalDescription.textContent = button.dataset.description;
  modal?.classList.add('is-open');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
  modal?.querySelector('[data-modal-close]')?.focus();
}));
document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModal));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
});

// Dashboard period selector updates example metrics without external data.
const periodSelect = document.querySelector('[data-period-select]');
const metricSets = {
  '30': { posts: '24', views: '82.4K', reach: '61.8K', engagement: '8.6%' },
  '90': { posts: '58', views: '196K', reach: '143K', engagement: '7.9%' },
  all: { posts: '86', views: '312K', reach: '228K', engagement: '8.2%' },
};
periodSelect?.addEventListener('change', () => {
  const metrics = metricSets[periodSelect.value];
  Object.entries(metrics).forEach(([key, value]) => {
    const element = document.querySelector(`[data-metric="${key}"]`);
    if (element) element.textContent = value;
  });
});
