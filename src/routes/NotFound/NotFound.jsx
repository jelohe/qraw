import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <h1>Error 404</h1>
      </header>
      <main>
        <h2>Page not found.</h2>
      </main>
      <footer>
        <button onClick={() => navigate("/")}>Go home</button>
      </footer>
    </>
  );
}
