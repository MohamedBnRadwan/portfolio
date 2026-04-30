(() => {
  const themes = [
    { key: 'dark', bs: 'dark' },
    { key: 'light', bs: 'light' },
    { key: 'ocean', bs: 'dark' }
  ];

  let index = 0;

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme.key);
    document.documentElement.setAttribute('data-bs-theme', theme.bs);
  };

  const stored = localStorage.getItem('portfolio-theme');
  const foundIndex = themes.findIndex(t => t.key === stored);
  index = foundIndex >= 0 ? foundIndex : 0;
  applyTheme(themes[index]);

  setInterval(() => {
    index = (index + 1) % themes.length;
    const theme = themes[index];
    applyTheme(theme);
    localStorage.setItem('portfolio-theme', theme.key);
  }, 60000);
})();
