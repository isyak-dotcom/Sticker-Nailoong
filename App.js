/* ==========================================================
   LANGKAH WAJIB: tempel link Web App dari Apps Script di sini
   Contoh: "https://script.google.com/macros/s/AKfycb.../exec"
   ========================================================== */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzl58QQgYNs3DE-b0PV6z3yyUtrD63uIofztwy3n6GVCDpTIN5r6RYHo-cXele8_LtN/exec";

/* ---------- Data produk (boleh kamu ubah nama & harganya) ---------- */
const PRODUCTS = [
  { name: "Mega Pack Nailoong (50 pcs)", price: 45000, face: "happy", bg: "#ffd60a,#ff9d00", likes: "50k" },
  { name: "Nailoong Happy", price: 15000, face: "happy", bg: "#ffe873,#ffb300", likes: "48k" },
  { name: "Nailoong Jatuh Cinta", price: 18000, face: "love", bg: "#ffd1e0,#ff9ab8", likes: "47k" },
  { name: "Nailoong Nangis", price: 12000, face: "cry", bg: "#bfe6ff,#7cc4ff", likes: "39k" },
  { name: "Nailoong Ngantuk", price: 12000, face: "sleepy", bg: "#d9ccff,#a58bff", likes: "31k" },
  { name: "Nailoong Marah", price: 12000, face: "angry", bg: "#ffc2a8,#ff7a4d", likes: "28k" },
  { name: "Nailoong Kaget", price: 14000, face: "shock", bg: "#c8f5c0,#7fdc72", likes: "25k" }
];
const CATEGORIES = [
  { name: "Ekspresi", n: 30, f: ["happy", "cry", "angry"] },
  { name: "Kasmaran", n: 45, f: ["love", "happy", "sleepy"] },
  { name: "Sehari-hari", n: 59, f: ["sleepy", "shock", "happy"] },
  { name: "Sedih & Galau", n: 25, f: ["cry", "sleepy", "shock"] },
  { name: "Lucu & Absurd", n: 36, f: ["shock", "angry", "love"] },
  { name: "Ucapan", n: 40, f: ["happy", "love", "cry"] }
];
const BUYERS = [
  ["Aulia Rahma", 24], ["Bima Pratama", 21], ["Citra Lestari", 19], ["Dimas Saputra", 18], ["Eka Putri", 17],
  ["Fajar Nugroho", 15], ["Gita Maharani", 14], ["Hendra Wijaya", 13], ["Intan Permata", 12], ["Joko Santoso", 11]
];
const AV = ["#ffd60a", "#ffb300", "#ffe873", "#ffcf4a", "#ffa726"];

