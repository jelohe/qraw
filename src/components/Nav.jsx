import { NavLink } from "react-router";
import useI18n from '@/useI18n';

export default function Nav() {
  const { t } = useI18n();

  return (
    <nav>
      <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">[&gt;</span>
        <span className="nav-text">{t('nav.scan')}</span>
      </NavLink>
      <NavLink to="/upload" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">[^</span>
        <span className="nav-text">{t('nav.upload')}</span>
      </NavLink>
      <NavLink to="/create" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">[+]</span>
        <span className="nav-text">{t('nav.create')}</span>
      </NavLink>
      <NavLink to="/history" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">[#]</span>
        <span className="nav-text">{t('nav.history')}</span>
      </NavLink>
    </nav>
  );
}
