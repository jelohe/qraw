import { useLocalStorage } from '@uidotdev/usehooks'

export default function useHistory() {
  const [history, setHistory] = useLocalStorage('history', []);

  function add(entry) {
    setHistory([...history, entry])
  }
  function remove(entry) {
    setHistory(
      history.filter(e => e !== entry)
    );
  }

  return { history, add, remove, setHistory }
}
