import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';

export default function Create() {
  const inputRef = useRef(null);
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

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !data) {
      handleCreate();
    }
  }

  return (
    <main>
      <h2>{t("create.subtitle")}</h2>

      {!data && (
        <div className="terminal-panel">
          <div className="terminal-panel__header">
            <span>[DATA IN]</span>
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
            <span>[DATA ENCODED]</span>
            <span className="terminal-panel__status terminal-panel__status--ready">● READY</span>
          </div>
          <div className="terminal-panel__body">
            <p className="terminal-data-display">{data}</p>
            <section className="qr-output">
              <QRCode value={data} />
            </section>
            <button onClick={handleDiscard} className="markedButton">[&#x2717; {t("create.discard")}]</button>
          </div>
        </div>
      )}

      <hr />
      <p className="info-plate">{t("create.help")}</p>
    </main>
  );
}
