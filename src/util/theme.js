
export const setColorTheme = (calcName) => {
  const colorTheme = {
    custom: '#7e5ab8',
    terminal: '#1ea935',
    macwidget: '#3276b5',
  };
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = colorTheme[calcName];
};
