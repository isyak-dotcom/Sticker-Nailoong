/**
 * Nailoong Sticker Store - Backend Google Apps Script
 * Tempel kode ini di: Spreadsheet > Extensions (Ekstensi) > Apps Script
 * Lalu Deploy sebagai Web App (Execute as: Me, Who has access: Anyone)
 */
const SHEET_NAME = "Pesanan";
const HEADERS = ["Waktu", "Nama", "WhatsApp", "Produk", "Harga Satuan", "Jumlah", "Total", "Alamat", "Catatan", "Status"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const d = JSON.parse(e.postData.contents);

    const nama = clean_(d.nama, 80);
    const wa = clean_(d.wa, 20);
    const produk = clean_(d.produk, 100);
    const alamat = clean_(d.alamat, 300);
    const catatan = clean_(d.catatan, 200);
    const harga = Number(d.harga);
    const jumlah = Number(d.jumlah);

    if (nama.length < 2 || !/^(\+62|62|0)8\d{7,12}$/.test(wa) || !produk || alamat.length < 10) {
      return json_({ status: "error", message: "Data tidak lengkap" });
    }
    if (!(jumlah >= 1 && jumlah <= 99) || !(harga > 0)) {
      return json_({ status: "error", message: "Jumlah atau harga tidak valid" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#ffd60a");
      sheet.setFrozenRows(1);
    }

    const waktu = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "dd/MM/yyyy HH:mm:ss");
    // kolom WhatsApp disimpan sebagai teks agar angka 0 di depan tidak hilang
    const row = sheet.getLastRow() + 1;
    sheet.getRange(row, 3).setNumberFormat("@");
    sheet.getRange(row, 1, 1, HEADERS.length).setValues([[waktu, nama, wa, produk, harga, jumlah, harga * jumlah, alamat, catatan, "Baru"]]);

    return json_({ status: "success" });
  } catch (err) {
    return json_({ status: "error", message: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

// Untuk mengecek apakah Web App sudah aktif (buka link /exec di browser)
function doGet() {
  return json_({ status: "ok", message: "Web App Nailoong Sticker aktif" });
}

// Mencegah rumus berbahaya di spreadsheet (teks yang diawali = + - @)
function clean_(v, max) {
  let s = String(v == null ? "" : v).trim().substring(0, max);
  if (/^[=+\-@]/.test(s) && !/^\+62/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
