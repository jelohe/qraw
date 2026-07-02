import { useState } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import Scanner from '@/components/Scanner';

const STATE = {
  IDLE: 'idle',
  SCAN: 'scanning',
  ERROR: 'error',
  FOUND: 'found',
};

const STATE_META = {
  [STATE.IDLE]:  { label: 'IDLE',  cls: '' },
  [STATE.SCAN]:  { label: 'SCANNING', cls: 'terminal-panel__status--scanning' },
  [STATE.ERROR]: { label: 'ERROR', cls: 'terminal-panel__status--error' },
  [STATE.FOUND]: { label: 'FOUND', cls: 'terminal-panel__status--ready' },
};

function Loading() {
  return <span className="loading-text">[LOADING...]</span>;
}

function ErrorMsg() {
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

export default function Scan() {
  const { t } = useI18n();
  const { add } = useHistory();
  const [result, setResult] = useState(null);
  const [state, setState] = useState(STATE.IDLE);

  function handleScan(uris) {
    if (!uris || uris.length <= 0) return;
    const uri = uris[0].rawValue;
    add(uri);
    setResult(uri);
    setState(STATE.FOUND);
  }
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
      <div className="terminal-panel">
        <div className="terminal-panel__header">
          <span>[SCANNER]</span>
          <span className={`terminal-panel__status ${STATE_META[state].cls}`}>● {STATE_META[state].label}</span>
        </div>
        <div className="terminal-panel__body">
          <div className="scanner">
            {(state === STATE.ERROR) && <ErrorMsg />}
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
                Error={ErrorMsg}
                onScan={handleScan}
              />
            )}
          </div>

          {(state === STATE.ERROR) && <button onClick={handleOpenCam}>[&#x21BB; {t("scan.retry")}]</button>}
          {(state === STATE.FOUND) && (
            <section>
              <button onClick={handleDiscard}>[&#x2717; {t("scan.discard")}]</button>
              <button onClick={handleOpen} className="markedButton">[&#x2197; {t("scan.open")}]</button>
            </section>
          )}
          {(state === STATE.SCAN) && (
            <button onClick={handleCloseCam}>[&#x25A0; STOP CAMERA]</button>
          )}
        </div>
      </div>
    </main>
  );
}
