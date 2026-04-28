import { useState } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';

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
    remove(entry);
    setIsDeleting(false);
  }

  return (
    <main>
      <h2>{t('history.subtitle')}</h2>
      <div className="history-count">
        [{history.length} ENTRIES]
      </div>
      <ul>
        {history.map(entry =>
          <li key={entry}>
            <a target="_blank" href={entry}>{entry}</a>
            <section>
              {isDeleting !== entry && (
                <button onClick={() => handleDelete(entry)}>[DEL]</button>
              )}
              {isDeleting === entry && (
                <>
                  <button onClick={handleBack}>[NO]</button>
                  <button className="markedButton" onClick={() => handleConfirm(entry)}>[YES]</button>
                </>
              )}
            </section>
          </li>
        )}
      </ul>
      {history.length === 0 && (
        <p className="no-data">[NO HISTORY YET]</p>
      )}
    </main>
  );
}
