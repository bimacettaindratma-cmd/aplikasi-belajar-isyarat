"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
// ============================================
// DATA: Gambar kiri (statis)
// ============================================
const heroImage = "/images/ilustrasi-isyarat-2.png"

// Kutipan-kutipan buat card auto-slide di kanan bawah gambar
const quotes = [
  "Belajar bahasa isyarat bagaikan belajar dunia baru. Kita bisa melihat dengan mata, mendengar dengan gerakan, dan memahami dengan hati.",
  "Bahasa isyarat bukan hanya untuk Teman Tuli, tapi juga hadir bagi siapa saja yang mau peduli. Ia menyatukan kita semua tanpa harus banyak bicara.",
  "Gerakan tangan mungkin sunyi, namun pesan yang disampaikan mampu menggema lebih keras daripada suara.",
  "Mempelajari bahasa isyarat bukan sekadar menghafal gerakan, melainkan membuka pintu empati dan kesetaraan bagi sesama.",
]

export default function SignInPage() {
  const searchParams = useSearchParams()
  const initialMode = searchParams.get("mode") === "register" ? "register" : "signin"
  // mode: nentuin form mana yang aktif ("signin" atau "register")
  const [mode, setMode] = useState<"signin" | "register">(initialMode)

  // index quote yang lagi aktif
  const [quoteIndex, setQuoteIndex] = useState(0)

  // checkbox "stay signed in"
  const [staySignedIn, setStaySignedIn] = useState(false)

  // --- Sliding pill refs & state ---
  const signinBtnRef = useRef<HTMLButtonElement>(null)
  const registerBtnRef = useRef<HTMLButtonElement>(null)
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 })

  // Ukur ulang posisi & lebar tombol aktif tiap kali mode berubah
  useEffect(() => {
    const activeBtn = mode === "signin" ? signinBtnRef.current : registerBtnRef.current
    if (activeBtn) {
      setPillStyle({
        width: activeBtn.offsetWidth,
        left: activeBtn.offsetLeft,
      })
    }
  }, [mode])

  // Auto-ganti quote tiap 6 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const goToPrevQuote = () => {
    setQuoteIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))
  }

  const goToNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length)
  }

  return (
    <div className="h-screen flex overflow-hidden">

      {/* ======================================================
          KOLOM KIRI — Form Sign-in / Daftar
      ====================================================== */}
      <div className="w-full lg:w-[400px] flex-shrink-0 bg-[#EEF2FF] flex flex-col px-9 py-10 overflow-y-auto">

        {/* --- Tombol Back ke homepage --- */}
        <Link
          href="/homepage"
          className="flex-shrink-0 w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:scale-125 transition duration-200 flex items-center justify-center mb-6"
        >
          <img src="/back icon.svg" alt="back" className="w-4 h-4" />
        </Link>

        {/* --- Logo & tagline --- */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-indigo-600 mb-1.5">Isyaratku</h1>
          <p className="text-[11px] font-bold tracking-wider text-gray-500">SIGN LANGUAGE LEARNING</p>
        </div>

        {/* --- Toggle Sign-in / Daftar (Sliding Pill) --- */}
        <div className="relative flex gap-1.5 mb-7 bg-white rounded-xl p-1 border border-gray-200 w-fit">
          {/* Pill background yang geser */}
          <div
            className="absolute top-1 bottom-1 bg-gray-900 rounded-lg transition-all duration-300 ease-out"
            style={{ width: pillStyle.width, left: pillStyle.left }}
          />

          <button
            ref={signinBtnRef}
            onClick={() => setMode("signin")}
            className={`relative z-10 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${
              mode === "signin" ? "text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            ⌨ Sign-in
          </button>
          <button
            ref={registerBtnRef}
            onClick={() => setMode("register")}
            className={`relative z-10 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${
              mode === "register" ? "text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            👤 Register
          </button>
        </div>

        {/* --- FORM AREA --- */}
        {mode === "signin" ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              onClick={() => console.log("TODO: integrate Google OAuth")}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition bg-white mt-1"
            >
              <GoogleIcon />
              Masuk dengan Google
            </button>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={staySignedIn}
                onChange={(e) => setStaySignedIn(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
              />
              Stay signed in
            </label>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              onClick={() => console.log("TODO: integrate Google OAuth")}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition bg-white"
            >
              <GoogleIcon />
              Daftar dengan Google
            </button>
          </div>
        )}

        {/* --- Spacer biar footer kebawah --- */}
        <div className="flex-1 min-h-[80px]" />

        {/* --- Tombol panah submit --- */}
        <div className="flex justify-center mb-5">
          <button className="w-15 h-15 rounded-2xl bg-indigo-100 hover:bg-indigo-200  hover:scale-105 duration-200 transition flex items-center justify-center">
            <span className="text-gray-700 text-lg">→</span>
          </button>
        </div>

        {/* --- Footer kecil --- */}
        <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold tracking-wide">
          <span>CAN&apos;T SIGN IN?</span>
          <span>V1.0</span>
        </div>
      </div>

      {/* ======================================================
          KOLOM KANAN — Gambar besar + floating cards + quote slider
      ====================================================== */}
      <div className="hidden lg:block relative flex-1 overflow-hidden">

        {/* --- Gambar utama (statis) --- */}
        <Image
          src={heroImage}
          alt="Orang-orang sedang berkomunikasi dengan bahasa isyarat"
          fill
          className="object-cover select-none"
          draggable={false}
          priority
        />

        {/* --- Floating badge kecil --- */}
        <div className="select-none animate-nudge nudge-delay-0 absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2">
          <span className="text-lg">🤟</span>
          <span className="text-sm font-semibold text-gray-700">Ayo Mulai Belajar</span>
        </div>

        <div className="select-none animate-nudge nudge-delay-1 absolute top-16 right-14 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2">
          <span className="text-lg">✋</span>
          <span className="text-sm font-semibold text-gray-700">Isyaratku</span>
        </div>

        <div className="select-none animate-nudge nudge-delay-2 absolute top-28 left-80 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <span className="text-xl">🖐️</span>
        </div>

        <div className="select-none animate-nudge nudge-delay-3 absolute top-26 right-83 bg-white/90 backdrop-blur-sm rounded-xl px-3.5 py-2 shadow-lg flex items-center gap-2">
          <span className="text-base">💬</span>
          <span className="text-xs font-semibold text-gray-700">Bicara Isyarat</span>
        </div>

        {/* --- Quote card kanan bawah, auto-slide + manual control --- */}
        <div className="select-none absolute bottom-8 right-8 max-w-sm bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-5">
          <p className="text-sm text-gray-700 leading-relaxed italic">
            &ldquo;{quotes[quoteIndex]}&rdquo;
          </p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-1.5">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIndex(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === quoteIndex ? "w-6 bg-indigo-500" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevQuote}
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs text-gray-500 hover:bg-gray-50 transition"
              >
                ‹
              </button>
              <button
                onClick={goToNextQuote}
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs text-gray-500 hover:bg-gray-50 transition"
              >
                ›
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ============================================
// COMPONENT: Icon Google (SVG inline)
// ============================================
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.96v2.33A8.997 8.997 0 009 18z"/>
      <path fill="#FBBC05" d="M3.95 10.71A5.41 5.41 0 013.68 9c0-.59.1-1.17.27-1.71V4.96H.96A8.997 8.997 0 000 9c0 1.45.35 2.83.96 4.04l2.99-2.33z"/>
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A8.997 8.997 0 00.96 4.96l2.99 2.33C4.66 5.16 6.65 3.58 9 3.58z"/>
    </svg>
  )
}