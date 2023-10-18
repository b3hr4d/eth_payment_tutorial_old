import { Hash } from "viem"
import { useWaitForTransaction } from "wagmi"

interface VerifyTransactionProps {
  hash: Hash
}

const VerifyTransaction: React.FC<VerifyTransactionProps> = ({ hash }) => {
  const { data, isError, isLoading } = useWaitForTransaction({
    hash
  })

  if (isLoading) return <div>Processing…</div>
  if (isError) return <div>Transaction error</div>
  return <div>Transaction: {JSON.stringify(data)}</div>
}

export default VerifyTransaction
