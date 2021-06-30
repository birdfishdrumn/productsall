import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import React from 'react'
// import InfoBox from "./InfoBox";
import NProgress from 'nprogress'
import Router from 'next/router'

// @ts-ignore
Router.onRouteChangeStart = (url) => NProgress.start()
// @ts-ignore
Router.onRouteChangeComplete = (url) => NProgress.done()
// @ts-ignore
Router.onRouteChangeError = (url) => NProgress.done()

interface PROPS {
  title: string
  keywords?: string
  description?: string
  children: any
}

const Layout: React.FC<PROPS> = ({ title, keywords, description, children }) => {
  const router = useRouter()
  const head = () => (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
    </React.Fragment>
  )

  return (
    <div>
      {head()}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <div className="m-3">{children}</div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events',
}

export default Layout
