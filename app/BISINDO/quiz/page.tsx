"use client"

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  IconCheck,
  IconPlayerPlay,
  IconStar,
  IconLock,
  IconX,
  IconCircleCheck,
  IconAward,
  IconChevronRight,
  IconChevronLeft
} from "@tabler/icons-react"

type LevelStatus = "selesai" | "berjalan" | "belum_dibuka" | "terkunci"

type Level = {
  id: number
  title: string
  status: LevelStatus
  materi: number
  selesai: number
  achievement: string | null
  xp: number
  deskripsi: string
}

const levels: Level[] = [
  // === HALAMAN 1 (Level 1 - 10) ===
  { id: 1, title: "Salam & Perkenalan", status: "selesai", materi: 6, selesai: 6, achievement: "Pemberi Salam", xp: 50, deskripsi: "Pelajari cara menyapa, memperkenalkan diri, dan berpamitan menggunakan bahasa isyarat BISINDO." },
  { id: 2, title: "Anggota Keluarga", status: "berjalan", materi: 8, selesai: 3, achievement: "Keluarga Bahagia", xp: 60, deskripsi: "Kenali isyarat untuk anggota keluarga seperti ayah, ibu, kakak, adik, dan kerabat lainnya." },
  { id: 3, title: "Angka 1-20", status: "belum_dibuka", materi: 10, selesai: 0, achievement: "Ahli Angka", xp: 70, deskripsi: "Kuasai isyarat angka 1 hingga 20 yang sering digunakan dalam kehidupan sehari-hari." },
  { id: 4, title: "Warna & Bentuk", status: "terkunci", materi: 7, selesai: 0, achievement: "Seniman Isyarat", xp: 60, deskripsi: "Pelajari isyarat untuk berbagai warna dan bentuk geometri dasar." },
  { id: 5, title: "Makanan & Minuman", status: "terkunci", materi: 9, selesai: 0, achievement: "Koki Isyarat", xp: 70, deskripsi: "Eksplorasi isyarat untuk makanan dan minuman yang umum dikonsumsi sehari-hari." },
  { id: 6, title: "Hewan Peliharaan", status: "terkunci", materi: 8, selesai: 0, achievement: "Pecinta Hewan", xp: 65, deskripsi: "Kenali isyarat untuk berbagai hewan peliharaan dan hewan yang sering dijumpai." },
  { id: 7, title: "Aktivitas Sehari-hari", status: "terkunci", materi: 10, selesai: 0, achievement: "Aktif Berisyarat", xp: 80, deskripsi: "Pelajari isyarat untuk kegiatan rutin seperti makan, tidur, mandi, dan bekerja." },
  { id: 8, title: "Profesi & Pekerjaan", status: "terkunci", materi: 9, selesai: 0, achievement: "Profesional Isyarat", xp: 75, deskripsi: "Kenali isyarat untuk berbagai profesi dan jenis pekerjaan." },
  { id: 9, title: "Tempat & Lokasi", status: "terkunci", materi: 8, selesai: 0, achievement: "Penjelajah Isyarat", xp: 70, deskripsi: "Pelajari isyarat untuk tempat-tempat umum seperti sekolah, rumah sakit, dan pasar." },
  { id: 10, title: "Perasaan & Emosi", status: "terkunci", materi: 7, selesai: 0, achievement: "Ekspresi Jiwa", xp: 65, deskripsi: "Ungkapkan perasaan dan emosi seperti senang, sedih, marah, dan takut melalui isyarat." },

  // === HALAMAN 2 (Level 11 - 20) ===
  { id: 11, title: "Nama-Nama Hari", status: "terkunci", materi: 7, selesai: 0, achievement: "Penjelajah Waktu", xp: 60, deskripsi: "Kuasai gerakan isyarat untuk menyebutkan hari dari Senin sampai Minggu secara fasih." },
  { id: 12, title: "Pakaian & Aksesoris", status: "terkunci", materi: 8, selesai: 0, achievement: "Ikon Fashion", xp: 65, deskripsi: "Pelajari isyarat benda fashion sehari-hari seperti baju, celana, topi, hingga sepatu." },
  { id: 13, title: "Cuaca & Musim", status: "terkunci", materi: 6, selesai: 0, achievement: "Pengendali Cuaca", xp: 60, deskripsi: "Pahami ekspresi dan tanda isyarat untuk mendeskriminasi kondisi hujan, cerah, maupun berangin." },
  { id: 14, title: "Transportasi", status: "terkunci", materi: 9, selesai: 0, achievement: "Kapten Isyarat", xp: 70, deskripsi: "Kenali isyarat untuk berbagai kendaraan seperti mobil, motor, kereta, dan pesawat terbang." },
  { id: 15, title: "Kata Kerja Dasar", status: "terkunci", materi: 10, selesai: 0, achievement: "Bahasa Aksi", xp: 80, deskripsi: "Perkaya kosakata aksi seperti membaca, menulis, memberi, mengambil, dan membawa." },
  { id: 16, title: "Kata Sifat Umum", status: "terkunci", materi: 8, selesai: 0, achievement: "Penilai Ulung", xp: 70, deskripsi: "Pelajari cara menerangkan sifat benda atau kondisi seperti besar, kecil, baru, lama, bersih, dan kotor." },
  { id: 17, title: "Hobi & Rekreasi", status: "terkunci", materi: 8, selesai: 0, achievement: "Pecinta Hiburan", xp: 70, deskripsi: "Komunikasikan kesenanganmu seperti berenang, bernyanyi, bermain game, dan berwisata." },
  { id: 18, title: "Kata Tanya Formal", status: "terkunci", materi: 6, selesai: 0, achievement: "Detektif Isyarat", xp: 65, deskripsi: "Gunakan formula isyarat 5W+1H (Apa, Siapa, Kapan, Di mana, Mengapa, Bagaimana) dengan tepat." },
  { id: 19, title: "Kesehatan & Tubuh", status: "terkunci", materi: 8, selesai: 0, achievement: "Bugar Isyarat", xp: 75, deskripsi: "Pahami kosa kata medis dasar, keluhan sakit, dan nama-nama anggota tubuh." },
  { id: 20, title: "Ujian Akhir SIBI", status: "terkunci", materi: 20, selesai: 0, achievement: "Master SIBI", xp: 150, deskripsi: "Ujian komprehensif penentu kelayakan untuk menguji seluruh materi dari Level 1 hingga Level 20." }
]

