import { useState } from 'react';
import useI18n from '@/useI18n';
import Scanner from './Scanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Scan() {
  const { t } = useI18n();
  const [result, setResult] = useState(null);

  const handleScan = uris => {
    if (uris && uris.length > 0)
      setResult(uris[0].rawValue);
  };
  const handleDiscard = () => setResult(null);
  const handleOpen = () => window.open(result, "_blank");

  return (
    <>
      <Header />
      <main>
        <h2>{t("scan.subtitle")}</h2>
        <div className="scanner">
          {result && <Found display={result} />}
          {!result && (
            <Scanner Loading={Loading} Error={Error} onScan={handleScan} />
          )}
        </div>
        <section>
          {!result && <button>{t("scan.scan")}</button>}
          {result && <>
            <button onClick={handleDiscard}>{t("scan.discard")}</button>
            <button onClick={handleOpen}>{t("scan.open")}</button>
          </>}
        </section>
      </main>
      <Footer />
    </>
  );
}

function Loading() {
  const { t } = useI18n();
  return (<span>{t("scan.loading")}</span>);
}

function Error() {
  const { t } = useI18n();
  return (<span><mark>{t("scan.error")}</mark></span>);
}

function Found({ display }) {
  const { t } = useI18n();
  return (
    <div className="detected-box">
      <h2>{t("scan.found")}</h2>
      <a>{display}</a>
    </div>
  );
}
