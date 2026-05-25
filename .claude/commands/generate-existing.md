# Generate Cypress dari Test yang Ada

## Overview
Membuat test case baru berdasarkan pola test yang sudah ada di project. Gunakan command ini ketika skenario baru mirip dengan yang sudah ada — tinggal menyesuaikan data dan judul.

## Kapan Digunakan
- Test case baru menggunakan halaman yang sama dengan test yang sudah ada
- POM dan step definitions sudah tersedia, hanya data/skenario yang berbeda
- Menambah `Scenario` atau `Scenario Outline` ke `.feature` file yang sudah ada

## To Do List

- [ ] **Analisis test case yang ada** — baca `.feature`, step definitions, dan POM yang relevan
- [ ] **Identifikasi pola yang bisa dipakai ulang**
  - Step mana yang sudah ada dan bisa langsung dipakai
  - Data apa yang perlu diganti
  - Apakah perlu step baru atau POM method baru
- [ ] **Tambah skenario ke `.feature` file yang sudah ada**
  - Gunakan `Scenario` untuk satu skenario
  - Gunakan `Scenario Outline` + `Examples` untuk multi-data
  - Tambahkan tag spesifik jika perlu (misal `@smoke`)
- [ ] **Tambah step definitions jika ada step baru**
  - Cek dulu di `cypress/support/step_definitions/` apakah step sudah terdaftar
  - Jika belum ada, tambahkan ke file `*_steps.js` yang relevan
  - Jangan duplikasi step yang sudah ada
- [ ] **Tambah POM method jika ada aksi/validasi baru**
  - Cek di `cypress/support/page_objects/*_po.js` apakah method sudah ada
  - Jika belum, tambahkan ke file POM yang relevan
- [ ] **Jalankan test** untuk verifikasi skenario baru pass

## Contoh Alur

Test existing: `cypress/e2e/contact_us.feature` — sudah ada skenario submit form  
Test baru: tambah skenario submit dengan data berbeda

1. Buka `contact_us.feature` — lihat struktur `Scenario Outline` yang sudah ada
2. Cek `contactus_steps.js` — step `I type a {string} and a comment {string}` sudah ada
3. Tambah baris baru ke tabel `Examples` di feature file yang sama
4. Tidak perlu buat file baru — cukup update data di `Examples`
