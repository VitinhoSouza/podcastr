import "../styles/global.scss"

import { Header } from "../components/Header"
import { Player } from "../components/Player"

import styles from '../styles/app.module.scss'

import {PlayerContextProvider} from '../contexts/PlayerContext'

function MyApp({ Component, pageProps }) {

  return(
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header></Header>
          <Component {...pageProps}/>
        </main>

        <Player></Player>
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
