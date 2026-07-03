import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';

const QR_SIZE = 128;
const PADDING = 16;

export default function Create() {
  const inputRef = useRef(null);
  const qrRef = useRef(null);
  const [data, setData] = useState(null);
  const { add } = useHistory();
  const { t } = useI18n();

  function handleCreate() {
    const createdData = inputRef.current.value.trim();
    if (!createdData) return;
    setData(createdData);
    add(createdData);
  }

  function handleDiscard() {
    setData(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  function handleDownload() {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'qrcode.png';
      a.click();
    };
    img.src = url;
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !data) {
      handleCreate();
    }
  }

  return (
    <main>
      {!data && (
        <div className="terminal-panel">
          <div className="terminal-panel__header">
            <span>[{t("create.input")}]</span>
            <span className="terminal-panel__status">● IDLE</span>
          </div>
          <div className="terminal-panel__body">
            <div className="terminal-input-group">
              <span className="terminal-prompt">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                placeholder={t("create.placeholder")}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button onClick={handleCreate}>[&#x23CE; {t("create.create")}]</button>
          </div>
        </div>
      )}

      {data && (
        <div className="terminal-panel">
          <div className="terminal-panel__header">
            <span>[{t("create.encoded")}]</span>
            <span className="terminal-panel__status terminal-panel__status--ready">● READY</span>
          </div>
          <div className="terminal-panel__body">
            <p className="terminal-data-display">{data}</p>
            <section className="qr-output" ref={qrRef}>
              <svg width={QR_SIZE + PADDING * 2} height={QR_SIZE + PADDING * 2} viewBox={`0 0 ${QR_SIZE + PADDING * 2} ${QR_SIZE + PADDING * 2}`}>
                <rect width="100%" height="100%" fill="white" />
                <svg x={PADDING} y={PADDING} width={QR_SIZE} height={QR_SIZE}>
                  <QRCode value={data} size={QR_SIZE} />
                </svg>
              </svg>
            </section>
            <section>
              <button onClick={handleDiscard} className="markedButton">[&#x2717; {t("create.discard")}]</button>
              <button onClick={handleDownload}>[&#x2B07; {t("create.download")}]</button>
            </section>
          </div>
        </div>
      )}

      <p className="info-plate">{t("create.help")}</p>
    </main>
  );
}
