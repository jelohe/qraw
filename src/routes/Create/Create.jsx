import useI18n from '@/useI18n';
import Header from '@/components/Header';

export default function Create() {
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main>
        <h2>{t("create.subtitle")}</h2>
        <input type="text" placeholder={t("create.placeholder")} />
        <br />
        <br />
        <button>Create</button>
        <br />
        <br />
        <hr />
        <h3>TBD</h3>
        <p>Here you will be able to create a QR writing or pasting a url (or any data, really)</p>
      </main>
    </>
  );
}
