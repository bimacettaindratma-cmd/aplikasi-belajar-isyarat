"use client"

import { useState } from "react"
import type { KosakatItem } from "./kamuscard"
import Link from "next/link"

type KamusModalProps = {
  item: KosakatItem | null
  onClose: () => void
  liked: boolean
  onToggleLike: () => void
}

export default function KamusModal({ item, onClose, liked, onToggleLike }: KamusModalProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 200)
  }

  if (!item) return null

  return (
    // top-20 = tinggi topbar (h-20), left-64 = lebar sidebar (w-64) dari layout.tsx
    // sama seperti pola modal di halaman Alfabet, supaya backdrop gak nutup sidebar/topbar
    <div
      key={item.id}
      className={`fixed top-20 left-64 right-0 bottom-0 z-50 flex items-center justify-center px-4 bg-gray-900/10 ${
        isClosing ? "animate-backdrop-out" : "animate-backdrop-in"
      }`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-sm bg-white rounded-3xl shadow-2xl shadow-gray-200/80 border border-gray-100 overflow-hidden ${
          isClosing ? "animate-modal-out" : "animate-modal-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header actions */}
        <div className="flex items-center justify-between px-5 pt-5 pb-1">
          <button
            onClick={onToggleLike}
            className={`flex items-center gap-1.5 text-sm font-semibold transition ${
              liked ? "text-rose-500" : "text-gray-500 hover:text-rose-500"
            }`}
          >
            <span className="text-base">{liked ? "♥" : "♡"}</span>
            <span className="select-none">{liked ? "Favorit" : "Tambah Favorit"}</span>
          </button>
          <button
            onClick={handleClose}
            className="select-none w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition text-xs"
          >
            ✕
          </button>
        </div>

        {/* Emoji box */}
        <div className="select-none mx-5 mt-3 flex justify-center py-7 text-7xl bg-blue-50 rounded-2xl">
          {item.emoji}
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-5">
          <h2 className="select-none text-xl font-extrabold text-gray-900 mb-1">{item.title}</h2>
          <p className="select-none text-sm text-gray-500 leading-relaxed mb-5">{item.description}</p>

          {/* Steps */}
          <p className="select-none text-[11px] font-bold text-blue-600 uppercase tracking-wide mb-3">Langkah-langkah</p>
          <ol className="space-y-2 mb-5">
            {item.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="select-none w-5 h-5 rounded-full bg-blue-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="select-none text-sm text-gray-600 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>

          {/* CTA */}
          <Link 
            href={`/SIBI/kamus/${item.id}`} 
            className="block text-center select-none w-full py-3 rounded-xl bg-blue-800 text-white font-bold text-sm hover:bg-blue-900 shadow-md shadow-blue-100 transition"
          >
            🎬 Tonton Video
          </Link>
        </div>
      </div>
    </div>
  )
}