import React from 'react'
import { RecoilRoot } from 'recoil'
import { Container, AppProps } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import 'tailwindcss/tailwind.css'
import FullScreenDialog from 'components/Ui/FullScreenDialog '
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import {theme} from "styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <RecoilRoot>
      <FullScreenDialog />
      <ToastContainer />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default App
