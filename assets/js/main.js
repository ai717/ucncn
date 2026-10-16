// 菜鸟笔记 - 交互脚本
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initPaginationAndFilter();
  initCodeCopy();
});

// 1. 深色 / 浅色模式切换
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('ucncn_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme === 'dark');
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ucncn_theme', newTheme);
      updateThemeIcon(newTheme === 'dark');
    });
  }
}

const SUN_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const MOON_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

function updateThemeIcon(isDark) {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.innerHTML = isDark ? SUN_SVG : MOON_SVG;
    toggleBtn.setAttribute('title', isDark ? '切换至浅色模式' : '切换至深色模式');
    toggleBtn.setAttribute('aria-label', isDark ? '切换至浅色模式' : '切换至深色模式');
  }
}

// 2. 菜鸟笔记 6条一页 分页与分类联动
const PAGE_SIZE = 6;
let currentPage = 1;
let currentCategory = 'all';

function initPaginationAndFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allCards = Array.from(document.querySelectorAll('.article-card'));
  const paginationContainer = document.getElementById('paginationContainer');

  if (!allCards.length) return;

  function getFilteredCards() {
    if (currentCategory === 'all') {
      return allCards;
    }
    return allCards.filter(card => card.getAttribute('data-cat') === currentCategory);
  }

  function renderPage(page, shouldScroll = false) {
    const filtered = getFilteredCards();
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;

    // 先隐藏所有卡片
    allCards.forEach(c => c.style.display = 'none');

    // 显示当前页切片
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageItems = filtered.slice(start, end);
    pageItems.forEach(c => c.style.display = 'block');

    // 渲染分页按钮
    renderPaginationButtons(totalPages);

    if (shouldScroll) {
      const section = document.getElementById('articles');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function renderPaginationButtons(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) {
      paginationContainer.style.display = 'none';
      return;
    }
    paginationContainer.style.display = 'flex';

    // 上一页
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '&larr; 上一页';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => renderPage(currentPage - 1, true));
    paginationContainer.appendChild(prevBtn);

    // 数字页码
    for (let i = 1; i <= totalPages; i++) {
      const numBtn = document.createElement('button');
      numBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      numBtn.textContent = i;
      numBtn.addEventListener('click', () => {
        if (currentPage !== i) {
          renderPage(i, true);
        }
      });
      paginationContainer.appendChild(numBtn);
    }

    // 下一页
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '下一页 &rarr;';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => renderPage(currentPage + 1, true));
    paginationContainer.appendChild(nextBtn);
  }

  // 绑定分类筛选点击
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat') || 'all';
      renderPage(1, false);
    });
  });

  // 初始渲染第 1 页
  renderPage(1, false);
}

// 3. 代码块一键复制体验
function initCodeCopy() {
  const preBlocks = document.querySelectorAll('pre');
  preBlocks.forEach(pre => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.textContent = '复制';
    copyBtn.style.position = 'absolute';
    copyBtn.style.top = '8px';
    copyBtn.style.right = '8px';
    copyBtn.style.fontSize = '12px';
    copyBtn.style.padding = '3px 8px';
    copyBtn.style.borderRadius = '4px';
    copyBtn.style.border = '1px solid rgba(255,255,255,0.2)';
    copyBtn.style.background = 'rgba(0,0,0,0.4)';
    copyBtn.style.color = '#fff';
    copyBtn.style.cursor = 'pointer';

    pre.style.position = 'relative';
    pre.appendChild(copyBtn);

    copyBtn.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      const textToCopy = code ? code.innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(textToCopy.replace('复制\n', '').trim());
        copyBtn.textContent = '已复制!';
        setTimeout(() => {
          copyBtn.textContent = '复制';
        }, 2000);
      } catch (err) {
        copyBtn.textContent = '失败';
        setTimeout(() => {
          copyBtn.textContent = '复制';
        }, 2000);
      }
    });
  });
}
