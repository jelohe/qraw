import { NavLink } from "react-router";
import useI18n from '@/useI18n';

export default function Nav() {
  const { t } = useI18n();

  return (
    <nav>
      <NavLink to="/">{t('nav.scan')}</NavLink>
      <NavLink to="/upload">{t('nav.upload')}</NavLink>
      <NavLink to="/create">{t('nav.create')}</NavLink>
      <NavLink to="/history">{t('nav.history')}</NavLink>
    </nav>
  );
}
