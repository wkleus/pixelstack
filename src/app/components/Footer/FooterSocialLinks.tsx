import Link from 'next/link'
import Image from 'next/image'
import { FaGithub, FaGithubSquare, FaInstagram } from 'react-icons/fa'

const FooterSocialLinks = () => {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
      <Link
        href="https://github.com/wkleus/"
        aria-label="My GitHub Profile"
        target="_blank"
        className="group relative text-2xl text-gray-600 opacity-70 transition duration-300 hover:opacity-100 dark:text-gray-300"
      >
        <FaGithub size={26} />
        <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block dark:bg-yellow-100 dark:text-black">
          My GitHub Profile
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-yellow-100"></span>
        </span>
      </Link>

      <Link
        href="https://github.com/Monocle-Labs"
        aria-label="Monocle Labs (GitHub)"
        target="_blank"
        className="group relative text-2xl text-gray-600 opacity-70 transition duration-300 hover:opacity-100 dark:text-gray-300"
      >
        <FaGithubSquare size={26} />
        <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block dark:bg-yellow-100 dark:text-black">
          Monocle Labs (GitHub)
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-yellow-100"></span>
        </span>
      </Link>

      <Link
        href="https://homesphere-web.vercel.app"
        target="_blank"
        className="group bg-gray relative text-gray-600 transition duration-300 dark:text-gray-300"
      >
        <Image
          src="/icons/hs.svg"
          alt="HomeSphere Website"
          width={26}
          height={26}
          className="relative rounded-t-full border border-gray-600 opacity-70 transition hover:opacity-100 dark:border-gray-300"
        />
        <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block dark:bg-yellow-100 dark:text-black">
          HomeSphere
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-yellow-100"></span>
        </span>
      </Link>

      <Link
        href="https://linguify-web.vercel.app"
        target="_blank"
        className="group bg-gray relative text-gray-600 transition duration-300 dark:text-gray-300"
      >
        <Image
          src="/icons/l.svg"
          alt="Linguify Website"
          width={26}
          height={26}
          className="relative rounded-tl-2xl rounded-br-2xl border border-gray-600 opacity-70 transition hover:opacity-100 dark:border-gray-300"
        />
        <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block dark:bg-yellow-100 dark:text-black">
          Linguify
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-yellow-100"></span>
        </span>
      </Link>

      <Link
        href="https://pixelstack-me.vercel.app"
        target="_blank"
        className="group bg-gray relative text-gray-600 transition duration-300 dark:text-gray-300"
      >
        <Image
          src="/icons/ps.svg"
          alt="PixelStack Vercel Demo Website"
          width={26}
          height={26}
          className="relative rounded-md border border-gray-600 opacity-70 transition hover:opacity-100 dark:border-gray-300"
        />
        <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block dark:bg-yellow-100 dark:text-black">
          PixelStack Vercel Demo
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-yellow-100"></span>
        </span>
      </Link>

      {/* <Link
        href="https://www.instagram.com/"
        target="_blank"
        className="group relative text-2xl text-gray-600 opacity-70 transition duration-300 hover:opacity-100 dark:text-gray-300"
      >
        <FaInstagram size={26} />
        <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block dark:bg-yellow-100 dark:text-black">
          Instagram
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-yellow-100"></span>
        </span>
      </Link> */}

      <Link
        href="https://www.wearedevelopers.com/"
        target="_blank"
        className="group relative text-2xl text-gray-600 transition duration-300 dark:text-gray-300"
      >
        <Image
          src="/icons/WeAreDevelopers-3.svg"
          alt="WeAreDevelopers"
          width={54}
          height={54}
          className="relative h-8 w-auto opacity-70 invert-70 transition hover:opacity-100 dark:invert-0"
        />
        <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block dark:bg-yellow-100 dark:text-black">
          WeAreDevelopers
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-yellow-100"></span>
        </span>
      </Link>

      {/* <Link
        href="https://www.get-in-it.de/"
        target="_blank"
        className="group relative text-gray-600 transition duration-300 dark:text-gray-300"
      >
        <Image
          src="/icons/get-in-it-2.png"
          alt="get-in-it"
          width={34}
          height={34}
          className="relative -top-1.5 opacity-70 brightness-0 grayscale invert-30 transition hover:opacity-100 dark:invert-70 hover:dark:invert-100"
        />
        <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block dark:bg-yellow-100 dark:text-black">
          get-in-it
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-yellow-100"></span>
        </span>
      </Link> */}
    </div>
  )
}

export default FooterSocialLinks
