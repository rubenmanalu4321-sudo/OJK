require("dotenv").config();

const express = require("express");
const cors = require("cors");
const siswaRoutes = require("./routes/siswaRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Data Siswa berjalan" });
});

app.use("/api/siswa", siswaRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Terjadi kesalahan server" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});