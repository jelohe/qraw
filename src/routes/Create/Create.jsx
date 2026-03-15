import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import QRCode from 'react-qr-code';

export default function Create() {
  const inputRef = useRef(null);
  const [data, setData] = useState(null);
  const { add } = useHistory();
  const { t } = useI18n();

  function handleCreate() {
    const createdData = inputRef.current.value;
    setData(createdData);
    add(createdData);
  }

  function handleDiscard() {
    setData(null);
  }

  return (
    <>
      <Header />
      <main>
        <h2>{t("create.subtitle")}</h2>
        <input ref={inputRef} type="text" placeholder={t("create.placeholder")} />
        {data && (
          <>
            <section>
              <QRCode value={data} />
            </section>
            <br />
          </>
        )}
        <section>
          {!data && (
            <button onClick={handleCreate}>{t("create.create")}</button>
          )}
          {data && (
            <button onClick={handleDiscard}>{t("create.discard")}</button>
          )}
        </section>
        <br />
        <hr />
        <p>{t("create.help")}</p>
      </main>
    </>
  );
}
