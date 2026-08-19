const service = require("../services/siswaService");
const { success, error } = require("../utils/response");

function validate(data) {
  const required = [
    "kode_siswa",
    "nama_siswa",
    "alamat_siswa",
    "tgl_siswa",
    "jurusan_siswa"
  ];

  return required.filter(
    (field) => !data[field] || String(data[field]).trim() === ""
  );
}

async function getAll(req, res) {
  try {
    const data = await service.getAll();
    return success(res, 200, data);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function getById(req, res) {
  try {
    const data = await service.getById(req.params.id);

    if (!data) return error(res, 404, "Data siswa tidak ditemukan");
    return success(res, 200, data);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function create(req, res) {
  try {
    const missing = validate(req.body);

    if (missing.length) {
      return error(res, 400, `Field wajib diisi: ${missing.join(", ")}`);
    }

    const data = await service.create(req.body);
    return success(res, 201, {
      message: "Data berhasil ditambahkan",
      data
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return error(res, 409, "Kode siswa sudah digunakan");
    }
    return error(res, 500, err.message);
  }
}

async function update(req, res) {
  try {
    const missing = validate(req.body);

    if (missing.length) {
      return error(res, 400, `Field wajib diisi: ${missing.join(", ")}`);
    }

    const data = await service.update(req.params.id, req.body);

    if (!data) return error(res, 404, "Data siswa tidak ditemukan");

    return success(res, 200, {
      message: "Data berhasil diubah",
      data
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return error(res, 409, "Kode siswa sudah digunakan");
    }
    return error(res, 500, err.message);
  }
}

async function remove(req, res) {
  try {
    const deleted = await service.remove(req.params.id);

    if (!deleted) return error(res, 404, "Data siswa tidak ditemukan");

    return success(res, 200, {
      message: "Data berhasil dihapus"
    });
  } catch (err) {
    return error(res, 500, err.message);
  }
}

module.exports = { getAll, getById, create, update, remove };