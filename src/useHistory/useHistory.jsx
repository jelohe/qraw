import { useLocalStorage } from '@uidotdev/usehooks'

export default function useHistory() {
  const [history, setHistory] = useLocalStorage('history', []);

  function add(entry) {
    const next = history.filter(e => e !== entry);
    setHistory([...next, entry])
  }

  function remove(entry) {
    setHistory(history.filter(e => e !== entry));
  }

  return { history, add, remove, setHistory }
}
