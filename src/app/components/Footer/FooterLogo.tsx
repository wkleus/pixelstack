import Image from 'next/image'
import Link from 'next/link'
const FooterLogo = () => {
  return (
    <div className="mt-5 flex flex-col items-center md:mb-0">
      <Link href="/">
        <div className="relative h-20 w-32">
          <Image
            src="/logos/logo-pixelstack.png"
            alt="logo"
            fill
            sizes="auto"
            className="object-contain brightness-40 dark:brightness-60"
          />
        </div>
      </Link>

      <p className="text-secondary my-3 text-sm">
        © {new Date().getFullYear()} PixelStack&trade; Webfolio. All rights
        reserved.
      </p>

      <div className="mb-3 flex items-center gap-3">
        <Link
          href="/imprint"
          className="text-[11px] text-cyan-500 opacity-70 hover:opacity-90"
        >
          Imprint
        </Link>
        <span className="text-[11px] text-cyan-500 opacity-70 hover:opacity-90">
          |
        </span>
        <Link
          href="/admin/login"
          className="text-[11px] text-cyan-500 opacity-70 hover:opacity-90"
        >
          Admin
        </Link>
      </div>
    </div>
  )
}

export default FooterLogo
