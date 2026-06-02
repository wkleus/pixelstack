import FooterLogo from './FooterLogo'
import FooterSocialLinks from './FooterSocialLinks'

const Footer = () => {
  return (
    <footer className="dark:bg-primary/10 border-t-4 border-gray-200 bg-red-50 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-1">
        <div className="my-5 flex flex-col items-center justify-between md:flex-row">
          <FooterLogo />
          <FooterSocialLinks />
        </div>
      </div>
    </footer>
  )
}

export default Footer
