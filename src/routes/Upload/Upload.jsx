import { useState, useRef } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import camera from '@/components/Scanner/camera';

export default function Upload() {
  const imageEl = useRef(null);
  const { add } = useHistory();
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [scanning, setScanning] = useState(false);
  const { t } = useI18n();

  function handleChange(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(url);
    setData(null);
    setScanning(true);

    camera.scan(file).then(scanned => {
      setScanning(false);
      if (scanned && scanned.length) {
        const { rawValue } = scanned[0];
        setData(rawValue);
        add(rawValue);
      }
    });
  }

  function handleDiscard() {
    setImage(null);
    setData(null);
    setScanning(false);
  }

  function handleOpen() {
    window.open(data, "_blank");
  }

  const hasResult = image !== null;
  const statusLabel = scanning ? 'SCANNING' : data ? 'READY' : hasResult ? 'ERROR' : 'IDLE';
  const statusCls = scanning ? 'terminal-panel__status--scanning' : data ? 'terminal-panel__status--ready' : 'terminal-panel__status--error';

  return (
    <main>
      <h2>{t("upload.subtitle")}</h2>

      {!hasResult && (
        <div className="terminal-panel">
          <div className="terminal-panel__header">
            <span>[UPLOAD]</span>
            <span className="terminal-panel__status">● IDLE</span>
          </div>
          <div className="terminal-panel__body">
            <div className="upload-zone">
              <input type="file" onChange={handleChange} accept="image/*" id="file-input" />
              <label htmlFor="file-input" className="upload-label">
                <span className="upload-icon">[DROP]</span>
                <span>{t("upload.help1")}</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {hasResult && (
        <div className="terminal-panel">
          <div className="terminal-panel__header">
            <span>[SCAN RESULT]</span>
            <span className={`terminal-panel__status ${statusCls}`}>● {statusLabel}</span>
          </div>
          <div className="terminal-panel__body">
            <img ref={imageEl} src={image} />
            <hr />
            {scanning && <p className="loading-text">[SCANNING...]</p>}
            {!scanning && data && (
              <div className="detected-box">
                <h2>[!] {t("scan.found")}</h2>
                <a href={data} target="_blank">{data}</a>
              </div>
            )}
            {!scanning && !data && <p className="no-data">[!] {t("upload.nothing")}</p>}
            <section>
              <button onClick={handleDiscard}>[&#x2717; {t("upload.discard")}]</button>
              {data && <button onClick={handleOpen} className="markedButton">[&#x2197; {t("upload.open")}]</button>}
            </section>
          </div>
        </div>
      )}

      {!hasResult && (
        <>
          <hr />
          <p className="info-plate">{t("upload.help2")}</p>
        </>
      )}
    </main>
  );
}
