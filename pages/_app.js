import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';
import '../styles/globals.css';
import '../assets/css/styles.scss'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
