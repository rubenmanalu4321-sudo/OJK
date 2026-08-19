const db = require("../config/db");
const Siswa = require("../models/Siswa");

async function getAll() {
  const [rows] = await db.execute(
    "SELECT * FROM siswa ORDER BY id DESC"
  );
  return rows;
}

async function getById(id) {
  const [rows] = await db.execute(
    "SELECT * FROM siswa WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function create(data) {
  const siswa = new Siswa(data);

  const [result] = await db.execute(
    `INSERT INTO siswa
      (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
     VALUES (?, ?, ?, ?, ?)`,
    [
      siswa.kode_siswa,
      siswa.nama_siswa,
      siswa.alamat_siswa,
      siswa.tgl_siswa,
      siswa.jurusan_siswa
    ]
  );

  return getById(result.insertId);
}

async function update(id, data) {
  const siswa = new Siswa(data);

  const [result] = await db.execute(
    `UPDATE siswa
     SET kode_siswa = ?, nama_siswa = ?, alamat_siswa = ?,
         tgl_siswa = ?, jurusan_siswa = ?
     WHERE id = ?`,
    [
      siswa.kode_siswa,
      siswa.nama_siswa,
      siswa.alamat_siswa,
      siswa.tgl_siswa,
      siswa.jurusan_siswa,
      id
    ]
  );

  if (result.affectedRows === 0) return null;
  return getById(id);
}

async function remove(id) {
  const [result] = await db.execute(
    "DELETE FROM siswa WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}

module.exports = { getAll, getById, create, update, remove };