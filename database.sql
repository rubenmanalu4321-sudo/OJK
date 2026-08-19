CREATE DATABASE IF NOT EXISTS data_siswa;
USE data_siswa;

CREATE TABLE IF NOT EXISTS siswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kode_siswa VARCHAR(10) NOT NULL UNIQUE,
  nama_siswa VARCHAR(100) NOT NULL,
  alamat_siswa TEXT NOT NULL,
  tgl_siswa DATE NOT NULL,
  jurusan_siswa VARCHAR(50) NOT NULL
);

INSERT INTO siswa
(kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
VALUES
('S001', 'Agung', 'Jl. Merdeka No. 10', '2005-01-15', 'RPL'),
('S002', 'Putra', 'Jl. Pahlawan No. 5', '2006-03-20', 'TKJ'),
('S003', 'Atta Halilintar', 'Jl. Kenanga No. 8', '2005-07-10', 'RPL'),
('S004', 'Dewi Kenangan', 'Jl. Melati No. 12', '2006-09-05', 'MM');

-- Contoh query SQL untuk latihan Unit 9:
SELECT * FROM siswa;
SELECT * FROM siswa WHERE jurusan_siswa = 'RPL';

UPDATE siswa
SET nama_siswa = 'Putra'
WHERE kode_siswa = 'S001';

DELETE FROM siswa WHERE kode_siswa = 'S004';

-- Contoh relasional:
SELECT jurusan_siswa, COUNT(*) AS jumlah_siswa
FROM siswa
GROUP BY jurusan_siswa;

-- Contoh function:
DELIMITER //
CREATE FUNCTION IF NOT EXISTS jumlah_huruf(nama VARCHAR(100))
RETURNS INT
DETERMINISTIC
BEGIN
  RETURN CHAR_LENGTH(nama);
END//
DELIMITER ;

-- Contoh trigger:
DELIMITER //
CREATE TRIGGER IF NOT EXISTS before_insert_siswa
BEFORE INSERT ON siswa
FOR EACH ROW
BEGIN
  SET NEW.nama_siswa = TRIM(NEW.nama_siswa);
END//
DELIMITER ;