/* ---------- Ilustrasi karakter (SVG buatan sendiri) ---------- */
const FACES = {
  happy: '<circle cx="76" cy="96" r="7"/><circle cx="124" cy="96" r="7"/><path d="M78 120q22 26 44 0z" fill="#7a2b1d"/>',
  love: '<path d="M76 108l-11-11a6 6 0 018-9l3 3 3-3a6 6 0 018 9z" fill="#ff3d6e" stroke="none"/><path d="M124 108l-11-11a6 6 0 018-9l3 3 3-3a6 6 0 018 9z" fill="#ff3d6e" stroke="none"/><path d="M84 122q16 16 32 0" fill="none" stroke="#2a1a00" stroke-width="5" stroke-linecap="round"/>',
  cry: '<path d="M66 96q10-8 20 0M114 96q10-8 20 0" fill="none" stroke="#2a1a00" stroke-width="5" stroke-linecap="round"/><path d="M76 104q-4 16 0 24M124 104q4 16 0 24" fill="none" stroke="#3aa0ff" stroke-width="6" stroke-linecap="round"/><path d="M84 132q16-14 32 0" fill="none" stroke="#2a1a00" stroke-width="5" stroke-linecap="round"/>',
  sleepy: '<path d="M66 98q10 8 20 0M114 98q10 8 20 0" fill="none" stroke="#2a1a00" stroke-width="5" stroke-linecap="round"/><ellipse cx="100" cy="126" rx="8" ry="10" fill="#7a2b1d" stroke="none"/><text x="140" y="60" font-size="22" font-weight="700" fill="#2a1a00" stroke="none">z</text>',
  angry: '<path d="M62 80l26 10M138 80l-26 10" stroke="#2a1a00" stroke-width="6" stroke-linecap="round"/><circle cx="76" cy="100" r="6"/><circle cx="124" cy="100" r="6"/><path d="M82 132q18-16 36 0" fill="none" stroke="#2a1a00" stroke-width="5" stroke-linecap="round"/>',
  shock: '<circle cx="76" cy="94" r="10" fill="#fff"/><circle cx="76" cy="94" r="4"/><circle cx="124" cy="94" r="10" fill="#fff"/><circle cx="124" cy="94" r="4"/><ellipse cx="100" cy="128" rx="9" ry="13" fill="#7a2b1d"/>'
};
function art(face) {
  return '<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M52 62L40 30l32 14zM148 62l12-32-32 14z" fill="#ffc300" stroke="#c98f00" stroke-width="4" stroke-linejoin="round"/>' +
    '<ellipse cx="55" cy="160" rx="16" ry="12" fill="#ffd93b" stroke="#c98f00" stroke-width="4"/><ellipse cx="145" cy="160" rx="16" ry="12" fill="#ffd93b" stroke="#c98f00" stroke-width="4"/>' +
    '<ellipse cx="100" cy="112" rx="72" ry="64" fill="#ffd93b" stroke="#c98f00" stroke-width="5"/>' +
    '<circle cx="50" cy="118" r="9" fill="#ff9a6b" opacity=".7"/><circle cx="150" cy="118" r="9" fill="#ff9a6b" opacity=".7"/>' +
    '<g fill="#2a1a00" stroke="#2a1a00" stroke-width="2">' + (FACES[face] || FACES.happy) + '</g></svg>';
}
const rp = n => "Rp " + n.toLocaleString("id-ID");
const $ = id => document.getElementById(id);

/* ---------- Render konten ---------- */
$("faces").innerHTML = ["happy", "love", "cry", "shock", "sleepy"].map(f => "<i>" + art(f) + "</i>").join("");
$("heroArt").innerHTML = art("happy");
$("heroPrice").textContent = rp(PRODUCTS[0].price);

const mqItems = ["Tahan Air", "Bahan Vinyl", "Warna Awet", "Kirim ke Seluruh Indonesia", "Cocok untuk HP & Laptop", "Anti Luntur"];
$("mq").innerHTML = mqItems.concat(mqItems).concat(mqItems).concat(mqItems).map(t => "<span>" + t + "</span>").join("");

$("pop").innerHTML = PRODUCTS.slice(0, 5).map((p, i) =>
  '<div class="pc' + (i === 2 ? " big" : "") + '" tabindex="0" role="button" data-pick="' + PRODUCTS.indexOf(p) + '" aria-label="Pesan ' + p.name + '">' +
  '<div class="art" style="background:linear-gradient(160deg,' + p.bg + ')">' + art(p.face) + "</div>" +
  '<div class="in"><div><h3>' + p.name + "</h3><small>♥ " + p.likes + '</small></div><span class="pr">' + rp(p.price) + "</span></div></div>"
).join("");

$("buy").innerHTML = BUYERS.map((b, i) =>
  '<div class="bc rv" style="--d:' + (i % 5) * 0.08 + 's"><div class="av" style="background:' + AV[i % AV.length] + '">' + b[0][0] + "</div><div><b>" + b[0] + "</b><span>" + b[1] + " stiker dibeli</span></div></div>"
).join("");

$("cats").innerHTML = CATEGORIES.map((c, i) =>
  '<a href="#populer" class="cat rv" style="--d:' + (i % 3) * 0.12 + 's"><div class="mini">' +
  c.f.map((f, k) => '<i style="background:linear-gradient(160deg,' + PRODUCTS[(i + k) % PRODUCTS.length].bg + ')">' + art(f) + "</i>").join("") +
  '</div><div class="cl">' + c.name + "<span>" + c.n + " item</span></div></a>"
).join("");

