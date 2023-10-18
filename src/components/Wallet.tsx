import { formatEther } from "viem"
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import Deposit from "./Deposit"

interface WalletProps {}

const Wallet: React.FC<WalletProps> = ({}) => {
  const { address } = useAccount()
  const { data, isLoading, refetch } = useBalance({
    address
  })

  const { connect } = useConnect({
    connector: new MetaMaskConnector()
  })

  const { disconnect } = useDisconnect()

  console.log(data)

  if (address)
    return (
      <div>
        Connected to {address}
        <br />
        {isLoading ? "Loading..." : null}
        {data ? `Balance: ${formatEther(data.value)}` : null}
        <button onClick={() => refetch()}>Refresh</button>
        <br />
        <Deposit refetchBalance={refetch} />
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Wallet
