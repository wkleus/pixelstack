import FooterLogo from './FooterLogo'
import FooterSocialLinks from './FooterSocialLinks'

const Footer = () => {
  return (
    <footer className="dark:bg-primary/10 w-full border-t-4 border-gray-200 bg-red-50 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <FooterLogo />
          <FooterSocialLinks />
        </div>
      </div>
    </footer>
  )
}

export default Footer