$("produk").innerHTML = PRODUCTS.map((p, i) => '<option value="' + i + '">' + p.name + " – " + rp(p.price) + "</option>").join("");

/* ---------- Hitung total ---------- */
function updateTotal() {
  const q = Math.max(1, Math.min(99, parseInt($("jumlah").value, 10) || 1));
  $("total").textContent = rp(PRODUCTS[+$("produk").value].price * q);
}
$("produk").addEventListener("change", updateTotal);
$("jumlah").addEventListener("input", updateTotal);
updateTotal();

/* ---------- Klik kartu / tombol untuk memilih produk ---------- */
function pick(i) {
  $("produk").value = i;
  updateTotal();
  $("pesan").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => $("nama").focus({ preventScroll: true }), 700);
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-pick]");
  if (t) { e.preventDefault(); pick(+t.dataset.pick); }
});
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.matches(".pc")) pick(+e.target.dataset.pick);
});

/* ---------- Hitung mundur promo (sampai tengah malam) ---------- */
function tick() {
  const now = new Date(), end = new Date(now);
  end.setHours(24, 0, 0, 0);
  let s = Math.floor((end - now) / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  s = s % 60;
  $("cd").textContent = h + "j " + String(m).padStart(2, "0") + "m " + String(s).padStart(2, "0") + "d";
}
tick();
setInterval(tick, 1000);

/* ---------- Navigasi ---------- */
const nav = $("nav"), links = $("links"), burger = $("burger");
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });
const secs = ["home", "populer", "pelanggan", "kategori", "pesan"];
function onScroll() {
  nav.classList.toggle("sc", window.scrollY > 30);
  let cur = "home";
  secs.forEach(id => { if ($(id).getBoundingClientRect().top <= 140) cur = id; });
  links.querySelectorAll("a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + cur));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Animasi muncul saat scroll ---------- */
document.body.classList.remove("nojs");
const rvs = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  rvs.forEach(el => io.observe(el));
} else {
  rvs.forEach(el => el.classList.add("in"));
}

/* ---------- Kirim pesanan ke Google Sheets ---------- */
const msg = $("msg"), btn = $("send");
function say(t, cls) { msg.textContent = t; msg.className = cls || ""; }

$("form").addEventListener("submit", async e => {
  e.preventDefault();
  const nama = $("nama").value.trim();
  const wa = $("wa").value.replace(/[\s-]/g, "");
  const alamat = $("alamat").value.trim();
  const jumlah = parseInt($("jumlah").value, 10);
  if (nama.length < 2) return say("Isi nama lengkap dulu ya.", "er");
  if (!/^(\+62|62|0)8\d{7,12}$/.test(wa)) return say("Nomor WhatsApp belum benar. Contoh: 081234567890", "er");
  if (!(jumlah >= 1 && jumlah <= 99)) return say("Jumlah paket harus antara 1 sampai 99.", "er");
  if (alamat.length < 10) return say("Alamat terlalu singkat. Tulis alamat lengkap ya.", "er");
  if (!SCRIPT_URL || SCRIPT_URL.indexOf("script.google.com") === -1) {
    return say("Link Web App belum diisi. Buka App.js lalu isi SCRIPT_URL.", "er");
  }
  const p = PRODUCTS[+$("produk").value];
  const data = { nama, wa, produk: p.name, harga: p.price, jumlah, total: p.price * jumlah, alamat, catatan: $("catatan").value.trim() };
  btn.disabled = true;
  btn.textContent = "Mengirim...";
  say("Mengirim pesananmu...");
  try {
    const res = await fetch(SCRIPT_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) });
    const out = await res.json();
    if (out.status !== "success") throw new Error(out.message || "Gagal menyimpan");
    say("Pesanan terkirim! Kami akan menghubungi lewat WhatsApp.", "ok");
    $("form").reset();
    updateTotal();
  } catch (err) {
    say("Pesanan gagal dikirim. Cek link Web App dan koneksi internet, lalu coba lagi.", "er");
  } finally {
    btn.disabled = false;
    btn.textContent = "Kirim Pesanan";
  }
});
