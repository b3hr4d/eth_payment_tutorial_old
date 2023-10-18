import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import Deposit from "./Deposit"

interface WalletProps {}

const Wallet: React.FC<WalletProps> = ({}) => {
  const { address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector()
  })
  const { disconnect } = useDisconnect()

  if (address)
    return (
      <div>
        Connected to {address}
        <Deposit />
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Wallet
