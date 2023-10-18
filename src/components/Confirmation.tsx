import { Hash } from "viem"
import { useWaitForTransaction } from "wagmi"
import VerifyTransaction from "./VerifyTransaction"

interface ConfirmationProps {
  hash: Hash
}

const Confirmation: React.FC<ConfirmationProps> = ({ hash }) => {
  const { data, isError, isLoading } = useWaitForTransaction({
    hash,
    confirmations: 6
  })

  if (isLoading) return <div>Waiting for confirmation…</div>
  if (isError) return <div>Transaction error</div>
  return <VerifyTransaction hash={data?.transactionHash} />
}

export default Confirmation
