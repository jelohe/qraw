import useI18n from '@/useI18n';
import Nav from '@/components/Nav';

export default function Header() {
  const { t, LangSelector, lang, setLang } = useI18n();

      // <LangSelector lang={lang} setLang={setLang} />
  return (<>
    <header>
      <h1>{t("header.title")}</h1>
    </header>
    <Nav />
  </>);
}
