import Head from "next/head"

import styles from "styles/Home.module.css"

import Wallet from "components/Wallet"
import Image from "next/image"

import { createPublicClient, http } from "viem"
import { WagmiConfig, createConfig, mainnet } from "wagmi"

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  })
})

function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Internet Computer</title>
      </Head>
      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to the Internet Computer starter template
        </h3>
        <WagmiConfig config={config}>
          <Wallet />
        </WagmiConfig>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://internetcomputer.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={140}
            height={30}
            src="/icp-logo.svg"
            alt="DFINITY logo"
            className={styles.logo}
          />
        </a>
      </footer>
    </div>
  )
}

export default HomePage
