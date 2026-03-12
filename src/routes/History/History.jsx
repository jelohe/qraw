import { useState } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function History() {
  const { t } = useI18n();
  const { history, remove } = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete(entry) {
    setIsDeleting(entry);
  }
  function handleBack() {
    setIsDeleting(false);
  }
  function handleConfirm(entry) {
    remove(entry)
    setIsDeleting(false);
  }

  return (
    <>
      <Header />
      <main>
        <h2>{t('history.subtitle')}</h2>
        <ul>
          {history.map(entry =>
            <li key={entry}>
              <a target="_blank" href={entry}>{entry}</a>
              <section>
                {isDeleting !== entry && (<>
                  <button onClick={() => alert("this will show the qr")}>qr</button>
                  <button onClick={() => handleDelete(entry)}>{t('history.delete')}</button>
                </>)}
                {isDeleting === entry && (<>
                  <button onClick={handleBack}>{t('history.back')}</button>
                  <button className="markedButton" onClick={() => handleConfirm(entry)}>{t('history.confirm')}</button>
                </>)}
              </section>
            </li>
          )}
        </ul>
      </main>
      <Footer />
    </>
  );
}
