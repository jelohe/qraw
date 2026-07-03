import { useState } from 'react';
import useI18n from '@/useI18n';
import useHistory from '@/useHistory';

export default function History() {
  const { t } = useI18n();
  const { history, setHistory } = useHistory();
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState(new Set());

  function handleDeleteStart() {
    setSelectMode(true);
    setSelected(new Set());
  }

  function handleToggle(entry) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(entry)) {
        next.delete(entry);
      } else {
        next.add(entry);
      }
      return next;
    });
  }

  function handleConfirm() {
    setHistory(history.filter(e => !selected.has(e)));
    setSelectMode(false);
  }

  function handleBack() {
    setSelectMode(false);
  }

  return (
    <main>
      <header className="history-header">
        <div className="history-count">
          [{history.length} {t("history.entries")}]
        </div>
        <section>
          {!selectMode && (
            <button onClick={handleDeleteStart} disabled={history.length === 0}>
              [{t("history.del")}]
            </button>
          )}
          {selectMode && (
            <>
              <button onClick={handleBack}>[{t("history.no")}]</button>
              <button className="markedButton" onClick={handleConfirm}>[{t("history.del")}]</button>
            </>
          )}
        </section>
      </header>
      <ul>
        {history.map(entry =>
          <li key={entry} onClick={() => selectMode && handleToggle(entry)}>
            <a target="_blank" href={entry} onClick={e => selectMode && e.preventDefault()}>{entry}</a>
            {selectMode && (
              <section>
                <input
                  type="checkbox"
                  className="history-checkbox"
                  checked={selected.has(entry)}
                  onChange={() => handleToggle(entry)}
                  onClick={e => e.stopPropagation()}
                />
              </section>
            )}
          </li>
        )}
      </ul>
      {history.length === 0 && !selectMode && (
        <p className="no-data">[{t("history.empty")}]</p>
      )}
    </main>
  );
}
