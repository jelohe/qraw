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

  return (
    <main>
      <h2>{t("create.subtitle")}</h2>
      <div className="create-input-group">
        <label className="input-label">[DATA]</label>
        <input ref={inputRef} type="text" placeholder={t("create.placeholder")} />
      </div>
      {data && (
        <>
          <section className="qr-output">
            <QRCode value={data} />
          </section>
          <br />
        </>
      )}
      <section>
        {!data && (
          <button onClick={handleCreate}>[{t("create.create")}]</button>
        )}
        {data && (
          <button onClick={handleDiscard} className="markedButton">[{t("create.discard")}]</button>
        )}
      </section>
      <br />
      <hr />
      <p>{t("create.help")}</p>
    </main>
  );
}
