"use client"

import { useState } from "react"
import KamusCard, { type KosakatItem } from "./kamuscard"
import KamusModal from "./kamusmodal"

const KOSAKATA: KosakatItem[] = [
  // Salam
  { id: "halo", emoji: "👋", title: "Halo", category: "Salam", difficulty: "Mudah", mastered: true, liked: false, description: "Sapaan umum untuk memulai percakapan.", steps: ["Angkat tangan kanan setinggi bahu.", "Buka telapak tangan menghadap ke depan.", "Gerakkan tangan ke kanan dan kiri dengan santai."] },
  { id: "terimakasih", emoji: "🙏", title: "Terima Kasih", category: "Salam", difficulty: "Mudah", mastered: true, liked: false, description: "Ungkapan syukur dan rasa hormat.", steps: ["Rapatkan kedua telapak tangan di depan dada.", "Anggukkan kepala sedikit ke depan.", "Tahan posisi 1–2 detik lalu lepaskan."] },
  { id: "maaf", emoji: "😔", title: "Maaf", category: "Salam", difficulty: "Mudah", mastered: false, liked: false, description: "Ungkapan penyesalan dan permohonan maaf.", steps: ["Kepalan tangan kanan di atas dada.", "Gerakkan kepalan memutar searah jarum jam.", "Ulangi gerakan 2–3 kali dengan pelan."] },
  
  // Keluarga
  { id: "ibu", emoji: "👩", title: "Ibu", category: "Keluarga", difficulty: "Mudah", mastered: true, liked: false, description: "Orang tua perempuan yang tersayang.", steps: ["Sentuhkan ibu jari tangan kanan ke pipi kanan.", "Gerakkan ibu jari ke bawah dagu.", "Ekspresikan wajah penuh kasih sayang."] },
  { id: "ayah", emoji: "👨", title: "Ayah", category: "Keluarga", difficulty: "Mudah", mastered: false, liked: false, description: "Orang tua laki-laki pelindung keluarga.", steps: ["Sentuhkan ibu jari tangan kanan ke dahi.", "Gerakkan ibu jari ke bawah dagu.", "Posisi tubuh tegak dan tegas."] },
  { id: "anak", emoji: "👧", title: "Anak", category: "Keluarga", difficulty: "Mudah", mastered: false, liked: false, description: "Keturunan dari orang tua.", steps: ["Rentangkan tangan setinggi pinggang.", "Telapak tangan menghadap ke bawah.", "Gerakkan tangan turun sedikit dua kali."] },
  
  // Sekolah
  { id: "sekolah", emoji: "🏫", title: "Sekolah", category: "Sekolah", difficulty: "Menengah", mastered: false, liked: false, description: "Tempat menuntut ilmu dan belajar formal.", steps: ["Bentuk huruf S dengan jari tangan kanan.", "Gerakkan tangan dari kiri ke kanan di depan dada.", "Akhiri dengan membuka telapak tangan."] },
  { id: "buku", emoji: "📚", title: "Buku", category: "Sekolah", difficulty: "Mudah", mastered: false, liked: false, description: "Kumpulan lembar berisi ilmu dan cerita.", steps: ["Rapatkan kedua telapak tangan.", "Buka tangan seperti membuka buku.", "Tahan posisi terbuka selama 1 detik."] },
  { id: "menulis", emoji: "✏️", title: "Menulis", category: "Sekolah", difficulty: "Mudah", mastered: false, liked: false, description: "Kegiatan mencatat dengan alat tulis.", steps: ["Posisikan jari seperti memegang pensil.", "Gerakkan jari menulis di atas telapak tangan kiri.", "Ulangi gerakan 2–3 kali."] },
  
  // Makanan
  { id: "nasi", emoji: "🍚", title: "Nasi", category: "Makanan", difficulty: "Mudah", mastered: false, liked: false, description: "Makanan pokok masyarakat Indonesia.", steps: ["Buat mangkuk dengan kedua tangan.", "Gerakkan tangan seperti menyendok nasi.", "Arahkan ke mulut dengan perlahan."] },
  { id: "minum", emoji: "🥤", title: "Minum", category: "Makanan", difficulty: "Mudah", mastered: false, liked: false, description: "Aktivitas memasukkan cairan ke dalam mulut.", steps: ["Bentuk tangan seperti memegang gelas.", "Angkat tangan ke arah mulut.", "Miringkan sedikit seperti menuang minuman."] },
  { id: "buah", emoji: "🍎", title: "Buah", category: "Makanan", difficulty: "Mudah", mastered: false, liked: false, description: "Hasil tanaman yang bisa dimakan dan menyehatkan.", steps: ["Bentuk telapak tangan menghadap ke atas.", "Gerakkan jari-jari seperti memegang buah bulat.", "Angkat tangan sedikit ke atas."] },
  
  // Hewan
  { id: "kucing", emoji: "🐱", title: "Kucing", category: "Hewan", difficulty: "Mudah", mastered: true, liked: false, description: "Hewan peliharaan lucu dan populer.", steps: ["Bentuk dua jari (telunjuk dan tengah) di pipi.", "Gerakkan jari ke samping seperti kumis kucing.", "Tambahkan gerakan cakar di depan dada."] },
  { id: "anjing", emoji: "🐕", title: "Anjing", category: "Hewan", difficulty: "Mudah", mastered: false, liked: false, description: "Hewan peliharaan setia sahabat manusia.", steps: ["Tepuk paha dengan telapak tangan kanan.", "Jentikkan jari dua kali ke arah bawah.", "Tunjukkan ekspresi ramah dan riang."] },
  { id: "burung", emoji: "🐦", title: "Burung", category: "Hewan", difficulty: "Menengah", mastered: false, liked: false, description: "Hewan bersayap yang bisa terbang di langit.", steps: ["Satukan ibu jari kedua tangan.", "Rentangkan dan kipaskan jari seperti sayap.", "Gerakkan tangan naik turun perlahan."] },
  
  // Pekerjaan
  { id: "dokter", emoji: "👨‍⚕️", title: "Dokter", category: "Pekerjaan", difficulty: "Menengah", mastered: false, liked: false, description: "Tenaga medis profesional kesehatan.", steps: ["Sentuhkan ujung jari telunjuk ke pergelangan tangan.", "Gerakkan seperti mengecek denyut nadi.", "Anggukkan kepala sedikit."] },
  { id: "guru", emoji: "👩‍🏫", title: "Guru", category: "Pekerjaan", difficulty: "Mudah", mastered: true, liked: false, description: "Pendidik dan pengajar di sekolah.", steps: ["Sentuhkan telunjuk ke pelipis kanan.", "Gerakkan tangan ke depan membuka telapak.", "Arahkan telapak tangan ke atas."] },
  { id: "polisi", emoji: "👮", title: "Polisi", category: "Pekerjaan", difficulty: "Mudah", mastered: false, liked: false, description: "Petugas penegak hukum dan keamanan.", steps: ["Sentuhkan telapak tangan ke bahu kanan.", "Gerakkan tangan seperti memasang lencana.", "Berdiri tegak dengan percaya diri."] },
  
  // Tempat
  { id: "rumah", emoji: "🏠", title: "Rumah", category: "Tempat", difficulty: "Mudah", mastered: false, liked: false, description: "Tempat tinggal dan berlindung bagi keluarga.", steps: ["Satukan ujung-ujung jari kedua tangan di atas.", "Bentuk segitiga seperti atap rumah.", "Turunkan kedua tangan ke samping."] },
  { id: "air", emoji: "💧", title: "Air", category: "Tempat", difficulty: "Mudah", mastered: false, liked: false, description: "Cairan penting bagi kehidupan makhluk hidup.", steps: ["Rentangkan tiga jari (telunjuk, tengah, manis).", "Gerakkan tangan ke bawah seperti air mengalir.", "Ulangi gerakan 2–3 kali."] },
  { id: "taman", emoji: "🌳", title: "Taman", category: "Tempat", difficulty: "Mudah", mastered: false, liked: false, description: "Area terbuka hijau tempat bersantai.", steps: ["Letakkan siku kiri di telapak tangan kanan.", "Gerakkan jari tangan kiri seperti dahan pohon.", "Gerakkan perlahan ke atas."] },
  
  // Emosi
  { id: "senang", emoji: "😊", title: "Senang", category: "Emosi", difficulty: "Mudah", mastered: false, liked: false, description: "Ekspresi perasaan gembira dan bahagia.", steps: ["Letakkan telapak tangan di dada.", "Gerakkan tangan memutar ke atas.", "Tampilkan senyum yang tulus."] },
  { id: "sedih", emoji: "😢", title: "Sedih", category: "Emosi", difficulty: "Mudah", mastered: false, liked: false, description: "Ekspresi perasaan duka dan kesedihan.", steps: ["Letakkan kedua telunjuk di bawah mata.", "Gerakkan jari ke bawah seperti air mata.", "Tunjukkan ekspresi wajah murung."] },
  { id: "marah", emoji: "😠", title: "Marah", category: "Emosi", difficulty: "Menengah", mastered: false, liked: false, description: "Ekspresi perasaan tidak senang yang kuat.", steps: ["Kepalkan kedua tangan di depan dada.", "Gerakkan tangan ke luar dengan tegas.", "Tunjukkan ekspresi wajah tegas."] },
]

