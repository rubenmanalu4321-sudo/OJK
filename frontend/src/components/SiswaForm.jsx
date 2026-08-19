import { useEffect, useState } from "react";
import api from "../api";

const initialForm = {
  kode_siswa: "",
  nama_siswa: "",
  alamat_siswa: "",
  tgl_siswa: "",
  jurusan_siswa: ""
};

function SiswaForm({ onSaved, selectedSiswa, onCancelEdit }) {
  const [form, setForm] = useState(initialForm);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedSiswa) {
      setForm({
        kode_siswa: selectedSiswa.kode_siswa || "",
        nama_siswa: selectedSiswa.nama_siswa || "",
        alamat_siswa: selectedSiswa.alamat_siswa || "",
        tgl_siswa: selectedSiswa.tgl_siswa
          ? String(selectedSiswa.tgl_siswa).slice(0, 10)
          : "",
        jurusan_siswa: selectedSiswa.jurusan_siswa || ""
      });
      setShow(true);
    }
  }, [selectedSiswa]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (selectedSiswa) {
        await api.put(`/siswa/${selectedSiswa.id}`, form);
        setMessage("Data siswa berhasil diubah.");
      } else {
        await api.post("/siswa", form);
        setMessage("Data siswa berhasil ditambahkan.");
      }

      setForm(initialForm);
      setShow(false);
      onSaved();
      onCancelEdit?.();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan data.");
    }
  }

  function cancel() {
    setForm(initialForm);
    setShow(false);
    onCancelEdit?.();
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">
            {selectedSiswa ? "Edit Siswa" : "Data Siswa"}
          </h2>

          {!show && (
            <button
              className="btn btn-primary"
              onClick={() => setShow(true)}
            >
              + Tambah Siswa
            </button>
          )}
        </div>

        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {show && (
          <form onSubmit={handleSubmit} className="row g-3 mt-1">
            <div className="col-md-6">
              <label className="form-label">Kode Siswa</label>
              <input
                className="form-control"
                name="kode_siswa"
                value={form.kode_siswa}
                onChange={handleChange}
                placeholder="Contoh: S001"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Nama Siswa</label>
              <input
                className="form-control"
                name="nama_siswa"
                value={form.nama_siswa}
                onChange={handleChange}
                placeholder="Masukkan nama siswa"
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">Alamat Siswa</label>
              <textarea
                className="form-control"
                name="alamat_siswa"
                value={form.alamat_siswa}
                onChange={handleChange}
                placeholder="Masukkan alamat siswa"
                rows="2"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Tanggal Siswa</label>
              <input
                type="date"
                className="form-control"
                name="tgl_siswa"
                value={form.tgl_siswa}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Jurusan Siswa</label>
              <select
                className="form-select"
                name="jurusan_siswa"
                value={form.jurusan_siswa}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Jurusan</option>
                <option value="RPL">RPL</option>
                <option value="TKJ">TKJ</option>
                <option value="MM">MM</option>
              </select>
            </div>

            <div className="col-12 d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={cancel}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SiswaForm;