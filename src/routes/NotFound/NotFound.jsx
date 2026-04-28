import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main>
      <h2>[404] PAGE NOT FOUND</h2>
      <br />
      <section>
        <button onClick={() => navigate("/")}>[GO HOME]</button>
      </section>
    </main>
  );
}
