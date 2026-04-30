(() => {
  const themes = ["dark", "light", "ocean"];
  const key = "portfolio-theme-index";

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme === "light" ? "light" : "dark");
  };

  const getIndex = () => {
    const raw = Number(localStorage.getItem(key));
    return Number.isInteger(raw) && raw >= 0 ? raw % themes.length : 0;
  };

  let current = getIndex();
  applyTheme(themes[current]);

  setInterval(() => {
    current = (current + 1) % themes.length;
    localStorage.setItem(key, String(current));
    applyTheme(themes[current]);
  }, 60000);
})();
