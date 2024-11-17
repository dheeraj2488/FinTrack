import React, { Children } from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
        <Header/>
        <div className='h-[80vh] overflow-auto'>
            {children}
        </div>
        <Footer/>
    </>
  
  )
}

export default Layout
