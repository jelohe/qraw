import useI18n from '@/useI18n';
import Header from '@/components/Header';

export default function Upload() {
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main>
        <h2>{t("upload.subtitle")}</h2>
        <input type="file" />
        <br />
        <br />
        <hr />
        <h3>TBD</h3>
        <p>
          In the future, this will display the qr and store it in history.
          <br />
          It will also show a button to open and a button to discard, like in the Scan screen.
        </p>
      </main>
    </>
  );
}
