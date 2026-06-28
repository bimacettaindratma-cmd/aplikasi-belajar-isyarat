"use client";

import { useRouter } from "next/navigation";
import {
  IconBook,
  IconPlayerPlay,
  IconChevronRight,
  IconExternalLink,
} from "@tabler/icons-react";

// ========== TIPE DATA ==========
type ModuleStatus = "lengkap" | "pemula" | "menengah" | "lanjutan";

type Module = {
  id: number;
  title: string;
  description: string;
  status: ModuleStatus;
  totalMateri: number;
  imagePlaceholderColor: string;
};

type ContinueLearning = {
  moduleId: number;
  moduleTitle: string;
  topic: string;
  description: string;
  progress: number;
};

// ========== DATA CONTOH ==========
const continueLearning: ContinueLearning = {
  moduleId: 3,
  moduleTitle: "MODUL 3: AKTIVITAS HARIAN",
  topic: "Kosakata Pekerjaan & Profesi",
  description:
    "Pelajari cara mengekspresikan berbagai jenis pekerjaan dalam bahasa isyarat untuk percakapan formal maupun informal.",
  progress: 65,
};

const modules: Module[] = [
  {
    id: 1,
    title: "Abjad & Jari",
    description: "Dasar-dasar ejaan jari (fingerspelling) untuk pemula.",
    status: "lengkap",
    totalMateri: 12,
    imagePlaceholderColor: "bg-amber-100",
  },
  {
    id: 2,
    title: "Angka",
    description: "Menghitung dan menyebutkan angka dalam bahasa isyarat.",
    status: "pemula",
    totalMateri: 8,
    imagePlaceholderColor: "bg-blue-100",
  },
  {
    id: 3,
    title: "Percakapan Dasar",
    description: "Sapaan, perkenalan diri, dan kalimat tanya sederhana.",
    status: "menengah",
    totalMateri: 15,
    imagePlaceholderColor: "bg-blue-100",
  },
  {
    id: 4,
    title: "Perkenalan",
    description: "Berkenalan secara mendalam dan etika komunitas Tuli.",
    status: "lanjutan",
    totalMateri: 10,
    imagePlaceholderColor: "bg-purple-100",
  },
  {
    id: 5,
    title: "Makanan & Minuman",
    description: "Pelajari isyarat untuk berbagai makanan dan minuman.",
    status: "pemula",
    totalMateri: 9,
    imagePlaceholderColor: "bg-rose-100",
  },
  {
    id: 6,
    title: "Hewan & Binatang",
    description: "Kenali isyarat untuk berbagai jenis hewan.",
    status: "menengah",
    totalMateri: 8,
    imagePlaceholderColor: "bg-indigo-100",
  },
];

// ========== KOMPONEN UTAMA ==========
export default function MateriPage() {
  const router = useRouter();

  const getStatusLabel = (status: ModuleStatus) => {
    switch (status) {
      case "lengkap":
        return { label: "LENGKAP", color: "text-emerald-600 bg-emerald-50" };
      case "pemula":
        return { label: "PEMULA", color: "text-blue-600 bg-blue-50" };
      case "menengah":
        return { label: "MENENGAH", color: "text-blue-600 bg-blue-50" };
      case "lanjutan":
        return { label: "LANJUTAN", color: "text-purple-600 bg-purple-50" };
      default:
        return { label: "", color: "" };
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10 select-none">

      {/* ===== SECTION 1: LANJUT BELAJAR ===== */}
      <div className="animate-fade-up">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Lanjut Belajar</h2>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">

          {/* Sisi Kiri */}
          <div className="relative w-full md:w-[42%] min-h-55 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
              <IconPlayerPlay size={24} className="fill-white ml-0.5" />
            </div>
            <span className="absolute bottom-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm">
              Sedang Berlangsung
            </span>
          </div>

          {/* Sisi Kanan */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p className="text-blue-600 text-xs font-extrabold tracking-wider uppercase">
                {continueLearning.moduleTitle}
              </p>
              <h3 className="text-xl font-extrabold text-gray-900 mt-1.5">
                {continueLearning.topic}
              </h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                {continueLearning.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1.5">
                  <span>Progres Modul</span>
                  <span className="text-blue-600">{continueLearning.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${continueLearning.progress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => router.push(`/SIBI/materi/${continueLearning.moduleId}`)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
              >
                Lanjutkan Materi
                <IconChevronRight size={16} stroke={2.5} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ===== SECTION 2: KATEGORI MATERI ===== */}
      <div>
        <div className="flex items-center justify-between mb-2 animate-fade-up">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Kategori Materi</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Pilih topik yang ingin kamu dalami hari ini.
            </p>
          </div>
          <button className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
            Lihat Semua
            <IconExternalLink size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          {modules.map((modul, index) => {
            const status = getStatusLabel(modul.status);

            const delayClasses = [
              "animate-fade-up",
              "animate-fade-up-delay-1",
              "animate-fade-up-delay-2",
              "animate-fade-up-delay-3",
            ];

            const animationDelayClass = delayClasses[index] || "animate-fade-up-delay-3";

            return (
              <div
                key={modul.id}
                className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-blue-200 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:animate-float-card ${animationDelayClass}`}
                onClick={() => router.push(`/SIBI/materi/${modul.id}`)}
              >
                <div className={`w-full h-36 ${modul.imagePlaceholderColor} relative flex items-center justify-center transition group-hover:opacity-90`}>
                  <span className="text-gray-400/60 text-xs font-bold tracking-wider uppercase">Pratinjau Gambar</span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition">
                      {modul.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {modul.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                      <IconBook size={14} />
                      <span>{modul.totalMateri} Materi</span>
                    </div>
                    <span className={`text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-lg ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}