# API-Test-using-K6
Project API testing usng K6 tool, included API integration test and performances test between 2 API

# Skenario Uji Integrasi:

## Skenario 1: Buat Pengguna dan Perbarui Informasi Pengguna

### Mempersiapkan:
- Pastikan URL dasar disetel ke "https://regres.in".
- Lakukan permintaan POST ke "/api/users" untuk membuat pengguna dengan isi permintaan berikut:

```json
{
  "nama": "morfeus",
  "pekerjaan": "pemimpin"
}

```

  * Ekstrak ID pengguna dari respons.
  
### Verifikasi:

- Periksa apakah kode status respons adalah 201 (Dibuat).
- Verifikasi bahwa pengguna telah berhasil dibuat dengan memeriksa isi respons untuk nama dan pekerjaan yang benar.

### Perbarui Informasi Pengguna:

- Lakukan permintaan PUT ke "https://regres.in/api/users/{userID}" (ganti {userID} dengan ID pengguna yang diekstraksi) untuk memperbarui informasi pengguna dengan isi permintaan berikut:

```json
{
  "nama": "morfeus",
  "pekerjaan": "penduduk zion"
}
```

### Verifikasi setelah Pembaruan:

- Periksa apakah kode status respons adalah 200 (OK).
- Verifikasikan bahwa informasi pengguna telah berhasil diperbarui dengan memeriksa isi respons untuk pekerjaan yang diperbarui.


#

# Skenario Uji Kinerja:

## Skenario 2: Pengujian Kinerja untuk Operasi Pembuatan dan Pembaruan

### 1. Buat Tes Kinerja Pengguna:
- Kirim serangkaian permintaan POST secara bersamaan ke "https://regres.in/api/users" dengan isi permintaan yang sama seperti yang disebutkan sebelumnya.
- Ukur waktu respons dan pastikan bahwa waktu respons rata-rata berada dalam batas yang dapat diterima untuk sejumlah permintaan bersamaan tertentu (misalnya, 100 permintaan).

### 2. Perbarui Tes Kinerja Pengguna:
- Kirim serangkaian permintaan PUT secara bersamaan ke "https://regres.in/api/users/{userID}" (ganti {userID} dengan ID pengguna yang valid) dengan isi permintaan yang sama seperti yang disebutkan sebelumnya.
- Ukur waktu respons dan pastikan bahwa waktu respons rata-rata berada dalam batas yang dapat diterima untuk sejumlah permintaan bersamaan tertentu (misalnya, 100 permintaan).

### 3. Uji Kinerja Gabungan:
- Lakukan serangkaian permintaan POST dan PUT bergantian dengan campuran pengguna secara bersamaan untuk mensimulasikan skenario dunia nyata.
- Ukur waktu respons keseluruhan untuk operasi pembuatan dan pembaruan pada berbagai tingkat beban.
- Evaluasi kinerja sistem.
