import Link from "next/link"

// Data ikon tangan dekoratif tersebar di background
const decorativeHands = [
  { emoji: "🤟", top: "8%", left: "5%", size: "text-4xl", rotate: "-12deg" },
  { emoji: "🖐️", top: "15%", left: "88%", size: "text-3xl", rotate: "10deg" },
  { emoji: "✋", top: "30%", left: "3%", size: "text-2xl", rotate: "5deg" },
  { emoji: "👌", top: "45%", left: "92%", size: "text-4xl", rotate: "-8deg" },
  { emoji: "🤘", top: "60%", left: "6%", size: "text-3xl", rotate: "15deg" },
  { emoji: "✌️", top: "70%", left: "90%", size: "text-2xl", rotate: "-5deg" },
  { emoji: "🤙", top: "85%", left: "8%", size: "text-3xl", rotate: "8deg" },
  { emoji: "👋", top: "80%", left: "85%", size: "text-4xl", rotate: "-10deg" },
  { emoji: "🤟", top: "5%", left: "45%", size: "text-2xl", rotate: "20deg" },
  { emoji: "🖐️", top: "92%", left: "50%", size: "text-2xl", rotate: "-15deg" },
]

export default function PilihBahasaPage() {
  return (
    <div className="relative h-screen flex flex-col overflow-hidden bg-linear-to-br from-emerald-100 via-white to-teal-100">

      {/* DECORATIVE BACKGROUND ICONS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {decorativeHands.map((hand, i) => (
          <span
            key={i}
            className={`absolute select-none animate-float-badge-streak float-delay-${i} ${hand.size}`}
            style={{
              top: hand.top,
              left: hand.left,
              transform: `rotate(${hand.rotate})`,
              opacity: 10
            }}
          >
            {hand.emoji}
          </span>
        ))}
      </div>

      {/* NAVBAR */}
      <header className="relative z-10 shrink-0 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center gap-4">
          <Link
            href="/homepage"
            className="shrink-0 w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:scale-125 transition duration-200 flex items-center justify-center"
          >
            <img src="/back icon.svg" alt="back" className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <img src="/IsyaratKu.png" alt="IsyaratKu Logo" className="w-8 h-8 object-contain"/>
            <span className="font-bold text-teal-600 text-lg">IsyaratKu</span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="relative z-10 flex-1 flex flex-col max-w-5xl w-full mx-auto px-6 lg:px-10 pt-6 pb-4 overflow-hidden">

        {/* Heading */}
        <div className="animate-fade-in text-center mb-10">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
            Pilih Bahasa Isyarat yang Ingin Dipelajari
          </h1>
          <p className="text-gray-500 text-sm">
            Kamu bisa berganti jalur kapan saja setelah memulai
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* SIBI Card */}
          <div className="fade-in-left flex flex-col h-120 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-200/60 transition duration-300 hover:scale-105">
            <div className="bg-indigo-50 px-8 pt-7 pb-6 text-center">
              <p className="text-4xl mb-3">👌</p>
              <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                SIBI
              </span>
              <h3 className="font-bold text-gray-900 text-lg">Sistem Isyarat Bahasa Indonesia</h3>
            </div>

            <div className="flex-1 flex flex-col px-8 py-6">
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Bahasa isyarat resmi yang dikembangkan pemerintah Indonesia, berdasarkan struktur Bahasa Indonesia. Ideal untuk komunikasi formal dan pendidikan.
              </p>

              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-blue-600">✓</span> Diakui secara resmi
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-blue-600">✓</span> Berbasis Bahasa Indonesia
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-blue-600">✓</span> Cocok untuk lingkungan formal
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-blue-600">✓</span> 200+ pelajaran tersedia
                </li>
              </ul>
              <Link
                href="/SIBI/beranda"
                className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-1.5 transition mt-auto"
              >
                Mulai Belajar SIBI <span>›</span>
              </Link>
            </div>
          </div>

          {/* BISINDO Card */}
          <div className="fade-in-right flex flex-col h-120 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-200/60 transition duration-300 hover:scale-105">
            <div className="bg-emerald-50 px-8 pt-7 pb-6 text-center">
              <p className="text-4xl mb-3">🤟</p>
              <span className="inline-block bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                BISINDO
              </span>
              <h3 className="font-bold text-gray-900 text-lg">Bahasa Isyarat Indonesia</h3>
            </div>

            <div className="flex-1 flex flex-col px-8 py-6">
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Bahasa isyarat alami yang tumbuh organik di komunitas Tuli Indonesia. Lebih ekspresif dan kaya nuansa budaya Tuli nusantara.
              </p>

              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-teal-600">✓</span> Lahir dari komunitas Tuli
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-teal-600">✓</span> Ekspresif & natural
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-teal-600">✓</span> Cocok untuk komunikasi sehari-hari
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-teal-600">✓</span> 180+ pelajaran tersedia
                </li>
              </ul>

              <Link href="/BISINDO/beranda" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-1.5 transition mt-auto">
                Mulai Belajar BISINDO <span>›</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}