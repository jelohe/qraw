import { NavLink } from "react-router";
import useI18n from '@/useI18n';

export default function Header() {
  const { t } = useI18n();

  return (
    <footer>
      <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
        {t('footer.scan')}
      </NavLink>

      <NavLink to="/upload" className={({ isActive }) => isActive ? "active" : ""}>
        {t('footer.upload')}
      </NavLink>

      <NavLink to="/create" className={({ isActive }) => isActive ? "active" : ""}>
        {t('footer.create')}
      </NavLink>

      <NavLink to="/history" className={({ isActive }) => isActive ? "active" : ""}>
        {t('footer.history')}
      </NavLink>
    </footer>
  );
}