const offsets = [-120, 120, -120, 120, -120, 120, -120, 120, -120, 120]

export default function QuizPage() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
  const [halaman, setHalaman] = useState<number>(1)
  const [isAnimate, setIsAnimate] = useState<boolean>(true)
  
  // 🚀 Buat referensi penembak element scroll parent
  const containerRef = useRef<HTMLDivElement>(null)

  const handleGantiHalaman = (keHalaman: number) => {
    setIsAnimate(false)
    setSelectedLevel(null)
    
    // 🚀 SAPU JAGAT: Cari elemen pembungkus layout yang punya scrollbar, lalu paksa ke paling atas (top: 0)
    if (containerRef.current) {
      // 1. Coba reset elemen div ini sendiri
      containerRef.current.scrollTop = 0
      
      // 2. Cari parent div paling luar yang membungkus dashboard kamu sampai ketemu yang memicu scrollbar
      let parent = containerRef.current.parentElement
      while (parent) {
        if (parent.scrollHeight > parent.clientHeight) {
          parent.scrollTop = 0
        }
        parent = parent.parentElement
      }
    }

    // Tetap jalankan backup standard browser scroll
    window.scrollTo({ top: 0, behavior: "instant" })
    
    setTimeout(() => {
      setHalaman(keHalaman)
      setIsAnimate(true)
    }, 250)
  }

  const levelsTampil = levels.filter((lvl) => {
    if (halaman === 1) return lvl.id <= 10
    if (halaman === 2) return lvl.id > 10 && lvl.id <= 20
    return false
  })

  return (
    // 🚀 Pasang ref={containerRef} di div paling luar halaman ini
    <div ref={containerRef} className="px-8 py-8 max-w-md mx-auto overflow-hidden relative pb-28">
      
      <div className="animate-fade-up">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-1 select-none">Quiz & Evaluasi</h2>
        <p className="text-gray-500 text-sm text-center mb-10 select-none">Uji pemahamanmu dengan mengerjakan kuis setiap level</p>
      </div>

      <div className={`relative flex flex-col items-center transition-all duration-300 ease-in-out transform ${
        isAnimate ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}>
        {levelsTampil.map((lvl, i) => (
          <LevelNode
            key={lvl.id}
            level={lvl}
            offset={offsets[i]}
            index={i}
            onClick={() => lvl.status !== "terkunci" && setSelectedLevel(lvl)}
          />
        ))}
      </div>

      {/* Kontrol Navigasi Halaman Melayang */}
      <div className="fixed bottom-6 right-8 flex items-center gap-3 z-40">
        {halaman > 1 && (
          <button
            onClick={() => handleGantiHalaman(1)}
            className="flex items-center gap-1 bg-white hover:bg-gray-50 text-gray-600 font-extrabold text-sm px-5 py-3 rounded-xl border border-gray-200 transition active:scale-95 shadow-lg"
          >
            <IconChevronLeft size={16} />
            Level 1 - 10
          </button>
        )}

        {halaman === 1 && (
          <button
            onClick={() => handleGantiHalaman(2)}
            className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm px-5 py-3 rounded-xl transition active:scale-95 shadow-lg"
          >
            Level 11 - 20
            <IconChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Drawer Detail Level */}
      <div
        className={`fixed top-20 right-0 h-[calc(100vh-5rem)] w-80 max-w-[88vw] shadow-2xl bg-white border-l border-gray-100 z-50 p-6 flex flex-col transition-transform duration-500 ease-out ${
          selectedLevel ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedLevel && (
          <LevelDetail
            level={selectedLevel}
            onClose={() => setSelectedLevel(null)}
          />
        )}
      </div>
    </div>
  )
}

