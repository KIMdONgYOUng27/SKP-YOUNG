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

// Tourism resource research-note modal.
const resourceData = {
  dadaepo: {
    theme: 'dadaepo',
    sidebarTitle: 'RESOURCE NOTE 01',
    rank: 'SELECTED RESOURCE · 01',
    code: 'BUSAN · SAHA',
    type: '해양·경관 / 생태 관광자원',
    title: '다대포 해수욕장',
    intro: '넓은 백사장과 고우니생태길, 낙동강 하구의 자연환경을 지나 부산 서쪽의 <strong>강렬한 노을과 야간 분수쇼</strong>까지 이어지는 하루형 해변입니다.',
    region: '부산광역시 사하구 몰운대1길 14',
    time: '봄·가을 / 일몰 1~2시간 전',
    key: '해변 산책 · 노을 · 꿈의 낙조분수',
    tags: ['#다대포', '#다대포해수욕장', '#고우니생태길', '#부산노을', '#꿈의낙조분수'],
    gallery: [
      { image: './assets/images/reports/dadaepo-sunset.jpg', label: 'SUNSET', alt: '다대포 해수욕장 노을 풍경' },
      { image: './assets/images/reports/dadaepo-beach.jpg', label: 'ECO WALK', alt: '다대포 해수욕장 생태 탐방 공간' },
      { image: './assets/images/reports/dadaepo-fountain.jpg', label: 'FOUNTAIN', alt: '다대포 꿈의 낙조분수 야간 공연' },
    ],
    programs: [
      { number: '01', kicker: 'DAY · WALK', title: '고우니생태길 & 백사장 워크', description: '해솔길에서 고우니생태길로 이어지는 평탄한 산책 동선입니다. 넓고 부드러운 모래사장과 낙동강 하구 생태 풍경을 천천히 관찰합니다.', time: '60—90 MIN', note: '편한 신발 추천' },
      { number: '02', kicker: 'GOLDEN HOUR', title: '다대포 선셋 프레임', description: '일몰 1~2시간 전에 도착해 빛의 변화를 기록합니다. 물이 빠진 넓은 모래와 얕은 물 위로 퍼지는 반영이 다대포만의 장면을 만듭니다.', time: 'SUNSET − 90', note: '서쪽 하늘 체크' },
      { number: '03', kicker: 'NIGHT · SHOW', title: '꿈의 낙조분수 나이트', description: '음악과 LED 조명, 최대 55m 높이의 물줄기가 어우러지는 20분 공연입니다. 2026년 4~8월은 평일 20시, 주말 20·21시이며 9월은 평일 19시 30분, 주말 19시 30분·20시 30분에 운영됩니다.', time: 'APR 24—SEP 30', note: '월요일 휴무' },
    ],
    reviews: [
      { score: '★★★★★', title: '노을 전후의 분위기가 완전히 달라요', text: '해가 지기 전에는 산책하기 좋고, 해가 진 뒤에는 분수쇼까지 이어져 한 장소에서 오래 머물기 좋았습니다.', name: '여행 기록자 A', meta: '가을 · 저녁 방문' },
      { score: '★★★★★', title: '사진보다 실제 공간이 더 넓어요', text: '백사장과 하늘이 크게 열려 있어 복잡한 해운대와는 다른 여유가 느껴졌어요. 일몰 시간을 맞춰 가는 걸 추천합니다.', name: '여행 기록자 B', meta: '봄 · 친구와 방문' },
      { score: '★★★★☆', title: '산책과 야간 공연을 한 번에', text: '고우니생태길을 걷고 식사한 뒤 분수 공연을 봤습니다. 바람이 강한 날에는 얇은 겉옷이 있으면 좋아요.', name: '여행 기록자 C', meta: '여름 · 가족 방문' },
    ],
    sources: [
      { label: '사하구 꿈의 낙조분수 2026 운영안내 ↗', url: 'https://health.saha.go.kr/tour/contents.do?mId=0609000000' },
      { label: '한국관광공사 다대포해수욕장 ↗', url: 'https://data.visitkorea.or.kr/linkedview/126079' },
      { label: '부산국가지질공원 다대포 ↗', url: 'https://www.busan.go.kr/geopark_en/dadaepo' },
    ],
  },
  gwangalli: {
    theme: 'gwangalli', sidebarTitle: 'RESOURCE NOTE 02', rank: 'SELECTED RESOURCE · 02', code: 'BUSAN · SUYEONG',
    type: '해양·경관 / 야간 관광자원', title: '광안리해수욕장',
    intro: '광안대교를 중심으로 해변과 야경, 상권과 이벤트가 촘촘하게 연결되는 <strong>부산의 체류형 나이트 비치</strong>입니다.',
    region: '부산광역시 수영구 광안해변로', time: '연중 / 일몰 이후 야간', key: '광안대교 야경 · 해변 산책 · 로컬 상권',
    tags: ['#광안리', '#광안대교', '#부산야경', '#해변산책', '#드론라이트쇼'],
    gallery: [{ label:'BLUE HOUR',alt:'광안리 블루아워 이미지 영역' },{ label:'BRIDGE',alt:'광안대교 이미지 영역' },{ label:'NIGHT LIFE',alt:'광안리 야간 상권 이미지 영역' }],
    programs: [
      { number:'01',kicker:'SUNSET · WALK',title:'블루아워 브리지 워크',description:'해가 진 직후 광안대교의 조명이 선명해지는 시간에 해변을 따라 걷는 코스입니다.',time:'45 MIN',note:'일몰 직후 추천' },
      { number:'02',kicker:'LOCAL · TASTE',title:'해변 로컬 테이블',description:'해변 인근의 카페와 식당을 한 곳씩 골라 야경과 함께 광안리의 체류 경험을 확장합니다.',time:'60—90 MIN',note:'주말 대기 고려' },
      { number:'03',kicker:'WEEKEND · EVENT',title:'나이트 이벤트 체크인',description:'드론쇼와 계절 행사는 운영 일정이 달라질 수 있으므로 방문 전 공식 공지를 확인하는 프로그램입니다.',time:'NIGHT',note:'공식 일정 확인' },
    ],
    reviews: [
      { score:'★★★★★',title:'야경을 보며 오래 머물기 좋아요',text:'산책, 식사, 카페가 한 동선 안에 있어 저녁 시간을 보내기 편했습니다.',name:'여행 기록자 D',meta:'여름 · 커플 방문' },
      { score:'★★★★☆',title:'주말에는 활기, 평일에는 여유',text:'같은 해변도 요일에 따라 분위기가 달라요. 사진은 해가 진 직후가 특히 좋았습니다.',name:'여행 기록자 E',meta:'평일 · 야간 방문' },
      { score:'★★★★★',title:'광안대교가 만드는 확실한 장면',text:'멀리 이동하지 않아도 부산다운 야경을 충분히 담을 수 있었습니다.',name:'여행 기록자 F',meta:'가을 · 친구와 방문' },
    ], sources:[{ label:'부산 관광정보 공식 채널 확인 ↗',url:'https://www.visitbusan.net/' }],
  },
  gamcheon: {
    theme: 'gamcheon', sidebarTitle: 'RESOURCE NOTE 03', rank: 'SELECTED RESOURCE · 03', code: 'BUSAN · SAHA',
    type: '역사·문화 / 도시재생 관광자원', title: '감천문화마을',
    intro: '산복도로의 입체적인 마을 경관과 피란민의 생활사가 겹쳐진 <strong>걷고 읽는 부산의 문화 아카이브</strong>입니다.',
    region: '부산광역시 사하구 감내2로', time: '봄·가을 / 오전~늦은 오후', key: '골목 탐방 · 전망 포인트 · 피란문화 이야기',
    tags: ['#감천문화마을', '#산복도로', '#도시재생', '#골목여행', '#부산역사'],
    gallery: [{ label:'COLOR',alt:'감천문화마을 색채 이미지 영역' },{ label:'ALLEY',alt:'감천문화마을 골목 이미지 영역' },{ label:'VILLAGE',alt:'감천문화마을 전경 이미지 영역' }],
    programs: [
      { number:'01',kicker:'MORNING · WALK',title:'컬러 골목 워크',description:'큰길보다 작은 골목의 색과 생활 흔적을 관찰하며 마을의 입체적인 구조를 기록합니다.',time:'60 MIN',note:'조용한 오전 추천' },
      { number:'02',kicker:'VIEW · POINT',title:'산복도로 전망 수집',description:'높낮이가 다른 전망 포인트에서 마을과 바다가 겹쳐지는 구도를 찾아봅니다.',time:'45 MIN',note:'망원 화각 추천' },
      { number:'03',kicker:'STORY · ARCHIVE',title:'피란문화 스토리 노트',description:'화려한 색채 뒤에 있는 마을의 형성과 생활사를 중심으로 장소를 읽습니다.',time:'60 MIN',note:'주민 생활 배려' },
    ],
    reviews: [
      { score:'★★★★★',title:'사진과 이야기를 함께 볼 때 더 좋아요',text:'전망만 보는 것보다 마을의 역사를 알고 걸으니 골목이 다르게 보였습니다.',name:'여행 기록자 G',meta:'봄 · 혼자 방문' },
      { score:'★★★★☆',title:'천천히 걸어야 보이는 곳',text:'경사가 있어 편한 신발이 필요하지만 작은 풍경을 발견하는 재미가 컸습니다.',name:'여행 기록자 H',meta:'가을 · 가족 방문' },
      { score:'★★★★★',title:'부산의 생활 풍경을 가까이에서',text:'관광지이면서 실제 생활 공간이라는 점을 의식해 조용히 둘러봤습니다.',name:'여행 기록자 I',meta:'평일 · 오후 방문' },
    ], sources:[{ label:'사하구 문화관광 감천문화마을 ↗',url:'https://health.saha.go.kr/tour/contents.do?mId=0101040000' }],
  },
};

