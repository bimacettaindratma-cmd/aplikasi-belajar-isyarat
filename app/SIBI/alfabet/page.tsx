"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // <-- Ditambahkan agar fungsi pindah halaman aktif
import AlfabetGrid from "./alfabetgrid"
import AlfabetDetail from "./alfabetdetail"
import FlashCard from "./flashcard"

/* ─────────────────────────── TYPES ─────────────────────────── */
export type AlphabetItem = {
  label: string
  sublabel: string
  emoji: string
  description: string
  steps: string[]
}

/* ─────────────────────────── DATA ─────────────────────────── */
const ALPHABET: AlphabetItem[] = [
  { label: "A", sublabel: "Huruf A", emoji: "✊", description: "Huruf A dalam isyarat SIBI.", steps: ["Kepalkan semua jari tangan kanan.", "Posisikan kepalan setinggi bahu.", "Ibu jari menempel di sisi kepalan."] },
  { label: "B", sublabel: "Huruf B", emoji: "🖐️", description: "Huruf B dalam isyarat SIBI.", steps: ["Tegakkan keempat jari (telunjuk–kelingking) rapat.", "Tekuk ibu jari ke telapak tangan.", "Telapak tangan menghadap ke depan."] },
  { label: "C", sublabel: "Huruf C", emoji: "🤏", description: "Huruf C dalam isyarat SIBI.", steps: ["Lengkungkan jari-jari membentuk huruf C.", "Ibu jari dan jari lain membentuk lengkung setengah lingkaran.", "Telapak menghadap ke samping."] },
  { label: "D", sublabel: "Huruf D", emoji: "☝️", description: "Huruf D dalam isyarat SIBI.", steps: ["Angkat jari telunjuk ke atas.", "Jari tengah, manis, kelingking tekuk ke telapak.", "Ibu jari menyentuh jari tengah yang ditekuk."] },
  { label: "E", sublabel: "Huruf E", emoji: "🤞", description: "Huruf E dalam isyarat SIBI.", steps: ["Tekuk semua jari ke bawah (setengah kepalan).", "Ibu jari ditekuk di bawah jari lainnya.", "Telapak menghadap ke depan."] },
  { label: "F", sublabel: "Huruf F", emoji: "👌", description: "Huruf F dalam isyarat SIBI.", steps: ["Pertemukan ujung ibu jari dan telunjuk membentuk lingkaran.", "Tegakkan tiga jari lainnya rapat.", "Telapak menghadap ke depan."] },
  { label: "G", sublabel: "Huruf G", emoji: "👈", description: "Huruf G dalam isyarat SIBI.", steps: ["Arahkan jari telunjuk ke samping kiri.", "Ibu jari sejajar telunjuk menunjuk ke kiri.", "Jari lain ditekuk ke telapak."] },
  { label: "H", sublabel: "Huruf H", emoji: "🤙", description: "Huruf H dalam isyarat SIBI.", steps: ["Sejajarkan telunjuk dan jari tengah menunjuk ke samping.", "Ibu jari menopang dari bawah.", "Jari manis dan kelingking ditekuk."] },
  { label: "I", sublabel: "Huruf I", emoji: "🤙", description: "Huruf I dalam isyarat SIBI.", steps: ["Angkat kelingking ke atas.", "Kepalkan jari telunjuk, tengah, dan manis.", "Ibu jari menempel di sisi kepalan."] },
  { label: "J", sublabel: "Huruf J", emoji: "🤙", description: "Huruf J dalam isyarat SIBI.", steps: ["Angkat kelingking seperti huruf I.", "Gerakkan kelingking membentuk kurva huruf J di udara.", "Akhiri gerakan dengan posisi kelingking lurus."] },
  { label: "K", sublabel: "Huruf K", emoji: "✌️", description: "Huruf K dalam isyarat SIBI.", steps: ["Tegakkan telunjuk dan jari tengah membentuk V.", "Ibu jari menyentuh bagian tengah jari tengah.", "Telapak menghadap ke depan."] },
  { label: "L", sublabel: "Huruf L", emoji: "🤙", description: "Huruf L dalam isyarat SIBI.", steps: ["Tegakkan jari telunjuk ke atas.", "Bentangkan ibu jari ke samping membentuk huruf L.", "Jari lain ditekuk ke telapak."] },
  { label: "M", sublabel: "Huruf M", emoji: "🤜", description: "Huruf M dalam isyarat SIBI.", steps: ["Tekuk telunjuk, tengah, dan manis ke telapak.", "Ibu jari masuk di bawah ketiga jari.", "Kelingking ditekuk ke telapak."] },
  { label: "N", sublabel: "Huruf N", emoji: "🤜", description: "Huruf N dalam isyarat SIBI.", steps: ["Tekuk telunjuk dan jari tengah ke telapak.", "Ibu jari masuk di bawah kedua jari.", "Jari manis dan kelingking ditekuk ke telapak."] },
  { label: "O", sublabel: "Huruf O", emoji: "👌", description: "Huruf O dalam isyarat SIBI.", steps: ["Lengkungkan semua jari dan ibu jari membentuk bulatan.", "Ujung semua jari bertemu dengan ujung ibu jari.", "Bentuk menyerupai huruf O."] },
  { label: "P", sublabel: "Huruf P", emoji: "👇", description: "Huruf P dalam isyarat SIBI.", steps: ["Tunjukkan jari telunjuk ke bawah.", "Ibu jari sejajar telunjuk menunjuk ke bawah.", "Jari lain ditekuk ke telapak."] },
  { label: "Q", sublabel: "Huruf Q", emoji: "👇", description: "Huruf Q dalam isyarat SIBI.", steps: ["Arahkan telunjuk dan ibu jari ke bawah.", "Kedua jari sejajar menunjuk ke lantai.", "Jari lain ditekuk ke telapak."] },
  { label: "R", sublabel: "Huruf R", emoji: "🤞", description: "Huruf R dalam isyarat SIBI.", steps: ["Silangkan jari telunjuk di atas jari tengah.", "Tegakkan kedua jari ke atas.", "Jari manis, kelingking, dan ibu jari ditekuk."] },
  { label: "S", sublabel: "Huruf S", emoji: "✊", description: "Huruf S dalam isyarat SIBI.", steps: ["Kepalkan semua jari.", "Ibu jari menindih di depan jari-jari yang ditekuk.", "Telapak menghadap ke depan."] },
  { label: "T", sublabel: "Huruf T", emoji: "🤜", description: "Huruf T dalam isyarat SIBI.", steps: ["Kepalkan jari dan sisipkan ibu jari antara telunjuk dan jari tengah.", "Ibu jari sedikit muncul keluar dari kepalan.", "Telapak menghadap ke depan."] },
  { label: "U", sublabel: "Huruf U", emoji: "✌️", description: "Huruf U dalam isyarat SIBI.", steps: ["Tegakkan telunjuk dan jari tengah rapat ke atas.", "Jari manis, kelingking, dan ibu jari ditekuk.", "Telapak menghadap ke depan."] },
  { label: "V", sublabel: "Huruf V", emoji: "✌️", description: "Huruf V dalam isyarat SIBI.", steps: ["Tegakkan telunjuk dan jari tengah membuka membentuk V.", "Jari manis, kelingking, dan ibu jari ditekuk.", "Telapak menghadap ke depan."] },
  { label: "W", sublabel: "Huruf W", emoji: "🖖", description: "Huruf W dalam isyarat SIBI.", steps: ["Tegakkan telunjuk, jari tengah, dan jari manis membuka.", "Ibu jari dan kelingking ditekuk.", "Telapak menghadap ke depan."] },
  { label: "X", sublabel: "Huruf X", emoji: "☝️", description: "Huruf X dalam isyarat SIBI.", steps: ["Angkat jari telunjuk dan bengkokkan ujungnya ke bawah.", "Jari lain ditekuk ke telapak.", "Telapak menghadap ke depan."] },
  { label: "Y", sublabel: "Huruf Y", emoji: "🤙", description: "Huruf Y dalam isyarat SIBI.", steps: ["Angkat ibu jari dan kelingking ke atas.", "Telunjuk, jari tengah, dan manis ditekuk ke telapak.", "Telapak menghadap ke depan."] },
  { label: "Z", sublabel: "Huruf Z", emoji: "☝️", description: "Huruf Z dalam isyarat SIBI.", steps: ["Angkat jari telunjuk ke atas.", "Gambar huruf Z di udara dengan gerakan telunjuk.", "Gerakkan: kanan → diagonal → kanan."] },
]

