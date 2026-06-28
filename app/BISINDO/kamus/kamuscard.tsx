"use client"

export type Difficulty = "Mudah" | "Menengah" | "Sulit"

export type KosakatItem = {
  id: string // 🌟 DIUBAH: Dari 'number' menjadi 'string' agar bisa menerima slug teks
  emoji: string
  title: string
  description: string
  difficulty: Difficulty
  category: string
  mastered?: boolean
  liked?: boolean
  steps: string[]
}

type KamusCardProps = {
  item: KosakatItem
  onPlay: (item: KosakatItem) => void
  liked: boolean
  onToggleLike: (id: string) => void // 🌟 DIUBAH: Dari 'number' menjadi 'string'
}

export default function KamusCard({ item, onPlay, liked, onToggleLike }: KamusCardProps) {
  const difficultyStyle: Record<Difficulty, string> = {
    Mudah: "bg-emerald-100 text-emerald-700",
    Menengah: "bg-amber-100 text-amber-700",
    Sulit: "bg-rose-100 text-rose-700",
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition hover:scale-[1.02] duration-200 flex flex-col gap-3 relative">
      {item.mastered && (
        <div className="select-none absolute top-3 left-3 flex items-center gap-1 bg-teal-50 border border-teal-200 text-teal-600 text-[10px] font-bold px-2 py-0.5 rounded-full justify-center">
          <span className="w-1 h-1 rounded-full bg-teal-500 inline-block"></span>
          Terkuasai
        </div>
      )}

      <button
        onClick={() => onToggleLike(item.id)}
        className={`select-none absolute top-3 right-3 transition text-lg ${
          liked ? "text-rose-500" : "text-gray-300 hover:text-rose-400"
        }`}
      >
        {liked ? "♥" : "♡"}
      </button>

      <div className="select-none flex justify-center pt-5 pb-1 text-5xl">
        {item.emoji}
      </div>

      <div className="text-center">
        <p className="select-none font-bold text-gray-900 text-sm">{item.title}</p>
        <p className="select-none text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{item.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-1">
        <span className={`select-none text-[11px] font-semibold px-2.5 py-1 rounded-full ${difficultyStyle[item.difficulty]}`}>
          {item.difficulty}
        </span>
        <button
          onClick={() => onPlay(item)}
          className="select-none w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition text-xs"
        >
          ▶
        </button>
      </div>
    </div>
  )
}