"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  IconArrowLeft,
  IconPlayerPlay,
  IconCheck,
  IconChevronRight,
  IconMessage,
  IconUser,
  IconQuestionMark,
} from "@tabler/icons-react"

type Sesi = {
  id: number
  judul: string
  selesai: boolean
}

type Kosakata = {
  kata: string
  icon: React.ElementType
}

const sesiList: Sesi[] = [
  { id: 1, judul: "Perkenalan Kelas", selesai: false },
  { id: 2, judul: "Bertemu Teman Baru", selesai: true },
  { id: 3, judul: "Berpamitan Rapi", selesai: true },
]

const kosakataList: Kosakata[] = [
  { kata: "Halo", icon: IconMessage },
  { kata: "Nama Saya", icon: IconUser },
  { kata: "Siapa namamu?", icon: IconQuestionMark },
  { kata: "Selamat Pagi", icon: IconMessage },
  { kata: "Terima Kasih", icon: IconUser },
  { kata: "Sampai Jumpa", icon: IconQuestionMark },
]

const latihanList = [
  "Praktekkan Halo",
  "Praktekkan Nama",
  "Praktekkan Siapa",
]

export default function DetailMateriPage({
  params,
}: {
  params: { modulId: string }
}) {
  const router = useRouter()
  const [aktivSesi, setAktivSesi] = useState(1)
  const [latihanSelesai, setLatihanSelesai] = useState<boolean[]>(
    latihanList.map(() => false)
  )
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleLatihan = (i: number) => {
    setLatihanSelesai((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  const progressPersen = 35

  return (
    <div className="min-h-full bg-gray-50 select-none">

      {/* Breadcrumb + tombol kembali */}
      <div className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => router.back()}
            className="hover:text-teal-600 transition"
          >
            Materi
          </button>
          <IconChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-900 font-semibold">Detail Materi</span>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-teal-600 transition"
        >
          <IconArrowLeft size={16} />
          Kembali ke Materi
        </button>
      </div>

      <div
        className={`px-8 py-6 max-w-6xl mx-auto transition-all duration-500 ease-out transform ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >

        {/* Judul halaman */}
        <h1 className="text-xl font-extrabold text-gray-900 mb-6">
          Level 1: Salam & Perkenalan — Sesi {aktivSesi}:{" "}
          {sesiList.find((s) => s.id === aktivSesi)?.judul}
        </h1>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">

          {/* ===== KOLOM KIRI ===== */}
          <div className="space-y-5">

            {/* Video placeholder */}
            <div className="bg-slate-800 rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
              <button className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center shadow-lg hover:bg-teal-700 transition">
                <IconPlayerPlay size={24} className="text-white fill-white ml-1" />
              </button>
            </div>

            {/* Judul & deskripsi video */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-2">
                Video: {sesiList.find((s) => s.id === aktivSesi)?.judul} (Roleplay Situasional)
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Video ini mensimulasikan sesi belajar secara langsung. Amati gerakan isyarat dan
                ekspresi wajah untuk setiap kosakata yang ditampilkan.
              </p>
            </div>

            {/* Daftar Kosakata */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-extrabold text-gray-900 mb-4">Daftar Kosakata</h3>
              <div className="h-[136px] overflow-y-auto pr-1 space-y-2">
                {kosakataList.map((k, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 hover:border-teal-200 hover:bg-teal-50/30 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                      <k.icon size={16} className="text-teal-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{k.kata}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress sesi */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconCheck size={16} className="text-teal-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    Sesi {aktivSesi}/{sesiList.length} Selesai
                  </span>
                </div>
                <span className="text-sm font-bold text-teal-600">{progressPersen}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPersen}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 font-semibold">
                SESI PROGRES: {progressPersen}%
              </p>
            </div>

          </div>

          {/* ===== KOLOM KANAN ===== */}
          <div className="space-y-4">

            {/* Playlist sesi */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-extrabold text-gray-900 mb-4">Playlist Sesi Materi</h3>
              <div className="space-y-2">
                {sesiList.map((sesi) => (
                  <button
                    key={sesi.id}
                    onClick={() => setAktivSesi(sesi.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                      aktivSesi === sesi.id
                        ? "bg-teal-600 text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className={`font-bold shrink-0 ${aktivSesi === sesi.id ? "text-white" : "text-gray-400"}`}>
                      {sesi.id}.
                    </span>
                    <span className="flex-1 text-left font-semibold">{sesi.judul}</span>
                    {sesi.selesai && aktivSesi !== sesi.id && (
                      <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                        <IconCheck size={12} className="text-teal-600" />
                      </div>
                    )}
                    {aktivSesi === sesi.id && (
                      <IconPlayerPlay size={14} className="fill-white text-white shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tips Ekspresi */}
            <div className="bg-teal-600 rounded-2xl p-5">
              <h3 className="text-sm font-extrabold text-white mb-3 flex items-center gap-2">
                💡 Tips Ekspresi BISINDO
              </h3>
              <p className="text-teal-100 text-sm leading-relaxed">
                Kontak mata yang kuat adalah kunci. Gunakan alis naik saat bertanya "Siapa?".
                Jangan lupa senyum ramah saat 'Halo'.
              </p>
            </div>

            {/* Latihan Sendiri */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-extrabold text-gray-900 mb-4">Latihan Sendiri</h3>
              <div className="space-y-3">
                {latihanList.map((latihan, i) => (
                  <button
                    key={i}
                    onClick={() => toggleLatihan(i)}
                    className="w-full flex items-center gap-3 text-left"
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition ${
                      latihanSelesai[i]
                        ? "bg-teal-600 border-teal-600"
                        : "border-gray-300"
                    }`}>
                      {latihanSelesai[i] && <IconCheck size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm font-semibold transition ${
                      latihanSelesai[i] ? "text-gray-400 line-through" : "text-gray-700"
                    }`}>
                      {latihan}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tombol selesai */}
            <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm rounded-xl py-4 transition">
              Tandai Selesai & Ke Kuis
            </button>

            {/* Link ke kuis */}
            <div className="bg-teal-50 rounded-xl border border-blue-100 px-4 py-3 flex items-start gap-2">
              <span className="text-teal-500 mt-0.5 shrink-0">ℹ️</span>
              <p className="text-xs text-teal-700 leading-relaxed">
                Sudah paham? Cek kemampuanmu di Kuis Level 1!
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}