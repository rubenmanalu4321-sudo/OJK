import { useState } from "react";
import SiswaList from "./components/SiswaList";
import SiswaForm from "./components/SiswaForm";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <>
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">DATA SISWA</span>
          <div className="text-white">Dashboard &nbsp; Siswa</div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">Sistem Data Siswa</h1>
          <p className="text-muted mb-0">
            Aplikasi CRUD menggunakan React.js, Express.js, dan MySQL.
          </p>
        </div>

        <SiswaForm onSaved={() => setRefresh((value) => value + 1)} />
        <SiswaList refresh={refresh} />
      </main>

      <footer className="border-top py-3 mt-4">
        <div className="container text-muted small">
          Sistem Data Siswa
        </div>
      </footer>
    </>
  );
}

export default App;