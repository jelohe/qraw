import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Nav from '@/components/Nav';
import useI18n from '@/useI18n';

export default function Layout() {
  const { lang, setLang, LangSelector, t } = useI18n();
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      return stored ? JSON.parse(stored) : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <header className="header">
        <span className="header-brand">
          <span className="brand-accent">QR</span>aw
        </span>
        <span className="header-controls">
          <span className="header-theme">
            <select value={theme} onChange={e => setTheme(e.target.value)}>
              <option value="light">{t("theme.light")}</option>
              <option value="dark">{t("theme.dark")}</option>
            </select>
          </span>
          <span className="header-lang">
            <LangSelector lang={lang} setLang={setLang} />
          </span>
        </span>
      </header>
      <Outlet />
      <Nav />
    </>
  );
}
