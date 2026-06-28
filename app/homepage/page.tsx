"use client"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState("Halo")
  return (
    <div className="bg-linear-to-brfrom-emerald-50 via-white to-teal-50 overflow-y-auto select-none">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/IsyaratKu.png" alt="IsyaratKu Logo" className="w-8 h-8 object-contain"/>
            <span className="font-bold text-teal-600 text-lg">IsyaratKu</span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600 font-medium">
            <a href="#fitur" className="hover:text-gray-900">Fitur</a>
            <a href="#tentang" className="hover:text-gray-900">Tentang</a>
            <a href="#" className="hover:text-gray-900">Komunitas</a>
          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/loginpage"
              className="px-5 py-2 rounded-full border border-teal-600 text-teal-600 text-sm font-semibold hover:bg-teal-50 transition"
            >
              Sign In
            </Link>
            <Link
              href="/loginpage?mode=register"
              className="px-5 py-2 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-brfrom-teal-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left column */}
          <div>
            {/* Headline */}
            <h1 className="fade-in-left delay-0 text-[2.85rem] lg:text-[3.1rem] leading-[1.12] font-extrabold text-gray-900 mb-6">
              Belajar Bahasa<br />
              Isyarat dengan<br />
              <span className="text-teal-600">Mudah</span> dan<br />
              <span className="text-[#0284C7]">Menyenangkan</span>
            </h1>

            {/* Description */}
            <p className="fade-in-left delay-1 text-gray-500 text-base leading-relaxed max-w-md mb-8">
              Pilih jalur <span className="font-semibold text-gray-700">SIBI</span> atau <span className="font-semibold text-gray-700">BISINDO</span> dan mulai belajar melalui latihan interaktif. Tersedia untuk semua kalangan, gratis selamanya.
            </p>

            {/* CTA Buttons */}
            <div className="fade-in-left delay-2 flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/pilihbahasa"
                className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-xl bg-teal-600 text-white font-semibold text-sm shadow-md shadow-teal-200 hover:bg-teal-700 transition hover:scale-105 duration-200 active:scale-95"
              >
                Mulai Belajar
                <span>›</span>
              </Link>
            </div>

            {/* Social proof */}
            <div className="fade-in-left delay-3 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">A</div>
                <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">B</div>
                <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">C</div>
                <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">D</div>
                <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">E</div>
              </div>
              <span className="text-sm font-semibold text-gray-700">50.000+ pelajar bergabung</span>
            </div>
          </div>

          {/* Right column: app preview card */}
          <div className="animate-fade-in relative flex justify-center lg:justify-end">

            {/* Streak badge */}
            <div className="animate-float-badge-streak absolute -top-6 right-8 lg:right-8 bg-white rounded-2xl shadow-lg px-4 py-2.5 z-20 flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div className="leading-tight">
                <p className="text-xs font-bold text-gray-800">7 Hari</p>
                <p className="text-[11px] text-gray-400">Streak!</p>
              </div>
              <span className="ml-1 bg-indigo-100 text-teal-600 text-[10px] font-bold px-1.5 py-0.5 rounded">+10 XP</span>
            </div>

            {/* Main card */}
            <div className="animate-float-card bg-white rounded-3xl shadow-xl shadow-gray-200/70 w-full max-w-md p-6 relative z-10">

              {/* Lesson header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-lg">
                  👋
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Pelajaran: Salam</p>
                  <p className="text-xs text-gray-400">SIBI · Modul 1</p>
                </div>
              </div>

              {/* Gesture preview box */}
              <div className="bg-gray-50 rounded-2xl py-9 px-6 text-center mb-5">
                <div className="text-6xl mb-3">🤟</div>
                <p className="font-bold text-gray-900 text-base mb-1">Halo</p>
                <p className="text-xs text-gray-400">Isyarat untuk menyapa</p>
              </div>

              {/* Question */}
              <p className="text-sm font-semibold text-gray-700 mb-3">Apa arti dari isyarat ini?</p>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  onClick={() => setSelectedOption("Halo")}
                  className={`text-sm font-semibold rounded-xl py-3 transition ${
                    selectedOption === "Halo"
                      ? "border-2 border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border border-gray-200 text-gray-600 font-medium hover:border-gray-300"
                  }`}
                >
                  Halo
                </button>

                <button
                  onClick={() => setSelectedOption("Terima Kasih")}
                  className={`text-sm font-semibold rounded-xl py-3 transition ${
                    selectedOption === "Terima Kasih"
                      ? "border-2 border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border border-gray-200 text-gray-600 font-medium hover:border-gray-300"
                  }`}
                >
                  Terima Kasih
                </button>

                <button
                  onClick={() => setSelectedOption("Selamat Pagi")}
                  className={`text-sm font-semibold rounded-xl py-3 transition ${
                    selectedOption === "Selamat Pagi"
                      ? "border-2 border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border border-gray-200 text-gray-600 font-medium hover:border-gray-300"
                  }`}
                >
                  Selamat Pagi
                </button>

                <button
                  onClick={() => setSelectedOption("Maaf")}
                  className={`text-sm font-semibold rounded-xl py-3 transition ${
                    selectedOption === "Maaf"
                      ? "border-2 border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border border-gray-200 text-gray-600 font-medium hover:border-gray-300"
                  }`}
                >
                  Maaf
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/5 bg-teal-600 rounded-full"></div>
                </div>
                <span className="text-xs font-semibold text-gray-400">3/5</span>
              </div>
            </div>

            {/* Level badge */}
            <div className="animate-float-badge-streak absolute -bottom-7 -left-4 lg:left-28 bg-white rounded-2xl shadow-lg px-4 py-2.5 z-20 flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <div className="leading-tight">
                <p className="text-xs font-bold text-gray-800">Level 5</p>
                <p className="text-[11px] text-amber-500 font-medium">1.240 XP</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-3 text-center divide-x divide-gray-100">
          <div>
            <p className="text-3xl font-extrabold text-indigo-600">500+</p>
            <p className="text-sm text-gray-500 mt-1">Total Pelajaran</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-500">50.000+</p>
            <p className="text-sm text-gray-500 mt-1">Pelajar Aktif</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-orange-500">2.000+</p>
            <p className="text-sm text-gray-500 mt-1">Kosakata</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-linear-to-br from-emerald-50 via-white to-teal-50 py-20 scroll-mt-13" id="fitur">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Semua yang kamu butuhkan untuk belajar
            </h2>
            <p className="text-gray-500 text-sm">
              Fitur lengkap dirancang khusus untuk pengalaman belajar isyarat terbaik
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition hover:scale-105 duration-200">
              <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-xl mb-4">📖</div>
              <h3 className="font-bold text-gray-900 mb-2">Materi</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Kurikulum terstruktur dari dasar hingga mahir untuk SIBI & BISINDO</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition hover:scale-105 duration-200">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-xl mb-4">🎮</div>
              <h3 className="font-bold text-gray-900 mb-2">Quiz</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Latihan seru dengan berbagai tipe soal dan feedback langsung</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition hover:scale-105 duration-200">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-xl mb-4">📔</div>
              <h3 className="font-bold text-gray-900 mb-2">Kamus Isyarat</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Ribuan kosakata dengan video demonstrasi berkualitas tinggi</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition hover:scale-105 duration-200">
              <p className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center text-2xl mb-4 text-black"> a </p>
              <h3 className="font-bold text-gray-900 mb-2">Alfabet & Angka</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Pelajari alfabet dan angka dalam isyarat</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition hover:scale-105 duration-200">
              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-xl mb-4">🏆</div>
              <h3 className="font-bold text-gray-900 mb-2">Pencapaian</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Raih achievement dan pamerkan pencapaianmu kepada dunia</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition hover:scale-105 duration-200">
              <div className="w-11 h-11 rounded-xl bg-cyan-100 flex items-center justify-center text-xl mb-4">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">Lacak Progres</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Pantau perkembanganmu dengan grafik dan analitik lengkap</p>
            </div>
          </div>
        </div>
      </section>

{/* TENTANG KAMI */}
      <section className="bg-linear-to-br from-emerald-50 via-white to-teal-50 bg-white py-20 scroll-mt-13" id="tentang">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          {/* Bagian Atas: Deskripsi & Visi */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            
            {/* Kolom Kiri: Teks */}
            <div>
              <p className="text-teal-600 font-bold text-xs tracking-widest uppercase mb-3">
                Tentang Kami
              </p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Mengenal Lebih Dekat IsyaratKu
              </h2>
              <p className="text-gray-500 text-md leading-relaxed mb-8 text-justify">
                IsyaratKu lahir dari keinginan mendalam untuk meruntuhkan batasan komunikasi yang seringkali memisahkan kita. Kami berdedikasi penuh untuk menciptakan ekosistem pembelajaran yang inklusif, di mana setiap individu memiliki kesempatan yang sama untuk memahami dan dipahami. Melalui inovasi teknologi dan kurikulum yang adaptif, kami terus berupaya menjadikan bahasa isyarat sebagai jembatan empati yang menghubungkan teman tuli dan teman dengar di seluruh penjuru Indonesia.
              </p>

              {/* Kotak Visi */}
              <div className="bg-white border-l-4 border-teal-600 p-6 rounded-r-2xl shadow-md shadow-gray-400">
                <p className="text-teal-700 text-xs font-bold tracking-widest uppercase mb-2">
                  Visi
                </p>
                <p className="text-gray-900 font-bold text-lg italic leading-relaxed">
                  "Menjadi platform belajar bahasa isyarat Indonesia yang nyaman dan seru untuk semua."
                </p>
              </div>
            </div>

            {/* Kolom Kanan: Gambar Overlapping (Placeholder) */}
            <div className="relative h-87.5 lg:h-100 flex justify-center items-center mt-10 lg:mt-0">
              {/* Gambar Belakang Atas */}
              <div className="absolute top-0 right-0 lg:right-4 w-3/4 h-56 lg:h-64 bg-gray-100 rounded-2xl shadow-lg border-4 border-white flex items-center justify-center overflow-hidden z-10">
                <img src="/laptup.png" className="w-full h-full object-cover" />
              </div>
              {/* Gambar Depan Bawah */}
              <div className="absolute bottom-0 left-0 lg:left-4 w-3/4 h-56 lg:h-64 bg-gray-100 rounded-2xl shadow-xl border-4 border-white flex items-center justify-center overflow-hidden z-20">
              <img src="/hijau.png" alt="Backgroundku" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Bagian Bawah: Tim Pengembang */}
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-10">
              Tim Pengembang
            </h3>
            
            <div className="flex flex-wrap justify-center gap-28">
              {/* Card Bima */}
              <div className="bg-white rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-3 border-red-100 py-10 px-16 flex flex-col items-center hover:-translate-y-1 transition duration-300 w-full sm:w-80">
                <div className="w-35 h-35 bg-gray-200 rounded-full mb-20 flex items-center justify-center overflow-hidden border-4 border-red-300 shadow-2 shadow-red-100">
                  <img src="/mario.png"/>
                </div>
                <h4 className="font-bold text-gray-900 text-2xl mb-1">Bima Cetta Indratma</h4>
                <p className="text-lg text-gray-500 mb-6">Full-stack Developer</p>
                <div className="flex items-center gap-4 text-teal-600 text-lg">
                  <a href="#" className="hover:text-teal-800 transition">🔗</a>
                  <a href="#" className="hover:text-teal-800 transition">✉️</a>
                </div>
              </div>

              {/* Card Koko */}
              <div className="bg-white rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-3 border-green-100 py-10 px-16 flex flex-col items-center hover:-translate-y-1 transition duration-300 w-full sm:w-80">
                <div className="w-35 h-35 bg-gray-200 rounded-full mb-20 flex items-center justify-center overflow-hidden border-4 border-green-300 shadow-2 shadow-green-100">
                  <img src="/luigi.png"/>
                </div>
                <div className="gap-4">
                  <h4 className="font-bold text-gray-900 text-2xl mb-1">Koko Anugrah Pratama</h4>
                <p className="text-lg text-gray-500 mb-6">Full-stack Developer</p>
                </div>
                <div className="flex items-center gap-4 text-teal-600 text-lg">
                  <a href="#" className="hover:text-teal-800 transition">🔗</a>
                  <a href="#" className="hover:text-teal-800 transition">✉️</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white text-sm">🤟</div>
                <span className="font-bold text-gray-900">IsyaratKu</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Platform belajar bahasa isyarat Indonesia yang inklusif dan interaktif.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">Platform</p>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-indigo-600">Harga</a></li>
                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">Dukungan</p>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-indigo-600">FAQ</a></li>
                <li><a href="#" className="hover:text-indigo-600">Kontak</a></li>
                <li><a href="#" className="hover:text-indigo-600">Komunitas</a></li>
                <li><a href="#" className="hover:text-indigo-600">Panduan</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">Legal</p>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-indigo-600">Privasi</a></li>
                <li><a href="#" className="hover:text-indigo-600">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-indigo-600">Aksesibilitas</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">© 2026 IsyaratKu. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span>🌐</span>
              <span>Bahasa Indonesia</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}