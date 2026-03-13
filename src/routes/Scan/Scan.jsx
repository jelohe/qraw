import { useState } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import Scanner from './Scanner';
import Header from '@/components/Header';

export default function Scan() {
  const { t } = useI18n();
  const { add } = useHistory();
  const wadus = "https://key0.app";
  const [result, setResult] = useState(wadus);
  const STATE = {
    IDLE: 'idle',
    SCAN: 'scanning',
    ERROR: 'error',
    FOUND: 'found',
  }
  const [state, setState] = useState(STATE.IDLE);

  function handleScan(uris) {
    if (!uris || uris.length <= 0) return;

    const uri = uris[0].rawValue;
    add(uri);
    setResult(uri);
    setState(STATE.FOUND);
  };
  const handleDiscard = () => {
    setResult();
    setState(STATE.SCAN);
  }
  const handleOpen = () => {
    window.open(result, "_blank");
  }
  const handleError = () => setState(STATE.ERROR);
  const handleOpenCam = () => setState(STATE.SCAN);
  const handleCloseCam = () => setState(STATE.IDLE);

  return (
    <>
      <Header />
      <main>
        <h2>{t("scan.subtitle")}</h2>
        <div className="scanner">
          {(state === STATE.ERROR) && <Error />}
          {(state === STATE.FOUND) && <Found display={result} />}
          {(state === STATE.IDLE) && <span>{t("scan.camera.preview")}</span>}
          {(state === STATE.SCAN) && (
            <Scanner
              onError={handleError}
              Loading={Loading}
              Error={Error}
              onScan={handleScan}
            />
          )}
        </div>
        <section>
          {(state === STATE.ERROR) && <button onClick={handleOpenCam}>{t("scan.retry")}</button>}
          {(state === STATE.FOUND) && (
            <>
              <button onClick={handleDiscard}>{t("scan.discard")}</button>
              <button onClick={handleOpen}>{t("scan.open")}</button>
            </>
          )}
          {(state === STATE.IDLE) && (
            <button onClick={handleOpenCam}>{t("scan.open.cam")}</button>
          )}
          {(state === STATE.SCAN) && (
            <button onClick={handleCloseCam}>{t("scan.close.cam")}</button>
          )}
        </section>
      </main>
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
