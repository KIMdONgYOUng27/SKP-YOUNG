const cards = [...document.querySelectorAll('[data-card]')];
const dotsRoot = document.querySelector('[data-dots]');
const params = new URLSearchParams(window.location.search);
let activeIndex = Math.min(cards.length - 1, Math.max(0, Number(params.get('card') || 1) - 1));
let isPaused = params.get('static') === '1';
let timer;

if (params.get('static') === '1') document.body.classList.add('is-static');
if (params.get('export') === '1') document.body.classList.add('is-export', 'is-static');
if (params.get('iab') === '1') document.body.classList.add('is-iab-export');
if (params.get('capture') === '1') document.body.classList.add('is-capture');

cards.forEach((card, index) => {
  card.classList.toggle('is-active', index === activeIndex);
  card.setAttribute('aria-hidden', index === activeIndex ? 'false' : 'true');
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `${index + 1}번 카드 보기`);
  dot.addEventListener('click', () => showCard(index));
  dotsRoot.append(dot);
});

const dots = [...dotsRoot.children];
const toggle = document.querySelector('[data-toggle]');

function updateQuery() {
  if (document.body.classList.contains('is-export')) return;
  const next = new URLSearchParams(window.location.search);
  next.set('card', String(activeIndex + 1));
  history.replaceState(null, '', `${window.location.pathname}?${next}`);
}

function schedule() {
  clearTimeout(timer);
  if (!isPaused && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer = setTimeout(() => showCard((activeIndex + 1) % cards.length), 4000);
  }
}

function showCard(index) {
  activeIndex = (index + cards.length) % cards.length;
  cards.forEach((card, cardIndex) => {
    const active = cardIndex === activeIndex;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-hidden', active ? 'false' : 'true');
  });
  dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === activeIndex));
  updateQuery();
  schedule();
}

function replay() {
  const card = cards[activeIndex];
  card.classList.add('is-replaying');
  requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('is-replaying')));
  schedule();
}

document.querySelector('[data-prev]').addEventListener('click', () => showCard(activeIndex - 1));
document.querySelector('[data-next]').addEventListener('click', () => showCard(activeIndex + 1));
document.querySelector('[data-replay]').addEventListener('click', replay);
toggle.addEventListener('click', () => {
  isPaused = !isPaused;
  document.body.classList.toggle('is-paused', isPaused);
  toggle.textContent = isPaused ? 'PLAY' : 'PAUSE';
  schedule();
});
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showCard(activeIndex - 1);
  if (event.key === 'ArrowRight') showCard(activeIndex + 1);
  if (event.key === ' ') { event.preventDefault(); toggle.click(); }
});

showCard(activeIndex);
