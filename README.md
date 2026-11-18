# Sistem-Pembelian-Tiket-Bioskop
// ============================================================
// PROGRAM PEMBELIAN TIKET BIOSKOP (CLI) - TypeScript
// Paket B (NIM berakhiran 4, 5, 6):
//   - 3 penggunaan if (satu rantai if / else if / else = 1)
//   - 2 penggunaan switch (masing-masing 3 case + default + break)
//   - 3 level nested (jalur: if -> switch -> if)
// ============================================================

// Mengimpor modul readline versi promise untuk membaca input dari terminal
import * as readline from "readline/promises";
// Mengimpor stdin (keyboard) dan stdout (layar) dari modul process
import { stdin as input, stdout as output } from "process";

// Fungsi utama program, dibuat async karena menunggu input pengguna
async function main(): Promise<void> {
  // Membuat antarmuka pembacaan input dari terminal
  const rl = readline.createInterface({ input, output });

  // ---------- DATA TETAP (const) ----------
  // Persentase pajak hiburan yang bersifat tetap
  const PAJAK_PERSEN: number = 10;
  // Biaya layanan per tiket yang bersifat tetap
  const BIAYA_LAYANAN: number = 2500;
  // Batas maksimal tiket yang boleh dibeli dalam satu transaksi
  const MAKS_TIKET: number = 10;

  // Menampilkan judul program
  console.log("=======================================");
  console.log("      PEMBELIAN TIKET BIOSKOP");
  console.log("=======================================");

  // ---------- PROSES INPUT ----------
  // Membaca nama pembeli (tipe string) dan membuang spasi di awal/akhir
  const namaPembeli: string = (await rl.question("Nama pembeli            : ")).trim();

  // Menampilkan daftar pilihan studio beserta harganya
  console.log("\nPilihan Studio:");
  console.log("  1. Reguler 2D  - Rp 40.000");
  console.log("  2. 3D          - Rp 50.000");
  console.log("  3. IMAX        - Rp 70.000");
  console.log("  4. Premier     - Rp 90.000");
  // Membaca pilihan studio lalu mengubahnya menjadi number
  const pilihanStudio: number = Number(await rl.question("Pilih studio (1-4)      : "));

  // Membaca jumlah tiket lalu mengubahnya menjadi number
  const jumlahTiket: number = Number(await rl.question("Jumlah tiket (1-10)     : "));

  // Menampilkan daftar pilihan hari tayang
  console.log("\nPilihan Hari:");
  console.log("  1. Senin - Kamis (diskon 10%)");
  console.log("  2. Jumat         (+ Rp 5.000/tiket)");
  console.log("  3. Sabtu         (+ Rp 10.000/tiket)");
  console.log("  4. Minggu        (+ Rp 15.000/tiket)");
  // Membaca pilihan hari lalu mengubahnya menjadi number
  const pilihanHari: number = Number(await rl.question("Pilih hari (1-4)        : "));

  // Membaca status member; hasil perbandingan === disimpan sebagai boolean
  const adaMember: boolean =
    (await rl.question("Punya kartu member? (y/n): ")).trim().toLowerCase() === "y";

  // Membaca jumlah uang yang dibayarkan pembeli (tipe number)
  const uangBayar: number = Number(await rl.question("Uang pembayaran (Rp)    : "));

  // Menutup pembacaan input karena semua data sudah terkumpul
  rl.close();

  // ---------- VARIABEL YANG NILAINYA BERUBAH (let) ----------
  // Nama studio yang dipilih, diisi pada switch pertama
  let namaStudio: string = "";
  // Harga dasar per tiket, diisi pada switch pertama
  let hargaDasar: number = 0;
  // Nama hari tayang yang dipilih, diisi pada switch kedua
  let namaHari: string = "";
  // Biaya tambahan per tiket sesuai hari, diisi pada switch kedua
  let biayaHari: number = 0;
  // Persentase diskon, diisi pada switch kedua
  let diskonPersen: number = 0;
  // Penanda apakah pilihan studio dan hari valid
  let pilihanValid: boolean = true;
  // Keterangan promo khusus studio Premier
  let infoPromo: string = "Tidak ada";

  console.log("\n---------------------------------------");

  // ======================================================
  // IF #1 (LEVEL 1): validasi input dengan banyak kondisi
  // Menggunakan operator logika && (lebih dari 1 kondisi)
  // ======================================================
  if (
    namaPembeli !== "" && // nama tidak boleh kosong
    Number.isInteger(jumlahTiket) && // jumlah tiket harus bilangan bulat
    jumlahTiket >= 1 && // minimal beli 1 tiket
    jumlahTiket <= MAKS_TIKET && // maksimal sesuai batas
    Number.isInteger(pilihanHari) // pilihan hari harus bilangan bulat
  ) {
    // ====================================================
    // SWITCH #1 (LEVEL 2): menentukan harga dasar studio
    // ====================================================
    switch (pilihanStudio) {
      case 1: // studio Reguler 2D
        namaStudio = "Reguler 2D"; // simpan nama studio
        hargaDasar = 40000; // simpan harga dasar
        break; // keluar dari switch
      case 2: // studio 3D
        namaStudio = "3D"; // simpan nama studio
        hargaDasar = 50000; // simpan harga dasar
        break; // keluar dari switch
      case 3: // studio IMAX
        namaStudio = "IMAX"; // simpan nama studio
        hargaDasar = 70000; // simpan harga dasar
        break; // keluar dari switch
      case 4: // studio Premier
        namaStudio = "Premier"; // simpan nama studio
        hargaDasar = 90000; // simpan harga dasar

        // ================================================
        // IF #2 (LEVEL 3): promo Premier di dalam case
        // Menggunakan operator logika || (lebih dari 1 kondisi)
        // ================================================
        if (jumlahTiket >= 4 || adaMember) {
          // beli minimal 4 tiket ATAU member mendapat potongan harga
          hargaDasar -= 10000; // operator compound: potong Rp 10.000 per tiket
          infoPromo = "Potongan Premier Rp 10.000/tiket"; // catat promo
        }
        break; // keluar dari switch
      default: // pilihan studio di luar 1-4
        pilihanValid = false; // tandai pilihan tidak valid
        break; // keluar dari switch
    }

    // ====================================================
    // SWITCH #2 (LEVEL 2): menentukan biaya dan diskon hari
    // ====================================================
    switch (pilihanHari) {
      case 1: // Senin - Kamis
        namaHari = "Senin - Kamis"; // simpan nama hari
        biayaHari = 0; // tidak ada biaya tambahan
        diskonPersen = 10; // diskon 10% hari biasa
        break; // keluar dari switch
      case 2: // Jumat
        namaHari = "Jumat"; // simpan nama hari
        biayaHari = 5000; // tambahan Rp 5.000 per tiket
        break; // keluar dari switch
      case 3: // Sabtu
        namaHari = "Sabtu"; // simpan nama hari
        biayaHari = 10000; // tambahan Rp 10.000 per tiket
        break; // keluar dari switch
      case 4: // Minggu
        namaHari = "Minggu"; // simpan nama hari
        biayaHari = 15000; // tambahan Rp 15.000 per tiket
        break; // keluar dari switch
      default: // pilihan hari di luar 1-4
        pilihanValid = false; // tandai pilihan tidak valid
        break; // keluar dari switch
    }

    // ---------- PERHITUNGAN HARGA (operator aritmetika) ----------
    // Subtotal = (harga dasar + biaya hari) dikali jumlah tiket
    const subtotal: number = (hargaDasar + biayaHari) * jumlahTiket;
    // Nilai potongan diskon = subtotal * persen diskon / 100
    const potongan: number = (subtotal * diskonPersen) / 100;
    // Total awal dimulai dari subtotal
    let total: number = subtotal;
    // Kurangi total dengan potongan diskon (compound -=)
    total -= potongan;
    // Tambahkan pajak hiburan ke total (compound *=)
    total *= 1 + PAJAK_PERSEN / 100;
    // Tambahkan biaya layanan seluruh tiket (compound +=)
    total += BIAYA_LAYANAN * jumlahTiket;
    // Hitung sisa pembulatan ke ratusan memakai operator modulus %
    const sisaPembulatan: number = total % 100;
    // Bulatkan total ke bawah ke kelipatan Rp 100 (compound -=)
    total -= sisaPembulatan;
    // Hitung uang kembalian pembeli
    const kembalian: number = uangBayar - total;

    // ====================================================
    // IF #3 (LEVEL 2): menentukan hasil transaksi
    // Satu rantai if / else if / else dihitung 1 penggunaan
    // Menggunakan operator logika ! (NOT)
    // ====================================================
    if (!pilihanValid) {
      // jika studio atau hari tidak valid, transaksi dibatalkan
      console.log("TRANSAKSI GAGAL: pilihan studio atau hari tidak valid.");
    } else if (uangBayar < total) {
      // jika uang kurang dari total, transaksi ditolak
      console.log("TRANSAKSI GAGAL: uang pembayaran kurang.");
      console.log(`Total tagihan : Rp ${total.toLocaleString("id-ID")}`);
      console.log(`Kekurangan    : Rp ${(-kembalian).toLocaleString("id-ID")}`);
    } else {
      // selain itu, transaksi berhasil dan struk dicetak
      console.log("TRANSAKSI BERHASIL - STRUK PEMBELIAN");
      console.log(`Nama pembeli  : ${namaPembeli}`);
      console.log(`Studio        : ${namaStudio}`);
      console.log(`Hari tayang   : ${namaHari}`);
      console.log(`Jumlah tiket  : ${jumlahTiket}`);
      console.log(`Member        : ${adaMember}`);
      console.log(`Promo         : ${infoPromo}`);
      console.log(`Subtotal      : Rp ${subtotal.toLocaleString("id-ID")}`);
      console.log(`Diskon hari   : Rp ${potongan.toLocaleString("id-ID")}`);
      console.log(`Total bayar   : Rp ${total.toLocaleString("id-ID")}`);
      console.log(`Uang bayar    : Rp ${uangBayar.toLocaleString("id-ID")}`);
      console.log(`Kembalian     : Rp ${kembalian.toLocaleString("id-ID")}`);
    }
  } else {
    // bagian else dari IF #1: data input awal tidak memenuhi syarat
    console.log("INPUT TIDAK VALID: nama harus diisi dan jumlah tiket 1-10 (bilangan bulat).");
  }

  // Menampilkan penutup program
  console.log("---------------------------------------");
  console.log("Terima kasih telah memesan tiket!");
}

// Menjalankan fungsi utama program
main();
