import { NavLink } from "react-router";
import useI18n from '@/useI18n';

export default function Nav() {
  const { t } = useI18n();

  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
        {t('nav.scan')}
      </NavLink>

      <NavLink to="/upload" className={({ isActive }) => isActive ? "active" : ""}>
        {t('nav.upload')}
      </NavLink>

      <NavLink to="/create" className={({ isActive }) => isActive ? "active" : ""}>
        {t('nav.create')}
      </NavLink>

      <NavLink to="/history" className={({ isActive }) => isActive ? "active" : ""}>
        {t('nav.history')}
      </NavLink>
    </nav>
  );
}
