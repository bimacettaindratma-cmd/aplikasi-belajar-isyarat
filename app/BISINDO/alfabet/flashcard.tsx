"use client"

import { useState } from "react"
import type { AlphabetItem } from "./page"

type Props = {
  items: AlphabetItem[]
}

export default function FlashCard({ items }: Props) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(items.length - 1, i + 1))

  const current = items[index]

  return (
    <div className="select-none flex flex-col items-center gap-6">
      {/* Card */}
      <div className="w-full max-w-sm border-2 border-teal-300 rounded-3xl bg-white shadow-lg shadow-teal-100 flex flex-col items-center py-10 px-8 gap-4">
        <span className="text-8xl">{current.emoji}</span>
        <p className="text-5xl font-extrabold text-teal-600">{current.label}</p>
        <p className="text-sm text-amber-500 font-medium">{current.sublabel}</p>

        {/* Langkah-langkah singkat */}
        <div className="w-full mt-2 pt-4 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 text-center">
            Cara melakukan
          </p>
          <ol className="space-y-1.5">
            {current.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="select-text text-sm text-gray-600 leading-relaxed text-left">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          disabled={index === 0}
          className="select-none px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          ← Sebelumnya
        </button>

        <span className="select-none text-sm font-semibold text-gray-500 min-w-12 text-center">
          {index + 1}/{items.length}
        </span>

        <button
          onClick={next}
          disabled={index === items.length - 1}
          className="select-none px-5 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          Berikutnya →
        </button>
      </div>
    </div>
  )
}