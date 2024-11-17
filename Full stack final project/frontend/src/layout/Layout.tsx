import  { ReactNode } from 'react'
import Header from './header/Header'
import Main from './main/Main'
import Footer from './footer/Footer'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Main children={children}  />
      <Footer />
    </>
  )
}

export default Layout
