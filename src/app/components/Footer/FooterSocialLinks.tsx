import Link from 'next/link'
import Image from 'next/image'
import { BsGlobe2, BsTiktok } from 'react-icons/bs'
import { FaGithub, FaInstagram } from 'react-icons/fa'

const FooterSocialLinks = () => {
  return (
    <div className="flex space-x-6">
      <Link
        href="https://github.com/wkleus/"
        target="_blank"
        className="text-2xl text-gray-600 opacity-70 transition duration-300 hover:opacity-100 dark:text-gray-300"
      >
        <FaGithub />
      </Link>

      <Link
        href="https://pixelstack-me.vercel.app/"
        target="_blank"
        className="text-2xl text-gray-600 opacity-70 transition duration-300 hover:opacity-100 dark:text-gray-300"
      >
        <BsGlobe2 />
      </Link>

      <Link
        href="https://www.instagram.com/frontend_trend/"
        target="_blank"
        className="text-2xl text-gray-600 opacity-70 transition duration-300 hover:opacity-100 dark:text-gray-300"
      >
        <FaInstagram />
      </Link>

      <Link
        href="https://www.wearedevelopers.com/"
        target="_blank"
        className="text-2xl text-gray-600 transition duration-300 dark:text-gray-300"
      >
        <Image
          src="/icons/WeAreDevelopers-3.svg"
          alt="WeAreDevelopers"
          width={48}
          height={48}
          className="relative h-7 w-auto opacity-70 invert-70 transition hover:opacity-100 dark:invert-0"
        />
      </Link>

      <Link
        href="https://www.get-in-it.de/"
        target="_blank"
        className="text-gray-600 transition duration-300 dark:text-gray-300"
      >
        <Image
          src="/icons/get-in-it-2.png"
          alt="get-in-it"
          width={32}
          height={32}
          className="relative -top-1.5 opacity-70 brightness-0 grayscale invert-30 transition hover:opacity-100 dark:invert-70 hover:dark:invert-100"
        />
      </Link>

      <Link
        href="https://www.tiktok.com/"
        target="_blank"
        className="text-2xl text-gray-600 opacity-70 transition duration-300 hover:opacity-100 dark:text-gray-300"
      >
        <BsTiktok />
      </Link>
    </div>
  )
}

export default FooterSocialLinks
