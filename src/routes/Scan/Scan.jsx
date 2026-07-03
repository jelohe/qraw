import { useState, useRef } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import Scanner from '@/components/Scanner';
import camera from '@/components/Scanner/camera';

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
  const { t } = useI18n();
  return <span className="loading-text">[{t("scan.loading")}]</span>;
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
  const imageEl = useRef(null);
  const [mode, setMode] = useState('scan');
  const [scanState, setScanState] = useState(STATE.IDLE);
  const [scanResult, setScanResult] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileScanning, setFileScanning] = useState(false);

  function handleScan(uris) {
    if (!uris || uris.length <= 0) return;
    const uri = uris[0].rawValue;
    add(uri);
    setScanResult(uri);
    setScanState(STATE.FOUND);
  }
  const handleScanDiscard = () => {
    setScanResult();
    setScanState(STATE.SCAN);
  }
  const handleScanOpen = () => window.open(scanResult, "_blank");
  const handleScanError = () => setScanState(STATE.ERROR);
  const handleOpenCam = () => setScanState(STATE.SCAN);
  const handleCloseCam = () => setScanState(STATE.IDLE);

  function handleFileChange(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setFileImage(url);
    setFileData(null);
    setFileScanning(true);

    camera.scan(file).then(scanned => {
      setFileScanning(false);
      if (scanned && scanned.length) {
        const { rawValue } = scanned[0];
        setFileData(rawValue);
        add(rawValue);
      }
    }).catch(() => setFileScanning(false));
  }
  const handleFileDiscard = () => {
    setFileImage(null);
    setFileData(null);
    setFileScanning(false);
  }
  const handleFileOpen = () => window.open(fileData, "_blank");

  const currentMeta = mode === 'scan'
    ? STATE_META[scanState]
    : {
        label: fileScanning ? 'SCANNING' : fileData ? 'READY' : fileImage ? 'ERROR' : 'IDLE',
        cls: fileScanning ? 'terminal-panel__status--scanning' : fileData ? 'terminal-panel__status--ready' : fileImage ? 'terminal-panel__status--error' : ''
      };

  return (
    <main>
      <div className="terminal-panel">
        <div className="terminal-panel__header">
          <span>[{t("scan.scanner")}]</span>
          <span className={`terminal-panel__status ${currentMeta.cls}`}>● {currentMeta.label}</span>
        </div>
        <div className="terminal-panel__body">
          {mode === 'scan' && (
            <div className="scanner">
              {scanState === STATE.ERROR && <ErrorMsg />}
              {scanState === STATE.FOUND && <Found display={scanResult} />}
              {scanState === STATE.IDLE &&
                <span onClick={handleOpenCam} className="idle-prompt">
                  <span className="tap-icon">[{t("scan.click")}]</span>
                  {t("scan.camera.preview")}
                </span>
              }
              {scanState === STATE.SCAN && (
                <Scanner onError={handleScanError} Loading={Loading} onScan={handleScan} />
              )}
            </div>
          )}

          {mode === 'file' && (
            <>
              {!fileImage && (
                <div className="upload-zone">
                  <input type="file" onChange={handleFileChange} accept="image/*" id="file-input" />
                  <label htmlFor="file-input" className="upload-label">
                    <span className="upload-icon">[{t("upload.drop")}]</span>
                    <span>{t("upload.help1")}</span>
                  </label>
                </div>
              )}
              {fileImage && (
                <>
                  <img ref={imageEl} src={fileImage} />
                  {fileScanning && <p className="loading-text">[{t("scan.scanning")}]</p>}
                  {!fileScanning && fileData && (
                    <div className="detected-box">
                      <h2>[!] {t("scan.found")}</h2>
                      <a href={fileData} target="_blank">{fileData}</a>
                    </div>
                  )}
                  {!fileScanning && !fileData && <p className="no-data">[!] {t("upload.nothing")}</p>}
                </>
              )}
            </>
          )}

          {mode === 'scan' && scanState === STATE.IDLE && (
            <section>
              <button onClick={() => setMode('file')}>[&#x2261; {t("scan.manual")}]</button>
            </section>
          )}
          {mode === 'scan' && scanState === STATE.SCAN && (
            <section>
              <button onClick={handleCloseCam}>[&#x25A0; {t("scan.stop")}]</button>
              <button onClick={() => setMode('file')}>[&#x2261; {t("scan.manual")}]</button>
            </section>
          )}
          {mode === 'scan' && scanState === STATE.ERROR && (
            <section>
              <button onClick={handleOpenCam}>[&#x21BB; {t("scan.retry")}]</button>
              <button onClick={() => setMode('file')}>[&#x2261; {t("scan.manual")}]</button>
            </section>
          )}
          {mode === 'scan' && scanState === STATE.FOUND && (
            <section>
              <button onClick={handleScanDiscard} className="markedButton"> [&#x2717; {t("scan.discard")}]</button>
              <button onClick={handleScanOpen}>[&#x2197; {t("scan.open")}]</button>
            </section>
          )}

          {mode === 'file' && !fileImage && (
            <section>
              <button onClick={() => setMode('scan')}>[&#x25C0; {t("scan.back")}]</button>
            </section>
          )}
          {mode === 'file' && fileImage && (
            <section>
              <button onClick={handleFileDiscard} className="markedButton">[&#x2717; {t("upload.discard")}]</button>
              {fileData
                ? <button onClick={handleFileOpen}>[&#x2197; {t("upload.open")}]</button>
                : <button onClick={() => setMode('scan')}>[&#x25C0; {t("scan.back")}]</button>
              }
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
