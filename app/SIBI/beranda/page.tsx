"use client"
import {
  IconAward,
  IconChevronDown,
  IconChevronRight,
  IconFlame,
  IconAlphabetLatin,
  IconHandMove

} from "@tabler/icons-react";
import { ReactNode } from "react";
import Link from "next/link"
export default function BerandaPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 select-none">
      <main className="px-8 py-8 space-y-6 max-w-7xl w-full mx-auto">

        {/* Greeting */}
        <div className="animate-fade-up">
          <h2 className="text-lg text-gray-900 mb-1">Selamat datang kembali, Teman dengar! 👋</h2>
          <p className="text-gray-500 text-sm">Ayo belajar untuk mencapai target harianmu!</p>
        </div>

        {/* Promo banner */}
        <div className="animate-fade-up-delay-1 bg-linear-to-br from-blue-700 to-blue-300 rounded-3xl px-9 py-10">
          <span className="inline-block bg-white/20 text-white text-[11px] font-bold tracking-wide px-3 py-1 rounded-full mb-4">
            TERBARU
          </span>
          <h3 className="text-white text-2xl font-bold mb-2">Learn SIBI</h3>
          <p className="text-blue-100 text-sm max-w-md leading-relaxed">
            Belajar bahasa isyarat Indonesia dengan cara yang menyenangkan.
          </p>
        </div>
        {/* Grid utama 2 kolom */}
        <div className="animate-fade-up-delay-2 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">

          {/* KOLOM KIRI */}
          <div className="flex flex-col gap-6">

            {/* Lanjut Belajar */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center mb-5">
                <h3 className="font-bold text-gray-900 text-base">Lanjut Belajar</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <LessonCard
                  imgSrc="/salam.jpg"
                  title="Salam & Perkenalan"
                  subtitle="8 dari 12 pelajaran selesai"
                  progress={67}
                />
                <LessonCard
                  imgSrc="/familiy.jpg"
                  title="Anggota Keluarga"
                  subtitle="3 dari 10 pelajaran selesai"
                  progress={30}
                />
              </div>
            </div>

            {/* Gesture Hari Ini */}
            <div className="animate-fade-up-delay-2 bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-base">Gesture Hari Ini</h3>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-gray-200 h-52 flex items-center justify-center mb-4">
                <span className="text-8xl">🤟</span>
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-5 py-4">
                  <p className="text-white font-bold text-lg">TERIMA KASIH - THANK YOU</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900 text-sm">Terima Kasih</p>
                  <p className="text-xs text-gray-400 mt-0.5">Bahasa Isyarat · SIBI</p>
                </div>
                <Link  href="/SIBI/kamus/terimakasih" className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:underline">
                  Pelajari <IconChevronRight size={15} />
                </Link>
              </div>
            </div>

            {/* Progres Mingguan */}
            <div className="animate-fade-up-delay-2 bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900 text-base">Progres Mingguan</h3>
                <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50">
                  Minggu Ini <IconChevronDown size={14} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-4">Menampilkan durasi belajar (menit)</p>
              <WeeklyChart />
            </div>

          </div>

          {/* KOLOM KANAN */}
          <div className="flex flex-col gap-6">

            {/* Target Harian */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center text-center">
              <h3 className="font-bold text-gray-900 text-base self-start mb-4">Target Harian</h3>
              <div className="relative w-32 h-32 mb-4">
                <svg viewBox="0 0 120 120" className="w-32 h-32 -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#bfdbfe" strokeWidth="12" />
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - 0.65)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-blue-700">65%</span>
                  <span className="text-[10px] font-semibold text-gray-400 tracking-wide">TARGET</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-700">13 dari 20 menit</p>
              <p className="text-xs text-gray-400 mt-1 mb-5">Sisa 7 menit lagi untuk mencapai target!</p>
              <Link href="/SIBI/quiz" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl py-3 transition">
                Mulai Latihan
              </Link>
            </div>

            {/* Learning Progress */}
            <div className="animate-fade-up-delay-2 bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 text-base">Learning Progress</h3>
              </div>
              <div className="space-y-4">
                <ProgressItem label="Sapaan" percent={100} />
                <ProgressItem label="Keluarga" percent={70} />
                <ProgressItem label="Lingkungan" percent={35} />
              </div>
              <Link href="/SIBI/materi" className="mt-5 inline-flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline">
                Lihat Materi <IconChevronRight size={15} />
              </Link>
            </div>

            {/* Pencapaian */}
            <div className="animate-fade-up-delay-2 bg-white rounded-2xl border border-gray-100 p-6 min-h-55 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 text-base">Pencapaian</h3>
                <IconAward size={20} className="text-blue-600" />
              </div>
              <div className="grid grid-cols-3 gap-4 justify-center mt-4">
                <AchievementBadge 
                  label="Streak 7 Hari" 
                  icon={<IconFlame className="w-6 h-6 text-orange-500 animate-pulse" />} 
                />
                <AchievementBadge 
                  label="Master Alfabet" 
                  icon={<IconAlphabetLatin className="w-6 h-6 text-blue-500" />} 
                />
                <AchievementBadge 
                  label="Pemberi Salam" 
                  icon={<IconHandMove className="w-6 h-6 text-green-500" />} 
                />
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

function LessonCard({
  imgSrc, title, subtitle, progress,
}: {
  imgSrc: string; title: string; subtitle: string; progress: number;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
      <img
        src={imgSrc}
        alt={title}
        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-200"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 mb-1">{title}</p>
        <p className="text-xs text-gray-400 mb-2">{subtitle}</p>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

function ProgressItem({ label, percent }: { label: string; percent: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs font-bold text-blue-600">{percent}%</p>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}



function AchievementBadge({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      {/* Lingkaran badge tempat menaruh ikon tabler */}
      <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-xs font-semibold text-gray-600 leading-tight max-w-25">
        {label}
      </p>
    </div>
  );
}

function WeeklyChart() {
  const data = [40, 75, 60, 95, 65, 90, 100];
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const max = 120;
  const width = 700;
  const height = 180;
  const stepX = width / (data.length - 1);

  const points = data.map((val, i) => {
    const x = i * stepX;
    const y = height - (val / max) * height;
    return [x, y];
  });

  const linePath = points
    .map(([x, y], i) => (i === 0 ? `M ${x},${y}` : `L ${x},${y}`))
    .join(" ");

  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaFill)" />
        <path d={linePath} fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
      </svg>
      <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
        {days.map((d) => (
          <span key={d} className={d === "Min" ? "text-blue-600 font-semibold" : ""}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}