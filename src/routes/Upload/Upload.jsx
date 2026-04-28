import { useState, useRef } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
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
    <main>
      <h2>{t("upload.subtitle")}</h2>
      {!image && (
        <>
          <div className="upload-zone">
            <input type="file" onChange={handleChange} accept="image/*" id="file-input" />
            <label htmlFor="file-input" className="upload-label">
              <span className="upload-icon">[DROP]</span>
              <span>{t("upload.help1")}</span>
            </label>
          </div>
        </>
      )}
      {image && (
        <>
          <img ref={imageEl} src={image} />
          <hr />
          {data && (
            <div className="detected-box">
              <h2>[!] {t("scan.found")}</h2>
              <a href={data} target="_blank">{data}</a>
            </div>
          )}
          {!data && <p className="no-data">[!] {t("upload.nothing")}</p>}
          <br />
          <section>
            <button onClick={handleDiscard}>[{t("upload.discard")}]</button>
            {data && <button onClick={handleOpen} className="markedButton">[{t("upload.open")}]</button>}
          </section>
        </>
      )}
    </main>
  );
}
