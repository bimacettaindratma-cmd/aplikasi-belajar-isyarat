"use client"

import type { AlphabetItem } from "./page"

type Props = {
  item: AlphabetItem
  isClosing: boolean
  onClose: () => void
}

export default function AlfabetDetail({ item, isClosing, onClose }: Props) {
  return (
    // top-20 = tinggi topbar (h-20), left-64 = lebar sidebar (w-64) dari layout.tsx
    // Dengan fixed + offset ini, backdrop selalu pas nutup area konten saja,
    // gak peduli konten halaman pendek/panjang, gak ikut nutup sidebar/topbar.
    <div
      className={`fixed top-20 left-64 right-0 bottom-0 z-50 flex items-center justify-center px-4 bg-gray-900/20 ${
        isClosing ? "animate-backdrop-out" : "animate-backdrop-in"
      }`}
      onClick={onClose}
    >
      <div
        className={`select-none bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 relative ${
          isClosing ? "animate-modal-out" : "animate-modal-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center py-6 text-7xl bg-blue-50 rounded-2xl mb-5">
          {item.emoji}
        </div>

        <p className="text-3xl font-extrabold text-blue-600 text-center mb-1">{item.label}</p>
        <p className="text-sm text-amber-500 font-medium text-center mb-4">{item.sublabel}</p>
        <p className="select-text text-sm text-gray-500 leading-relaxed text-center mb-5">
          {item.description}
        </p>

        <div className="mb-6">
          <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Langkah-langkah</p>
          <ol className="space-y-2">
            {item.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="select-text text-sm text-gray-600 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <button
          onClick={onClose}
          className="select-none w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
        >
          ✓ Selesai
        </button>
      </div>
    </div>
  )
}