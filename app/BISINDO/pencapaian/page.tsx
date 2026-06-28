"use client"

import { useState } from "react"
import {
  IconStar, IconFlame, IconTrophy, IconBook,
  IconLock, IconCircleCheck, IconChevronRight,
  IconSparkles, IconTarget, IconAward, IconBolt,
  IconAlpha, IconLetterCase, IconMedal, IconRocket
} from "@tabler/icons-react"

type StatusAchievement = "diraih" | "proses" | "terkunci"
type TabFilter = "semua" | "diraih" | "proses" | "terkunci"

type Achievement = {
  id: number
  judul: string
  deskripsi: string
  icon: React.ElementType
  status: StatusAchievement
  tanggal?: string
  progress?: number
  progressTarget?: number
  progressSatuan?: string
  langkahSelanjutnya?: string
  syarat?: string
  xp: number
  warna: string
}

const achievements: Achievement[] = [
  {
    id: 1,
    judul: "Pemberi Salam",
    deskripsi: "Selesaikan semua materi di level Salam & Perkenalan.",
    icon: IconStar,
    status: "diraih",
    tanggal: "10 Jun 2025",
    xp: 50,
    warna: "teal",
  },
  {
    id: 2,
    judul: "7-Day Streak",
    deskripsi: "Belajar selama 7 hari berturut-turut tanpa jeda.",
    icon: IconFlame,
    status: "diraih",
    tanggal: "15 Jun 2025",
    xp: 70,
    warna: "teal",
  },
  {
    id: 3,
    judul: "Alphabet Master",
    deskripsi: "Kuasai seluruh alfabet isyarat BISINDO.",
    icon: IconLetterCase,
    status: "diraih",
    tanggal: "18 Jun 2025",
    xp: 80,
    warna: "teal",
  },
  {
    id: 4,
    judul: "Keluarga Bahagia",
    deskripsi: "Selesaikan semua materi di level Anggota Keluarga.",
    icon: IconAward,
    status: "proses",
    progress: 3,
    progressTarget: 8,
    progressSatuan: "materi",
    langkahSelanjutnya: "Selesaikan 5 materi lagi untuk membuka pencapaian ini.",
    xp: 60,
    warna: "teal",
  },
  {
    id: 5,
    judul: "Rajin Belajar",
    deskripsi: "Kumpulkan total 500 menit waktu belajar.",
    icon: IconTarget,
    status: "proses",
    progress: 320,
    progressTarget: 500,
    progressSatuan: "menit",
    langkahSelanjutnya: "Butuh 180 menit lagi untuk membuka pencapaian ini.",
    xp: 90,
    warna: "teal",
  },
  {
    id: 6,
    judul: "Ahli Angka",
    deskripsi: "Selesaikan semua materi di level Angka 1-20.",
    icon: IconBolt,
    status: "terkunci",
    syarat: "Selesaikan level Angka 1-20 terlebih dahulu.",
    xp: 70,
    warna: "gray",
  },
  {
    id: 7,
    judul: "Koki Isyarat",
    deskripsi: "Selesaikan semua materi di level Makanan & Minuman.",
    icon: IconSparkles,
    status: "terkunci",
    syarat: "Buka level Makanan & Minuman terlebih dahulu.",
    xp: 70,
    warna: "gray",
  },
  {
    id: 8,
    judul: "Quiz Champion",
    deskripsi: "Raih nilai sempurna di 5 kuis berturut-turut.",
    icon: IconTrophy,
    status: "terkunci",
    syarat: "Selesaikan minimal 5 kuis dengan nilai 100.",
    xp: 100,
    warna: "gray",
  },
  {
    id: 9,
    judul: "Penjelajah Isyarat",
    deskripsi: "Buka semua level di jalur pembelajaran BISINDO.",
    icon: IconRocket,
    status: "terkunci",
    syarat: "Buka semua 10 level di jalur BISINDO.",
    xp: 150,
    warna: "gray",
  },
]

const tabs: { key: TabFilter; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "diraih", label: "Sudah Diraih" },
  { key: "proses", label: "Dalam Proses" },
  { key: "terkunci", label: "Terkunci" },
]

