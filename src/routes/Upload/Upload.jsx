import { useState, useRef } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import Header from '@/components/Header';
import camera from '@/components/Scanner/camera';

export default function Upload() {
  const imageEl = useRef(null);
  const { add } = useHistory();
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const { t } = useI18n();

  function handleChange(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    camera.scan(file).then(scanned => {
      if (scanned && scanned.length) {
        const { rawValue } = scanned[0];
        setData(rawValue);
        add(rawValue);
      }
    });

    setImage(url);
  }
  function handleDiscard() {
    setImage(null);
    setData(null);
  }
  function handleOpen() {
    window.open(data, "_blank");
  }

  return (
    <>
      <Header />
      <main>
        <h2>{t("upload.subtitle")}</h2>
        {!image && (
          <>
            <input type="file" onChange={handleChange} accept="image/*" />
            <hr />
            <p>{t("upload.help1")}</p>
            <p>{t("upload.help2")}</p>
          </>
        )}
        {image && (
          <>
            <img ref={imageEl} src={image} />
            <hr />
            {data && <p>{data}</p>}
            {!data && <p>{t("upload.nothing")}</p>}
            <br />
            <section>
              <button onClick={handleDiscard}>{t("upload.discard")}</button>
              {data && <button onClick={handleOpen}>{t("upload.open")}</button>}
            </section>
          </>
        )}
      </main>
    </>
  );
}
