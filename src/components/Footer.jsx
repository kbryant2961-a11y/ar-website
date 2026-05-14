import { GridPattern } from '@/components/GridPattern'

export function Footer() {
  return (
    <footer className="relative bg-[#fff8f5] pt-5 pb-20 sm:pt-14 sm:pb-32">
      <div className="absolute inset-x-0 top-0 h-32 mask-[linear-gradient(white,transparent)] text-[#2a1722]/10">
        <GridPattern x="50%" />
      </div>
      <div className="relative text-center text-sm text-slate-600">
        <p>
          Copyright &copy; {new Date().getFullYear()} A&R Asset Recovery Team,
          LLC
        </p>
        <p>5284 Floyd Rd SW #1025, Mableton, GA 30126</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  )
}
