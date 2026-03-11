import useI18n from '@/useI18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Create() {
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main>
        <h2>CREATE</h2>
      </main>
      <Footer />
    </>
  );
}
