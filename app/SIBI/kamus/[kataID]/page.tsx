"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { 
  IconArrowLeft, 
  IconChevronRight, 
  IconBookmark, 
  IconShare3, 
  IconHandClick 
} from "@tabler/icons-react"

// 1. DATABASE KATA (Sekarang menggunakan KEY string huruf kecil/slug agar URL rapi)
const dataKosakata: Record<string, { 
  title: string; 
  category: string; 
  description: string; 
  emoji: string; 
  steps: string[];
  related: string[]; // Menampung slug kata terkait secara dinamis
}> = {
  "halo": {
    title: "Halo",
    category: "Salam & Etika",
    description: "Ungkapan salam yang digunakan untuk menyapa seseorang dan memulai percakapan. Penting untuk memperhatikan ekspresi karena ini mencerminkan keramahan dan rasa hormat kepada lawan bicara.",
    emoji: "👋",
    steps: [
      "Posisi Tangan: Angkat tangan dominan Anda setinggi bahu atau telinga.",
      "Buka Telapak: Lebarkan jari-jari Anda dan pastikan telapak tangan menghadap ke arah orang yang Anda sapa.",
      "Gerakan Melambai: Gerakkan pergelangan tangan Anda dari sisi ke sisi secara lembut.",
      "Senyum: Selalu sertakan kontak mata dan senyuman agar sapaan terasa hangat dan ramah."
    ],
    related: ["terimakasih", "maaf", "senang"] // Muncul di halaman Halo
  },
  "terimakasih": {
    title: "Terima Kasih",
    category: "Salam & Etika",
    description: "Ungkapan syukur dan apresiasi kepada orang lain. Dalam bahasa isyarat, gerakan ini sangat mendasar namun memiliki makna mendalam yang mempererat hubungan sosial.",
    emoji: "🙏",
    steps: [
      "Posisi Tangan: Sentuhkan ujung jari-jari tangan dominan Anda ke bibir atau dagu.",
      "Arah Gerakan: Gerakkan tangan Anda ke depan dan ke bawah ke arah orang yang diberi ucapan.",
      "Bentuk Telapak: Pastikan telapak tangan menghadap ke dalam/atas saat memulai dan mengarah ke luar saat bergerak.",
      "Ekspresi Wajah: Sertakan anggukan kepala kecil dan ekspresi wajah tulus."
    ],
    related: ["halo", "senang", "maaf"] // Muncul di halaman Terima Kasih
  },
  "maaf": {
    title: "Maaf",
    category: "Salam & Etika",
    description: "Ungkapan penyesalan atas kesalahan yang dilakukan. Memperlihatkan kerendahan hati dan keinginan untuk memperbaiki hubungan dengan lawan bicara.",
    emoji: "😔",
    steps: [
      "Posisi Tangan: Kepalkan tangan kanan Anda dengan ibu jari di depan jari telunjuk.",
      "Gerakan: Tempelkan kepalan tangan di dada bagian kiri, lalu putar searah jarum jam beberapa kali.",
      "Ekspresi Wajah: Tunjukkan raut wajah menyesal, sedih, atau tulus tanpa senyuman berlebih."
    ],
    related: ["halo", "terimakasih", "senang"] // Muncul di halaman Maaf
  },
  "senang": {
    title: "Senang",
    category: "Emosi & Perasaan",
    description: "Ungkapan perasaan bahagia, gembira, atau sukacita. Gerakan ini sangat dipengaruhi oleh pancaran ekspresi wajah yang ceria.",
    emoji: "😊",
    steps: [
      "Posisi Tangan: Buka kedua telapak tangan menghadap ke dada Anda sendiri.",
      "Gerakan: Sapukan kedua telapak tangan ke atas dada secara bergantian dengan gerakan melingkar.",
      "Ekspresi Wajah: Wajib tersenyum lebar dan tunjukkan mata yang berbinar riang."
    ],
    related: ["halo", "terimakasih", "maaf"] // Muncul di halaman Senang
  }
}

