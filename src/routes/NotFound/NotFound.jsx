import { useNavigate } from 'react-router';
import useI18n from '@/useI18n';

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useI18n();
  return (
    <main>
      <h2>[404] {t("notfound.title")}</h2>
      <br />
      <section>
        <button onClick={() => navigate("/")}>[{t("notfound.home")}]</button>
      </section>
    </main>
  );
}