const NUMBERS: AlphabetItem[] = [
  { label: "1", sublabel: "Angka 1", emoji: "☝️", description: "Angka 1 dalam isyarat SIBI.", steps: ["Angkat jari telunjuk ke atas.", "Empat jari lain ditekuk ke telapak.", "Ibu jari menempel di sisi kepalan."] },
  { label: "2", sublabel: "Angka 2", emoji: "✌️", description: "Angka 2 dalam isyarat SIBI.", steps: ["Angkat telunjuk dan jari tengah ke atas.", "Jari lainnya ditekuk ke telapak.", "Telapak menghadap ke depan."] },
  { label: "3", sublabel: "Angka 3", emoji: "🤟", description: "Angka 3 dalam isyarat SIBI.", steps: ["Angkat ibu jari, telunjuk, dan jari tengah.", "Jari manis dan kelingking ditekuk.", "Telapak menghadap ke depan."] },
  { label: "4", sublabel: "Angka 4", emoji: "🖖", description: "Angka 4 dalam isyarat SIBI.", steps: ["Tegakkan keempat jari (telunjuk–kelingking).", "Ibu jari ditekuk ke telapak.", "Telapak menghadap ke depan."] },
  { label: "5", sublabel: "Angka 5", emoji: "🖐️", description: "Angka 5 dalam isyarat SIBI.", steps: ["Buka semua jari termasuk ibu jari.", "Renggangkan jari-jari sedikit.", "Telapak menghadap ke depan."] },
  { label: "6", sublabel: "Angka 6", emoji: "🤙", description: "Angka 6 dalam isyarat SIBI.", steps: ["Pertemukan ujung ibu jari dan kelingking.", "Tiga jari lain (telunjuk, tengah, manis) ditegakkan.", "Telapak menghadap ke depan."] },
  { label: "7", sublabel: "Angka 7", emoji: "🤞", description: "Angka 7 dalam isyarat SIBI.", steps: ["Pertemukan ujung ibu jari dan jari manis.", "Tiga jari lain (telunjuk, tengah, kelingking) ditegakkan.", "Telapak menghadap ke depan."] },
  { label: "8", sublabel: "Angka 8", emoji: "🤌", description: "Angka 8 dalam isyarat SIBI.", steps: ["Pertemukan ujung ibu jari dan jari tengah.", "Telunjuk, manis, dan kelingking ditegakkan.", "Telapak menghadap ke depan."] },
  { label: "9", sublabel: "Angka 9", emoji: "👌", description: "Angka 9 dalam isyarat SIBI.", steps: ["Pertemukan ujung ibu jari dan telunjuk membentuk lingkaran.", "Jari tengah, manis, kelingking ditegakkan.", "Telapak menghadap ke depan."] },
  { label: "10", sublabel: "Angka 10", emoji: "🤙", description: "Angka 10 dalam isyarat SIBI.", steps: ["Angkat ibu jari ke atas (seperti jempol).", "Gerakkan ibu jari ke kiri dan kanan dua kali.", "Posisi tangan setinggi bahu."] },
]

