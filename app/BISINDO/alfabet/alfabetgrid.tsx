"use client"

import  { AlphabetItem } from "./page"

type Props = {
  items: AlphabetItem[]
  selectedLabel: string | null
  onSelect: (item: AlphabetItem) => void
}

export default function AlfabetGrid({ items, selectedLabel, onSelect }: Props) {
  return (
    <div
      className="select-none grid gap-3"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))" }}
    >
      {items.map((item) => {
        const isSelected = selectedLabel === item.label
        return (
          <button
            key={item.label}
            onClick={() => onSelect(item)}
            className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition hover:scale-105 duration-150 ${
              isSelected ? "bg-teal-50 ring-2 ring-teal-400" : "hover:bg-gray-50"
            }`}
          >
            <div className="w-full aspect-square rounded-2xl bg-teal-50 flex items-center justify-center text-3xl">
              {item.emoji}
            </div>
            <span className={`text-sm font-bold ${isSelected ? "text-teal-600" : "text-gray-600"}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}