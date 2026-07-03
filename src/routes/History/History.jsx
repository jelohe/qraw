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
      <div className="history-count">
        [{history.length} {t("history.entries")}]
      </div>
      <ul>
        {history.map(entry =>
          <li key={entry}>
            <a target="_blank" href={entry}>{entry}</a>
            <section>
              {isDeleting !== entry && (
                <button onClick={() => handleDelete(entry)}>[{t("history.del")}]</button>
              )}
              {isDeleting === entry && (
                <>
                  <button onClick={handleBack}>[{t("history.no")}]</button>
                  <button className="markedButton" onClick={() => handleConfirm(entry)}>[{t("history.yes")}]</button>
                </>
              )}
            </section>
          </li>
        )}
      </ul>
      {history.length === 0 && (
        <p className="no-data">[{t("history.empty")}]</p>
      )}
    </main>
  );
}
