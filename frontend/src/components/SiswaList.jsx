import { useEffect, useState } from "react";
import api from "../api";
import SiswaForm from "./SiswaForm";

function SiswaList({ refresh }) {
  const [siswa, setSiswa] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchSiswa() {
    try {
      setLoading(true);
      const response = await api.get("/siswa");
      setSiswa(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil data siswa.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSiswa();
  }, [refresh]);

  async function handleDelete(id) {
    const yakin = window.confirm("Yakin ingin menghapus data ini?");
    if (!yakin) return;

    try {
      await api.delete(`/siswa/${id}`);
      await fetchSiswa();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus data.");
    }
  }

  return (
    <>
      {selected && (
        <SiswaForm
          selectedSiswa={selected}
          onSaved={() => {
            setSelected(null);
            fetchSiswa();
          }}
          onCancelEdit={() => setSelected(null)}
        />
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5 mb-3">Data Siswa</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          {loading ? (
            <p className="text-muted">Memuat data...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-primary">
                  <tr>
                    <th>No</th>
                    <th>Kode Siswa</th>
                    <th>Nama Siswa</th>
                    <th>Alamat Siswa</th>
                    <th>Tgl Siswa</th>
                    <th>Jurusan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {siswa.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        Belum ada data siswa.
                      </td>
                    </tr>
                  ) : (
                    siswa.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.kode_siswa}</td>
                        <td>{item.nama_siswa}</td>
                        <td>{item.alamat_siswa}</td>
                        <td>{String(item.tgl_siswa).slice(0, 10)}</td>
                        <td>{item.jurusan_siswa}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => setSelected(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SiswaList;