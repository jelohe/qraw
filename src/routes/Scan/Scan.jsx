import { useState } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import Scanner from '@/components/Scanner';

export default function Scan() {
  const { t } = useI18n();
  const { add } = useHistory();
  const [result, setResult] = useState(null);
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
    <main>
      <h2>{t("scan.subtitle")}</h2>
      <div className="scanner">
        {(state === STATE.ERROR) && <Error />}
        {(state === STATE.FOUND) && <Found display={result} />}
        {(state === STATE.IDLE) &&
          <span onClick={handleOpenCam} className="idle-prompt">
            <span className="tap-icon">[CLICK]</span>
            {t("scan.camera.preview")}
          </span>
        }
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
            <button onClick={handleDiscard}>[{t("scan.discard")}]</button>
            <button onClick={handleOpen} className="markedButton">[{t("scan.open")}]</button>
          </>
        )}
        {(state === STATE.SCAN) && (
          <button onClick={handleCloseCam}>[STOP CAMERA]</button>
        )}
      </section>
      <section className="state-indicator">
        <span className={`state-badge state-${state}`}>[{state}]</span>
      </section>
    </main>
  );
}

function Loading() {
  const { t } = useI18n();
  return (<span className="loading-text">[LOADING...]</span>);
}

function Error() {
  const { t } = useI18n();
  return (
    <div className="error-box">
      <mark>{t("scan.error1")}</mark>
      <mark>{t("scan.error2")}</mark>
    </div>
  );
}

function Found({ display }) {
  const { t } = useI18n();
  return (
    <div className="detected-box">
      <h2>[!] {t("scan.found")}</h2>
      <a href={display} target="_blank">{display}</a>
    </div>
  );
}
