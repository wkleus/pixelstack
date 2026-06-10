import Portfolio from './components/Home/Portfolio'
import Posts from './components/Home/Posts'
import InfoMail from './components/Home/InfoMail/InfoMail'
import Intro from './components/Home/Intro'

export default function Welcome() {
  return (
    <>
      {/* Hero / introduction section */}
      <Intro />

      {/* Portfolio preview section */}
      <Portfolio />

      {/* Email subscription section */}
      <InfoMail />

      {/* Latest posts section */}
      <Posts />
    </>
  )
}
