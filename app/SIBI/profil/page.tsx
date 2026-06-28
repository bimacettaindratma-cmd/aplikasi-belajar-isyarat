"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"
export default function ProfilePage() {
  const router = useRouter();

  // Pengaturan State Pembelajaran & Tampilan
  const [activeSystem, setActiveSystem] = useState<"SIBI" | "BISINDO">("SIBI");
  const [dailyTarget, setDailyTarget] = useState<5 | 10 | 15>(10);
  const [darkMode, setDarkMode] = useState(false);
  const [reminder, setReminder] = useState(true);
  const [autoLoop, setAutoLoop] = useState(true);
  const [videoSpeed, setVideoSpeed] = useState<"0.5x" | "1.0x" | "1.5x">("1.0x");

  // State Pop-up Edit Profile
  const [showEditModal, setShowEditModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // State Pop-up Konfirmasi Pindah ke BISINDO
  const [showBisindoModal, setShowBisindoModal] = useState(false);
  const [isBisindoClosing, setIsBisindoClosing] = useState(false);

  // State Data Profil Internal
  const [username, setUsername] = useState("@teman_dengar");
  const [email, setEmail] = useState("teman.dengar@email.com");
  const [bio, setBio] = useState("Semangat belajar bahasa isyarat! 🤟 Fokus ke SIBI bulan ini.");

  // Efek Pembersihan Timer saat Komponen Dimatikan (Mencegah Memory Leak)
  useEffect(() => {
    return () => {
      // Membersihkan timer jika pengguna meninggalkan halaman saat animasi sedang berjalan
    };
  }, []);

  // Handler Modal Edit Profil
  const handleOpenEditModal = () => {
    setIsClosing(false);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsClosing(true);
    const timer = setTimeout(() => {
      setShowEditModal(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  // Handler Klik Pilihan Sistem Utama (SIBI / BISINDO)
  const handleSystemClick = (system: "SIBI" | "BISINDO") => {
    if (system === "BISINDO" && activeSystem !== "BISINDO") {
      setIsBisindoClosing(false);
      setShowBisindoModal(true);
    } else {
      setActiveSystem(system);
    }
  };

  // Aksi Konfirmasi Pindah Modul Utama ke Jalur BISINDO
  const handleConfirmBisindo = () => {
    setIsBisindoClosing(true);
    const timer = setTimeout(() => {
      setShowBisindoModal(false);
      // Langsung arahkan navigasi rute ke halaman beranda BISINDO
      router.push("/BISINDO/beranda");
    }, 300);
    return () => clearTimeout(timer);
  };

  const handleCloseBisindoModal = () => {
    setIsBisindoClosing(true);
    const timer = setTimeout(() => {
      setShowBisindoModal(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 min-h-screen flex flex-col gap-6 select-none">

          {/* BARIS 1: Full-Width Profile Banner Card */}
          <div className="w-full bg-white rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-up">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full">
              {/* Avatar Frame */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-blue-800 overflow-hidden ring-4 ring-gray-100">
                  <img
                    src="/profilanon1.jpeg"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=Teman+Dengar&background=1e3a8a&color=fff&size=128";
                    }}
                  />
                </div>
                <div className="absolute bottom-0 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>

              {/* Teks Deskripsi Profil */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-extrabold text-gray-800">Teman Dengar</h2>
                <p className="text-xs text-gray-400 font-medium">{username}</p>
                
                {/* Balon Kutipan Bio */}
                <div className="mt-3 bg-gray-50 rounded-2xl px-4 py-3 text-xs md:text-sm text-gray-600 max-w-xl border border-gray-100">
                  "{bio}"
                </div>
              </div>
            </div>

            {/* Tombol Sunting */}
            <button 
              onClick={handleOpenEditModal}
              className="shrink-0 bg-blue-800 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-blue-900 transition-all active:scale-95 shadow-sm"
            >
              Edit Profil
            </button>
          </div>

          {/* BARIS 2: 4 Kolom Kotak Ringkasan Statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up-delay-1">
            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-blue-50/70 flex items-center justify-center text-xl shrink-0">📘</div>
              <div>
                <p className="text-2xl font-black text-gray-800 leading-none">42</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Materi Selesai</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-xl shrink-0">📋</div>
              <div>
                <p className="text-2xl font-black text-gray-800 leading-none">18</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Kuis Lulus</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl shrink-0">🔥</div>
              <div>
                <p className="text-2xl font-black text-gray-800 leading-none">7</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Hari Streak</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl shrink-0">🏆</div>
              <div>
                <p className="text-2xl font-black text-gray-800 leading-none">4</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Total Pencapaian</p>
              </div>
            </div>
          </div>

          {/* BARIS 3: Card Progres Belajar (Dilengkapi Animasi Hover Dinamis) */}
          <div className="w-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-up-delay-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-gray-800">Progres Belajar</h3>
              <span className="text-gray-300 text-xs font-bold">📊</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-black text-gray-800">{activeSystem}</p>
                <p className="text-[11px] text-gray-400 font-medium">
                  {activeSystem === "SIBI" ? "Sistem Isyarat Bahasa Indonesia" : "Bahasa Isyarat Indonesia"}
                </p>
              </div>
              <p className="text-sm font-black text-blue-800">
                35 <span className="text-gray-300 font-normal">/ 100 pelajaran</span>
              </p>
            </div>

            {/* Indikator Bar Pengisi */}
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-1.5">
              <div className="bg-blue-800 h-full rounded-full transition-all duration-500 w-[35%]" />
            </div>
            <p className="text-[11px] font-bold text-gray-400">35% Selesai</p>
          </div>

          {/* BARIS 4: Panel Pengaturan Belajar + Aksesibilitas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up-delay-3">
            
            {/* Sektor Pengaturan Belajar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-base font-bold text-gray-800 mb-5">📖 Pengaturan Belajar</h3>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700">Sistem Utama</p>
                <p className="text-xs text-gray-400 mb-3">Pilih fokus utama pembelajaran Anda</p>
                <div className="flex gap-2">
                  {(["SIBI", "BISINDO"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSystemClick(s)}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 active:scale-95 ${
                        activeSystem === s
                          ? "bg-blue-800 text-white border-blue-800 shadow-sm"
                          : "bg-white text-gray-500 border-gray-200 hover:border-blue-800 hover:text-blue-800 hover:bg-blue-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Pengingat Harian</p>
                  <p className="text-xs text-gray-400">Notifikasi push untuk latihan harian</p>
                </div>
                <button
                  onClick={() => setReminder(!reminder)}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 shrink-0 ${reminder ? "bg-blue-800" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${reminder ? "left-5" : "left-0.5"}`} />
                </button>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700">Target Waktu Harian</p>
                <p className="text-xs text-gray-400 mb-3">Durasi belajar dalam menit per hari</p>
                <div className="flex gap-2">
                  {([5, 10, 15] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setDailyTarget(m)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all duration-150 flex flex-col items-center active:scale-95 ${
                        dailyTarget === m
                          ? "bg-blue-800 text-white border-blue-800 shadow-sm"
                          : "bg-white text-gray-500 border-gray-200 hover:border-blue-800 hover:text-blue-800 hover:bg-blue-50"
                      }`}
                    >
                      <span className="text-base font-extrabold">{m}</span>
                      <span className="text-xs font-normal text-current/80">menit</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sektor Aksesibilitas & Grafis */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-base font-bold text-gray-800 mb-5">👁️ Aksesibilitas & Tampilan</h3>

              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Tampilan Mode</p>
                  <p className="text-xs text-gray-400">Alihkan tema visual aplikasi</p>
                </div>
                <div className="flex gap-1 bg-gray-100 p-1 rounded-xl shrink-0">
                  <button
                    onClick={() => setDarkMode(false)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${!darkMode ? "bg-white text-blue-800 shadow-sm font-bold" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    ☀️ Terang
                  </button>
                  <button
                    onClick={() => setDarkMode(true)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${darkMode ? "bg-white text-blue-800 shadow-sm font-bold" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    🌙 Gelap
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700">Kecepatan Video Isyarat</p>
                <p className="text-xs text-gray-400 mb-3">Kecepatan putar default video demonstrasi</p>
                <div className="flex gap-2">
                  {(["0.5x", "1.0x", "1.5x"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setVideoSpeed(s)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all duration-150 active:scale-95 ${
                        videoSpeed === s
                          ? "bg-blue-800 text-white border-blue-800 shadow-sm"
                          : "bg-white text-gray-500 border-gray-200 hover:border-blue-800 hover:text-blue-800 hover:bg-blue-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Putar Ulang Otomatis Video</p>
                  <p className="text-xs text-gray-400">Pengulangan terus-menerus demo isyarat</p>
                </div>
                <button
                  onClick={() => setAutoLoop(!autoLoop)}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 shrink-0 ${autoLoop ? "bg-blue-800" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${autoLoop ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* BARIS 5: Tombol Keluar Transparan & Sangat Bulat (Full Width) */}
          <div className="w-full flex flex-col items-center justify-center pt-4 animate-fade-up-delay-4">
            <Link href="/homepage" className="w-full bg-red-600/10 hover:bg-red-600/20 text-red-600 text-sm font-bold py-3.5 rounded-3xl transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Keluar / Log out
            </Link>
            <p className="text-[10px] text-gray-300 font-semibold mt-4 tracking-wider uppercase">IsyaratKu v1.0</p>
          </div>

        </div>
      </div>

      {/* Pop-up Modal Panel Edit Profil */}
      {showEditModal && (
        <div
          className={`fixed top-20 left-64 right-0 bottom-0 z-50 flex items-center justify-center px-4 bg-gray-900/20 ${
            isClosing ? "animate-backdrop-out" : "animate-backdrop-in"
          }`}
          onClick={handleCloseEditModal}
        >
          <div
            className={`select-none bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 relative ${
              isClosing ? "animate-modal-out" : "animate-modal-in"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bagian Kepala Modal */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-lg font-black text-gray-800">Edit Profil</h3>
                <p className="text-xs text-gray-400 mt-0.5">Perbarui informasi personal dan foto profil Anda.</p>
              </div>
              <button 
                onClick={handleCloseEditModal}
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 text-sm hover:bg-gray-100 transition active:scale-95"
              >
                ✕
              </button>
            </div>

            {/* Pilihan Foto Profile */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-blue-800 overflow-hidden ring-4 ring-gray-100 shadow-inner">
                  <img
                    src="/profilanon1.jpeg"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=Teman+Dengar&background=1e3a8a&color=fff&size=128";
                    }}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-7 h-7 bg-blue-800 rounded-full border-2 border-white flex items-center justify-center text-white text-xs shadow-md">
                  📷
                </div>
              </div>
              <button className="text-xs font-bold text-blue-800 hover:underline mt-1">Ubah Foto</button>
            </div>

            {/* Isian Form Lapisan Data */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
                <input
                  type="text"
                  value="Teman Dengar"
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  maxLength={160}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-800"
                />
                <p className="text-[10px] text-gray-300 text-right mt-1 font-medium">Maksimal 160 karakter</p>
              </div>
            </div>

            {/* Tombol Aksi Modal */}
            <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100">
              <button 
                onClick={handleCloseEditModal}
                className="px-5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition active:scale-95"
              >
                Batal
              </button>
              <button 
                onClick={handleCloseEditModal}
                className="px-5 py-2 rounded-xl bg-blue-800 text-white text-xs font-bold hover:bg-blue-900 transition active:scale-95 flex items-center gap-1.5 shadow-sm"
              >
                Simpan Perubahan 
                <span className="text-xs">✓</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Pop-up Modal Konfirmasi Pengalihan Rute BISINDO */}
      {showBisindoModal && (
        <div
          className={`fixed top-20 left-64 right-0 bottom-0 z-50 flex items-center justify-center px-4 bg-gray-900/20 ${
            isBisindoClosing ? "animate-backdrop-out" : "animate-backdrop-in"
          }`}
          onClick={handleCloseBisindoModal}
        >
          <div
            className={`select-none bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 relative ${
              isBisindoClosing ? "animate-modal-out" : "animate-modal-in"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Isi Konten Modal */}
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center text-xl mx-auto mb-4 font-bold">
                ❓
              </div>
              <h3 className="text-base font-extrabold text-gray-800 px-2">
                Mau pindah belajar bahasa BISINDO?
              </h3>
              <p className="text-xs text-gray-400 mt-2 px-4 leading-relaxed">
                Fokus belajar Anda akan dialihkan secara langsung ke modul halaman utama sistem isyarat BISINDO.
              </p>
            </div>

            {/* Tombol Aksi Konfirmasi */}
            <div className="flex gap-3 pt-4 mt-2 border-t border-gray-50">
              <button 
                onClick={handleCloseBisindoModal}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmBisindo}
                className="flex-1 py-2.5 rounded-xl bg-blue-800 text-white text-xs font-bold hover:bg-blue-900 transition active:scale-95 shadow-sm"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}