const resourceModal = document.querySelector('[data-resource-modal]');
const resourceScroll = document.querySelector('[data-resource-scroll]');
const resourceJumpButtons = [...document.querySelectorAll('[data-resource-jump]')];
let resourceModalTrigger = null;

const fillResourceModal = (data) => {
  resourceModal.className = `resource-modal theme-${data.theme}`;
  document.querySelector('[data-resource-sidebar-title]').textContent = data.sidebarTitle;
  document.querySelector('[data-resource-rank]').textContent = data.rank;
  document.querySelector('[data-resource-location-code]').textContent = data.code;
  document.querySelector('[data-resource-type]').textContent = data.type;
  document.querySelector('[data-resource-title]').textContent = data.title;
  document.querySelector('[data-resource-intro]').innerHTML = data.intro;
  document.querySelector('[data-resource-region]').textContent = data.region;
  document.querySelector('[data-resource-time]').textContent = data.time;
  document.querySelector('[data-resource-key]').textContent = data.key;
  document.querySelector('[data-resource-tags]').innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');

  document.querySelectorAll('[data-resource-gallery] .resource-photo').forEach((photo, index) => {
    const item = data.gallery[index];
    photo.style.backgroundImage = item.image ? `url("${item.image}")` : '';
    photo.setAttribute('role', 'img');
    photo.setAttribute('aria-label', item.alt);
    document.querySelector(`[data-photo-label="${index}"]`).textContent = item.label;
  });

  document.querySelector('[data-resource-programs]').innerHTML = data.programs.map((program) => `
    <article class="program-card">
      <div class="program-card-head"><span>${program.number}</span><span>${program.kicker}</span></div>
      <div class="program-visual" aria-hidden="true"></div>
      <h4>${program.title}</h4><p>${program.description}</p>
      <footer><span>${program.time}</span><span>${program.note}</span></footer>
    </article>`).join('');

  document.querySelector('[data-resource-reviews]').innerHTML = data.reviews.map((review, index) => `
    <article class="review-card"><span aria-label="별점">${review.score}</span><h4>${review.title}</h4><p>${review.text}</p>
      <footer><span class="review-avatar">${String.fromCharCode(65 + index)}</span><p>${review.name}<small>${review.meta}</small></p></footer>
    </article>`).join('');

  document.querySelector('[data-resource-sources]').innerHTML = data.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`).join('');
};

const updateResourceNav = () => {
  if (!resourceScroll || !resourceModal?.classList.contains('is-open')) return;
  const sections = [...document.querySelectorAll('[data-resource-section]')];
  let activeId = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= resourceScroll.scrollTop + 130) activeId = section.id;
  });
  resourceJumpButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.resourceJump === activeId));
};

const closeResourceModal = () => {
  if (!resourceModal) return;
  resourceModal.classList.remove('is-open');
  resourceModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('resource-modal-open');
  resourceModalTrigger?.focus();
};

document.querySelectorAll('[data-resource-open]').forEach((button) => button.addEventListener('click', () => {
  const data = resourceData[button.dataset.resourceOpen];
  if (!data || !resourceModal) return;
  resourceModalTrigger = button;
  fillResourceModal(data);
  resourceModal.classList.add('is-open');
  resourceModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('resource-modal-open');
  resourceScroll.scrollTop = 0;
  updateResourceNav();
  resourceModal.querySelector('.resource-modal-close').focus();
}));

document.querySelectorAll('[data-resource-close]').forEach((button) => button.addEventListener('click', closeResourceModal));
resourceJumpButtons.forEach((button) => button.addEventListener('click', () => {
  document.getElementById(button.dataset.resourceJump)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));
resourceScroll?.addEventListener('scroll', updateResourceNav, { passive: true });

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && resourceModal?.classList.contains('is-open')) closeResourceModal();
});

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
