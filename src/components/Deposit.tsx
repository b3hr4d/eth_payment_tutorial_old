import { useEffect, useState } from "react"
import { useActorMethod } from "service/hello"
import helperAbi from "service/helper-abi"
import { parseEther } from "viem"
import { useContractWrite } from "wagmi"
import Confirmation from "./Confirmation"

interface WalletProps {}

const Wallet: React.FC<WalletProps> = ({}) => {
  const [amount, setAmount] = useState(0)

  const { data: canisterDepositAddress, call } =
    useActorMethod("deposit_principal")

  useEffect(() => {
    call()
  }, [])

  const { data, isLoading, write } = useContractWrite({
    address: "0xb44B5e756A894775FC32EDdf3314Bb1B1944dC34",
    abi: helperAbi,
    functionName: "deposit",
    value: parseEther(amount.toString()),
    args: [canisterDepositAddress]
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let amount = e.target.valueAsNumber
    if (amount < 0) amount = 0

    setAmount(amount)
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else if (data?.hash) {
    return <Confirmation hash={data.hash} />
  } else {
    return (
      <div>
        <input type="number" value={amount} onChange={changeHandler} />
        <button
          onClick={() =>
            write({
              args: [canisterDepositAddress]
            })
          }
        >
          Deposit
        </button>
      </div>
    )
  }
}

export default Wallet
