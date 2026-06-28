"use client"
import { ReactNode } from "react"
import Link from "next/link" // Menggunakan Link dari Next.js agar tidak hard-reload
import { usePathname } from "next/navigation" // Hook untuk mendeteksi rute aktif secara instan
import {
  IconHome, IconMap, IconBook, IconLetterCase,
  IconTrophy, IconAward, IconUser, IconFlame, IconBell,
} from "@tabler/icons-react"

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex select-none">

      {/* SIDEBAR BAR */}
      <aside className="w-64 gap-6 h-screen bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="flex flex-col gap-4 px-6 py-6">
          <div className="flex gap-2 items-center">
            <img src="/IsyaratKu.png" className="w-10 h-10" alt="Logo" />
            <h1 className="text-xl font-extrabold text-teal-600">IsyaratKu</h1>
          </div>
          <div className="flex bg-teal-100 rounded-2xl border border-teal-500 p-2 w-30 items-center justify-center">
            <p className="text-teal-500 text-xs font-bold">BISINDO Path</p>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-4 space-y-1.5">
          <SidebarItem icon={IconHome} label="Beranda" href="/BISINDO/beranda" />
          <SidebarItem icon={IconMap} label="Materi" href="/BISINDO/materi" />
          <SidebarItem icon={IconBook} label="Kamus" href="/BISINDO/kamus" />
          <SidebarItem icon={IconLetterCase} label="Alfabet & Angka" href="/BISINDO/alfabet" />
          <SidebarItem icon={IconTrophy} label="Quiz" href="/BISINDO/quiz" />
          <SidebarItem icon={IconAward} label="Pencapaian" href="/BISINDO/pencapaian" />
        </nav>

        {/* Menu Profil di Bagian Bawah */}
        <div className="px-4 pb-6">
          <SidebarItem icon={IconUser} label="Profil" href="/BISINDO/profil" />
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <div className="h-screen flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-end gap-4 px-8 shrink-0">
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 bg-teal-50 text-teal-600 text-sm font-semibold px-3 py-1.5 rounded-full">
              <IconFlame size={16} className="fill-teal-600" /> 7 Days
            </span>
            <button className="relative w-9 h-9 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500">
              <IconBell size={20} />
            </button>
            <Link href="/BISINDO/profil" className="inline-block transition hover:opacity-80">
              <img 
                src="/profile1.jpg" 
                alt="Avatar" 
                className="w-9 h-9 rounded-full object-cover border-2 border-[#037c6e]" 
              />
            </Link>
          </div>
        </header>

        {/* Area Halaman Anak ({children}) */}
        <main className="overflow-y-auto flex-1 scrollbar-gutter-stable">
          {children}
        </main>
      </div>

    </div>
  )
}

/* KOMPONEN ITEM MENU SIDEBAR */

function SidebarItem({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType
  label: string
  href: string
}) {
  const pathname = usePathname()
  
  const isActive = pathname === href || pathname.startsWith(href + "/")

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
        isActive
          ? "bg-teal-100 text-teal-600 font-semibold"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      }`}
    >
      <Icon size={19} stroke={2} />
      {label}
    </Link>
  )
}