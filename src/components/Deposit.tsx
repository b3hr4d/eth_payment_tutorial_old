import { useActorMethod } from "service/hello"
import helperAbi from "service/helper-abi"
import { useContractWrite } from "wagmi"

interface WalletProps {}

const Wallet: React.FC<WalletProps> = ({}) => {
  const { data: canisterDepositAddress } = useActorMethod(
    "canister_deposit_principal"
  )

  console.log(canisterDepositAddress)

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xb44B5e756A894775FC32EDdf3314Bb1B1944dC34",
    abi: helperAbi,
    functionName: "deposit",
    chainId: 11155111,
    value: 1000000000000000000n,
    args: [canisterDepositAddress]
  })

  return (
    <div>
      <button onClick={() => write()}>Deposit</button>
    </div>
  )
}

export default Wallet
