import { useEffect, useState } from "react"
import { useActorMethod } from "service/hello"
import helperAbi from "service/helper-abi"
import { parseEther } from "viem"
import { useContractWrite } from "wagmi"
import Confirmation from "./Confirmation"

interface WalletProps {
  refetchBalance?: () => void
}

const Wallet: React.FC<WalletProps> = ({ refetchBalance }) => {
  const [amount, setAmount] = useState(0)

  const { data: canisterDepositAddress, call } =
    useActorMethod("deposit_principal")

  useEffect(() => {
    call()
  }, [])

  console.log(canisterDepositAddress)

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xb44B5e756A894775FC32EDdf3314Bb1B1944dC34",
    abi: helperAbi,
    functionName: "deposit",
    value: parseEther(amount.toString()),
    args: [canisterDepositAddress],
    onSuccess: () => {
      if (refetchBalance) refetchBalance()
    }
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let amount = e.target.valueAsNumber
    if (amount < 0) amount = 0

    setAmount(amount)
  }

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
      {data?.hash ? (
        <Confirmation hash={data.hash} />
      ) : isLoading ? (
        "Loading..."
      ) : isSuccess ? (
        "Success"
      ) : null}
    </div>
  )
}

export default Wallet