function LevelNode({
  level,
  offset,
  index,
  onClick,
}: {
  level: Level
  offset: number
  index: number
  onClick: () => void
}) {
  const styles: Record<LevelStatus, { bg: string; border: string; icon: string; Icon: React.ElementType }> = {
    selesai:      { bg: "bg-teal-50", border: "border-teal-500", icon: "text-teal-600", Icon: IconCheck },
    berjalan:     { bg: "bg-teal-50",    border: "border-teal-500",    icon: "text-teal-600",    Icon: IconPlayerPlay },
    belum_dibuka: { bg: "bg-white",      border: "border-gray-300",    icon: "text-gray-500",    Icon: IconStar },
    terkunci:     { bg: "bg-gray-100",   border: "border-gray-200",    icon: "text-gray-300",    Icon: IconLock },
  }

  const s = styles[level.status]
  const isRight = offset > 0
  
  // Warna garis halaman 2 (Level 11-20) diubah ke Indigo/Ungu Muda lembut
  const warnaGaris = level.id > 10 ? "bg-teal-100" : "bg-teal-100"

  const baseDelay = index * 0.15
  const vertDelay = `${baseDelay}s`
  const horizDelay = `${baseDelay + 0.08}s`
  const nodeDelay = `${baseDelay + 0.15}s`

  return (
    <div className="relative w-full max-w-xl h-36 mx-auto">
      
      {/* 1. GARIS VERTIKAL UTAMA */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 z-0 animate-draw-down ${warnaGaris}`} 
        style={{ animationDelay: vertDelay }}
      />

      {/* 2. MEKANISME KONEKTOR KIRI/KANAN */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 flex items-center ${
          isRight ? 'left-1/2 flex-row' : 'right-1/2 flex-row-reverse'
        }`}
      >
        <div 
          className={`h-1.5 z-0 ${isRight ? 'animate-draw-x-right origin-left' : 'animate-draw-x-left origin-right'} ${warnaGaris}`}
          style={{ 
            width: `${Math.abs(offset)}px`, 
            animationDelay: horizDelay 
          }}
        />

        {/* 3. LINGKARAN & TEKS LEVEL */}
        <div 
          className="relative animate-pop-bounce z-10 flex flex-col items-center justify-center"
          style={{ animationDelay: nodeDelay }}
        >
          <button
            onClick={onClick}
            disabled={level.status === "terkunci"}
            aria-label={`Level ${level.id}: ${level.title}`}
            className={`w-20 h-20 rounded-full border-2 bg-white flex flex-col items-center justify-center gap-0.5 shadow-sm transition-all duration-200 ${s.bg} ${s.border} ${
              level.status === "terkunci"
                ? "cursor-not-allowed"
                : "cursor-pointer hover:scale-110 hover:shadow-md active:scale-95"
            }`}
          >
            <s.Icon size={24} className={s.icon} stroke={2} />
            <span className={`text-xs font-bold ${s.icon}`}>{level.id}</span>
          </button>
          
          <p className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600 whitespace-nowrap bg-white/95 px-2 py-0.5 rounded-md shadow-xs border border-gray-100 select-none">
            {level.title}
          </p>
        </div>
      </div>

    </div>
  )
}

