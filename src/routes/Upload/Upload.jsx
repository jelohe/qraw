import useI18n from '@/useI18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Upload() {
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main>
        <h2>{t("upload.subtitle")}</h2>
        <input type="file" />
      </main>
      <Footer />
    </>
  );
}