export default function DetailVideoContent() {
  const [isMounted, setIsMounted] = useState(false)
  const params = useParams()
  
  // Ambil teks dari URL (misal: /kamus/halo atau /kamus/terimakasih)
  const kataAktif = (params?.kataID as string) || "halo"
  
  // Ambil data dari objek di atas. Jika tidak ada, otomatis pakai data "halo"
  const konten = dataKosakata[kataAktif] || dataKosakata["halo"]

  // Trigger efek transisi animasi fade-up setiap kali kataAktif berubah
  useEffect(() => {
    setIsMounted(false) // Reset state animasi sesaat
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 50) 
    return () => clearTimeout(timer)
  }, [kataAktif])

  return (
    <div className="min-h-full bg-gray-50">
      
      {/* 1. HEADER NAVIGASI */}
      <div className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/SIBI/kamus" className="hover:text-blue-600 transition">
            Kamus
          </Link>
          <IconChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-900 font-semibold">{konten.title}</span>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
        >
          <IconArrowLeft size={16} />
          Kembali ke Kamus
        </button>
      </div>

      {/* WRAPPER KONTEN UTAMA */}
      <div className={`max-w-7xl mx-auto px-6 py-8 transition-all duration-500 ease-out transform ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        
        {/* 2. GRID KONTEN UTAMA */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI (Video & Detail Kosakata) */}
          <div className="lg:col-span-2">
            
            {/* Wadah Video Placeholder */}
            <div className="w-full aspect-video bg-gray-900 rounded-4xl overflow-hidden relative shadow-lg flex items-center justify-center">
              <span className="text-white/10 text-9xl absolute select-none pointer-events-none">{konten.emoji}</span>
              <span className="text-white/50 font-medium relative z-10">Video Isyarat: {konten.title}</span>
              <div className="absolute w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl cursor-pointer hover:bg-white/30 transition z-10">
                ▶
              </div>
            </div>

            {/* Card Detail Informasi */}
            <div className="mt-6 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md tracking-wide">MUDAH</span>
                <span className="text-gray-400 text-sm font-medium">&bull; {konten.category}</span>
              </div>
              
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{konten.title}</h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-2xl text-justify">
                {konten.description}
              </p>
            </div>
          </div>

          {/* KOLOM KANAN (Panduan Praktik) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                  <IconHandClick size={22} stroke={2} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Praktik</h3>
              </div>
              
              <ol className="list-decimal list-inside space-y-4 text-sm text-gray-600 marker:font-bold marker:text-blue-600 marker:text-base">
                {konten.steps.map((step, idx) => {
                  const parts = step.split(":")
                  return (
                    <li key={idx}>
                      {parts.length > 1 ? (
                        <>
                          <span className="font-bold text-gray-900 ml-1">{parts[0]}:</span>
                          {parts[1]}
                        </>
                      ) : (
                        <span className="ml-1">{step}</span>
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Card Kuis */}
            <div className="bg-gray-100/80 rounded-3xl p-6 border border-gray-200 relative overflow-hidden">
              <h3 className="font-bold text-gray-900 text-lg mb-2 relative z-10">Uji Pemahaman?</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed relative z-10">
                Selesaikan kuis singkat untuk menguji pemahamanmu!
              </p>
              <Link href="/SIBI/quiz" className="px-6 py-2.5 bg-gray-900 text-white font-semibold text-sm rounded-xl hover:bg-black shadow-md transition relative z-10">
                Mulai Kuis
              </Link>
              <div className="absolute -bottom-6 -right-2 text-[5rem] opacity-10 rotate-15 select-none z-0">
                📝
              </div>
            </div>
          </div>
        </div>

        {/* 3. KOSAKATA TERKAIT (100% OTOMATIS BERUBAH) */}
        <div className="mt-8 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-xl mb-6">Kosakata Terkait</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {konten.related.map((slugTerkait) => {
              const itemTerkait = dataKosakata[slugTerkait]
              
              // Jika data slug tidak ditemukan di database, lewati agar tidak error
              if (!itemTerkait) return null

              return (
                <Link 
                  key={slugTerkait}
                  href={`/SIBI/kamus/${slugTerkait}`} 
                  className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition group cursor-pointer"
                >
                  <div className="aspect-16/10 bg-gray-100 flex items-center justify-center">
                    <span className="text-7xl leading-none">{itemTerkait.emoji}</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-blue-600 transition">
                        {itemTerkait.title}
                      </h4>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        MUDAH
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-blue-600 group-hover:text-blue-600 transition">
                      ▶
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}