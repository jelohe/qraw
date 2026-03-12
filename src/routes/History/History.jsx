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
                <button onClick={() => alert("this will show the qr")}>qr</button>
                {isDeleting !== entry && (
                  <button onClick={() => handleDelete(entry)}>{t('history.delete')}</button>
                )}
                {isDeleting === entry && (
                  <button onClick={() => handleConfirm(entry)}>{t('history.confirm')}</button>
                )}
              </section>
            </li>
          )}
        </ul>
      </main>
      <Footer />
    </>
  );
}