const CATEGORIES = ["Semua", "Salam", "Keluarga", "Sekolah", "Makanan", "Hewan", "Pekerjaan", "Tempat", "Emosi"]
const SORT_OPTIONS = ["Terbaru", "A–Z", "Terkuasai", "Favorit"]

export default function KamusPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("Semua")
  const [sort, setSort] = useState("Terbaru")
  const [selectedItem, setSelectedItem] = useState<KosakatItem | null>(null)
  const [likedIds, setLikedIds] = useState<string[]>([]) // 🌟 DIUBAH: State array penampung ID sekarang bertipe string[]

  const toggleLike = (id: string) => { // 🌟 DIUBAH: Parameter fungsi menggunakan tipe string
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const filtered = KOSAKATA
    .filter((k) => {
      const matchCat = activeCategory === "Semua" || k.category === activeCategory
      const matchSearch = k.title.toLowerCase().includes(search.toLowerCase())
      const matchFav = sort === "Favorit" ? likedIds.includes(k.id) : true
      return matchCat && matchSearch && matchFav
    })
    .sort((a, b) => {
      if (sort === "A–Z") return a.title.localeCompare(b.title)
      if (sort === "Terkuasai") return (b.mastered ? 1 : 0) - (a.mastered ? 1 : 0)
      
      // Karena ID sekarang string alfabetik, urutan "Terbaru" kita kembalikan 
      // berdasarkan index bawaan atau pencocokan string lokal jika dibutuhkan
      return KOSAKATA.findIndex(x => x.id === a.id) - KOSAKATA.findIndex(x => x.id === b.id)
    })

  return (
    <>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 min-h-screen">

          {/* Heading */}
          <div className="mb-8 animate-fade-up">
            <h1 className="select-none text-3xl font-extrabold text-gray-900 mb-1">Kamus Isyarat</h1>
            <p className="select-none text-sm text-gray-500">
              Jelajahi ratusan kosakata untuk memperlancar komunikasi Anda.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-5 animate-fade-up-delay-1">
            <span className="select-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Cari kosakata..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 animate-fade-up-delay-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`select-none px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Result count + Sort */}
          <div className="select-none flex items-center justify-between mb-5 animate-fade-up-delay-3">
            <p className="text-sm text-gray-500">
              Menampilkan <span className="font-semibold text-gray-700">{filtered.length}</span> kosakata ditemukan
            </p>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="select-none appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-gray-125 cursor-pointer"
              >
                {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <span className="select-none pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
            </div>
          </div>

          {/* Grid Area */}
          {filtered.length > 0 ? (
            <div
              className="grid gap-4 animate-fade-up-delay-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
            >
              {filtered.map((item) => (
                <KamusCard
                  key={item.id}
                  item={item}
                  onPlay={setSelectedItem}
                  liked={likedIds.includes(item.id)}
                  onToggleLike={toggleLike}
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-20 text-gray-400 animate-fade-up-delay-3">
              <p className="text-4xl mb-3">🔎</p>
              <p className="select-none font-semibold text-gray-600">Kosakata tidak ditemukan</p>
              <p className="select-none text-sm mt-1">Coba kata kunci lain atau pilih kategori berbeda</p>
            </div>
          )}

          {/* CTA Banner */}
          <div className="mt-12 bg-teal-600 rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-up-delay-3">
            <div>
              <p className="select-none font-extrabold text-white text-lg">Belum menemukan yang dicari?</p>
              <p className="select-none text-teal-100 text-sm mt-0.5">Bantu kami memperkaya kamus dengan mengusulkan kosakata baru.</p>
            </div>
            <button className="select-none shrink-0 px-6 py-3 rounded-xl bg-white text-teal-600 font-bold text-sm hover:bg-teal-50 transition">
              Usulkan Kosakata
            </button>
          </div>

        </div>
      </div>

      {/* Modal */}
      <KamusModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        liked={selectedItem ? likedIds.includes(selectedItem.id) : false}
        onToggleLike={() => selectedItem && toggleLike(selectedItem.id)}
      />
    </>
  )
}