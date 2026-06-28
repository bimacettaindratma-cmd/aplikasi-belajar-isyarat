"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconChevronRight,
  IconPlayerPlay,
} from "@tabler/icons-react";

export default function VideoLengkapPage() {
  const router = useRouter();
  const [playbackSpeed, setPlaybackSpeed] = useState<"0.5x" | "1.0x">("1.0x");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Data tiruan untuk Timestamp Video
  const timestamps = [
    { time: "00:00", label: "Pengenalan SIBI" },
    { time: "00:30", label: "Alfabet (A - M)" },
    { time: "02:15", label: "Alfabet (N - Z)" },
    { time: "04:00", label: "Angka (1 - 5)" },
    { time: "05:30", label: "Angka (6 - 10)" },
  ];

  return (
    <div className="min-h-full bg-gray-50 select-none">
      
      {/* ─── HEADER NAVIGASI / BREADCRUMB (DISESUAIKAN) ─── */}
      <div className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => router.push("/SIBI/alfabet")}
            className="hover:text-blue-600 transition"
          >
            Alfabet
          </button>
          <IconChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-900 font-semibold">Video Lengkap</span>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
        >
          <IconArrowLeft size={16} />
          Kembali ke Alfabet
        </button>
      </div>

      {/* ─── AREA KONTEN UTAMA DENGAN ANIMASI TRANSISI ─── */}
      <div
        className={`px-8 py-6 max-w-6xl mx-auto transition-all duration-500 ease-out transform ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        
        {/* Judul Halaman */}
        <h1 className="text-xl font-extrabold text-gray-900 mb-6">
          Panduan Video Utama: Kompilasi Alfabet & Angka 1–10
        </h1>

        {/* Layout Utama: Grid 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          
          {/* ===== KOLOM KIRI: Video Player & Deskripsi ===== */}
          <div className="space-y-5">
            {/* Wadah Video */}
            <div className="w-full aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-sm relative flex items-center justify-center border-4 border-white">
              <video
                src="/videos/SIBI-lengkap.mp4"
                controls
                className="w-full h-full object-cover"
                poster="/thumbnail-video.jpg"
              />
            </div>

            {/* Informasi Video & Caption */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                Video Panduan Utama
              </span>
              <h2 className="text-base font-extrabold text-gray-900 mt-3 mb-2">
                Kompilasi Isyarat SIBI: Alfabet & Angka
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Halaman ini menyajikan peragaan isyarat secara menyeluruh untuk mempermudah Anda melihat transisi gerakan antar huruf dan angka secara mengalir. Disarankan menggunakan kecepatan <span className="font-bold text-blue-600">0.5x</span> jika Anda baru pertama kali memulai latihan hafalan.
              </p>
            </div>
          </div>

          {/* ===== KOLOM KANAN: Timestamps & Tips ===== */}
          <div className="space-y-4">
            
            {/* Panel Akses Cepat / Timestamps */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-extrabold text-gray-900 mb-4">
                ⏱️ Lompat ke Bagian
              </h3>
              <div className="space-y-2">
                {timestamps.map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-100 text-left text-xs transition group"
                  >
                    <span className="font-bold text-gray-700 group-hover:text-blue-600">
                      {item.label}
                    </span>
                    <span className="font-mono bg-gray-200 group-hover:bg-blue-600 group-hover:text-white px-2 py-0.5 rounded-md text-gray-500 text-[11px] transition">
                      {item.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kotak Pro Tips */}
            <div className="bg-blue-800 rounded-2xl p-5">
              <h3 className="text-sm font-extrabold text-white mb-3 flex items-center gap-2">
                🤟 Tips Belajar Efektif
              </h3>
              <ul className="text-blue-100 text-xs space-y-2 leading-relaxed list-disc list-inside">
                <li>Gunakan tangan dominan Anda (kanan/kiri) secara konsisten sepanjang video.</li>
                <li>Ekspresi wajah (mimik) sangat memengaruhi penyampaian arti dalam SIBI.</li>
                <li>Ulangi minimal 3 kali sehari untuk membangun ingatan otot jari (*muscle memory*).</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}