/* ─────────────────────────── PAGE ─────────────────────────── */
type Tab = "alfabet" | "angka"
type Mode = "grid" | "flashcard"

export default function AlphabetPage() {
  const router = useRouter() // <-- Diaktifkan di dalam komponen
  const [tab, setTab] = useState<Tab>("alfabet")
  const [mode, setMode] = useState<Mode>("grid")
  const [selected, setSelected] = useState<AlphabetItem | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const items = tab === "alfabet" ? ALPHABET : NUMBERS

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelected(null)
      setIsClosing(false)
    }, 200)
  }

  const handleSelect = (item: AlphabetItem) => {
    if (selected?.label === item.label) {
      handleClose()
      return
    }
    setSelected(item)
    setIsClosing(false)
  }

  const switchTab = (next: Tab) => {
    setTab(next)
    setMode("grid")
    setSelected(null)
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 pb-28 select-none">

        {/* Heading -> Menggunakan pola masuk instan */}
        <div className="mb-6 animate-fade-up">
          <h1 className="text-2xl font-extrabold text-gray-900">Alfabet & Angka</h1>
        </div>

        {/* Tab + Mode toggle -> Menggunakan pola masuk delay tingkat 1 */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6 animate-fade-up-delay-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchTab("alfabet")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition ${
                tab === "alfabet"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              🔤 Alfabet A–Z
            </button>
            <button
              onClick={() => switchTab("angka")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition ${
                tab === "angka"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              🔢 Angka 0–10
            </button>
          </div>

          <div className="inline-flex items-center bg-gray-100 rounded-full p-1 gap-1">
            <button
              onClick={() => setMode("grid")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                mode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setMode("flashcard")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                mode === "flashcard" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🃏 Flashcard
            </button>
          </div>
        </div>

        {/* Content Area -> Container utama diberikan delay tingkat 2 */}
        <div key={`${tab}-${mode}`} className="animate-fade-up-delay-2">
          {mode === "grid"
            ? <AlfabetGrid items={items} selectedLabel={selected?.label ?? null} onSelect={handleSelect} />
            : <FlashCard items={items} />
          }
        </div>

      </div>

      {/* Floating CTA -> Tombol Tonton Video Lengkap */}
      <button
        onClick={() => router.push("/SIBI/alfabet/video")}
        className="select-none fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition hover:scale-105 active:scale-95 animate-fade-up-delay-3"
      >
        ▶ Tonton Video
      </button>

      {/* Modal */}
      {selected && (
        <AlfabetDetail item={selected} isClosing={isClosing} onClose={handleClose} />
      )}
    </>
  )
}