export default function PencapaianPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>("semua")

  const filtered = achievements.filter((a) => {
    if (activeTab === "semua") return true
    if (activeTab === "diraih") return a.status === "diraih"
    if (activeTab === "proses") return a.status === "proses"
    if (activeTab === "terkunci") return a.status === "terkunci"
    return true
  })

  const diraih = filtered.filter((a) => a.status === "diraih")
  const proses = filtered.filter((a) => a.status === "proses")
  const terkunci = filtered.filter((a) => a.status === "terkunci")

  const totalDiraih = achievements.filter((a) => a.status === "diraih").length
  const totalProses = achievements.filter((a) => a.status === "proses").length
  const totalTerkunci = achievements.filter((a) => a.status === "terkunci").length

  // Fungsi helper untuk menghasilkan kelas delay berulang (0, 1, 2, 3)
  const getDelayClass = (index: number) => {
    const delays = ["animate-fade-up", "animate-fade-up-delay-1", "animate-fade-up-delay-2", "animate-fade-up-delay-3"];
    return delays[index % 4];
  }

  return (
    <div className="px-8 py-8 space-y-6 max-w-6xl w-full mx-auto">

      {/* Tab Filter (Muncul pertama kali) */}
      <div className="flex gap-1 border-b border-gray-100 animate-fade-up">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${
              activeTab === tab.key
                ? "text-teal-600 border-teal-600"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bungkus konten dengan key={activeTab}.
        Saat tab berubah, React mereset elemen ini dan memutar ulang animasinya.
      */}
      <div key={activeTab} className="space-y-10">
        
        {/* Sudah Diraih */}
        {diraih.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 animate-fade-up">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <IconCircleCheck size={18} className="text-teal-600" />
                Sudah Diraih
              </h3>
              <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                {totalDiraih} Diraih
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {diraih.map((a, i) => (
                <AchievementCardDiraih key={a.id} achievement={a} delayClass={getDelayClass(i)} />
              ))}
            </div>
          </div>
        )}

        {/* Dalam Proses */}
        {proses.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 animate-fade-up">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <IconTarget size={18} className="text-amber-500" />
                Dalam Proses
              </h3>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                {totalProses} Sedang Berjalan
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {proses.map((a, i) => (
                <AchievementCardProses key={a.id} achievement={a} delayClass={getDelayClass(i)} />
              ))}
            </div>
          </div>
        )}

        {/* Terkunci */}
        {terkunci.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 animate-fade-up">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <IconLock size={18} className="text-gray-400" />
                Terkunci
              </h3>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {totalTerkunci} Terkunci
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {terkunci.map((a, i) => (
                <AchievementCardTerkunci key={a.id} achievement={a} delayClass={getDelayClass(i)} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// ========== KOMPONEN KARTU ========== //

function AchievementCardDiraih({ achievement: a, delayClass }: { achievement: Achievement, delayClass: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 transition-all duration-300 hover:border-teal-200 hover:shadow-md hover:animate-float-card ${delayClass}`}>
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
          <a.icon size={22} className="text-teal-600" />
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">{a.tanggal}</span>
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm mb-1">{a.judul}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{a.deskripsi}</p>
      </div>
      <div className="flex items-center gap-1.5 text-teal-600">
        <IconCircleCheck size={15} className="shrink-0" />
        <span className="text-xs font-bold tracking-wide">DIAMBIL · +{a.xp} XP</span>
      </div>
    </div>
  )
}

function AchievementCardProses({ achievement: a, delayClass }: { achievement: Achievement, delayClass: string }) {
  const pct = Math.round(((a.progress ?? 0) / (a.progressTarget ?? 1)) * 100)

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 transition-all duration-300 hover:border-amber-200 hover:shadow-md hover:animate-float-card ${delayClass}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
          <a.icon size={22} className="text-amber-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-bold text-gray-900 text-sm">{a.judul}</p>
            <span className="text-sm font-bold text-teal-600 shrink-0">{pct}%</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">{a.deskripsi}</p>
        </div>
      </div>
      <div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-1000"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">
          {a.progress} dari {a.progressTarget} {a.progressSatuan}
        </p>
      </div>
      <div className="bg-teal-50 rounded-xl px-4 py-3 flex items-start gap-2">
        <IconChevronRight size={14} className="text-teal-500 shrink-0 mt-0.5" />
        <p className="text-xs text-teal-700">{a.langkahSelanjutnya}</p>
      </div>
    </div>
  )
}

function AchievementCardTerkunci({ achievement: a, delayClass }: { achievement: Achievement, delayClass: string }) {
  return (
    <div className={`bg-gray-50 rounded-2xl border border-gray-200 p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:border-gray-300 ${delayClass}`}>
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
          <a.icon size={22} className="text-gray-300" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
          <IconLock size={10} className="text-gray-400" />
        </div>
      </div>
      <div>
        <p className="font-bold text-gray-400 text-sm mb-1">{a.judul}</p>
        <p className="text-xs text-gray-300 leading-relaxed">{a.syarat}</p>
      </div>
      <span className="text-xs text-gray-300 font-semibold">+{a.xp} XP</span>
    </div>
  )
}