function LevelDetail({ level, onClose }: { level: Level; onClose: () => void }) {
  const router = useRouter();
  const pct = Math.round((level.selesai / level.materi) * 100)
  const sudahSelesai = level.status === "selesai"

  const buttonLabel =
    level.status === "selesai"
      ? "Kerjakan Ulang Kuis"
      : level.status === "berjalan"
      ? "Lanjutkan Kuis"
      : "Mulai Kuis"

  return (
    <div key={level.id} className="flex flex-col h-full animate-fade-up">
      <div className="flex-1 overflow-y-auto pb-4 pr-1">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Level {level.id}</span>
          <button onClick={onClose} aria-label="Tutup" className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-full transition">
            <IconX size={18} className="text-gray-500" />
          </button>
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-5 leading-tight">{level.title}</h3>

        <div className="mb-6">
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-2">
            <span>Progres Penyelesaian</span>
            <span className="text-teal-600">{level.selesai} dari {level.materi} soal</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 mb-6">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Soal di level ini</p>
          <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <IconCircleCheck size={18} className="text-teal-500" />
            {level.materi} soal interaktif
          </p>
        </div>

        <div className={`flex items-center gap-3.5 rounded-2xl px-4 py-4 mb-5 border ${
          sudahSelesai ? "bg-emerald-50 border-emerald-100" : "bg-white border-gray-100 shadow-sm"
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${sudahSelesai ? 'bg-emerald-200/50' : 'bg-gray-100'}`}>
            <IconAward size={22} className={sudahSelesai ? "text-emerald-600" : "text-gray-400"} />
          </div>
          <div>
            <p className={`text-sm font-bold ${sudahSelesai ? "text-emerald-800" : "text-gray-900"}`}>
              {level.achievement ?? "Achievement"}
            </p>
            <p className={`text-xs mt-0.5 ${sudahSelesai ? "text-emerald-600 font-medium" : "text-gray-500"}`}>
              {sudahSelesai ? `+${level.xp} XP berhasil diraih!` : "Selesaikan kuis untuk mendapatkan"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Tentang kuis ini</p>
          <p className="text-sm text-gray-600 leading-relaxed bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">{level.deskripsi}</p>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-100 shrink-0 mt-auto">
        <button
          onClick={() => router.push(`/BISINDO/quiz/${level.id}`)}
          className="w-full bg-teal-600 hover:bg-teal-700 hover:shadow-lg hover:-translate-y-0.5 text-white font-bold text-sm rounded-xl py-3.5 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {buttonLabel}
          <IconPlayerPlay size={16} className="fill-white" />
        </button>
      </div>
    </div>
  )
}