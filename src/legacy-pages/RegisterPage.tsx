import { RegisterForm } from '../features/auth/RegisterForm'

export function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f1ff] px-4 pb-16 pt-28">
      {/* Left soft organic mesh orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-1/4 h-[420px] w-[420px] -translate-y-1/4 rounded-full bg-gradient-to-tr from-[#a855f7]/45 via-[#6366f1]/30 to-[#fde68a]/35 blur-[85px]"
      />

      {/* Top-right subtle sky/indigo glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-16 h-[320px] w-[320px] rounded-full bg-gradient-to-bl from-[#818cf8]/35 via-[#c4b5fd]/30 to-transparent blur-[75px]"
      />

      {/* Bottom-right vibrant mesh orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-[480px] w-[520px] rounded-full bg-gradient-to-tl from-[#4f46e5]/65 via-[#9333ea]/55 to-[#ec4899]/40 blur-[90px]"
      />

      {/* Geometric minimalist radial burst ornament */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute bottom-10 right-10 hidden h-36 w-36 text-[#181824]/75 md:block lg:bottom-14 lg:right-20 lg:h-40 lg:w-40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="88,18 100,62 112,18" />
        <polyline points="88,182 100,138 112,182" />
        <polyline points="18,88 62,100 18,112" />
        <polyline points="182,88 138,100 182,112" />
        <polyline points="34,50 72,74 50,34" />
        <polyline points="166,50 128,74 150,34" />
        <polyline points="34,150 72,126 50,166" />
        <polyline points="166,150 128,126 150,166" />
      </svg>

      <div className="relative z-10 w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  )
}
