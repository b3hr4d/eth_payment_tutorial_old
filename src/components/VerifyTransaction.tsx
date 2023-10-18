import { useEffect } from "react"
import { useActorMethod } from "service/hello"
import { formatEther } from "viem"

interface VerifyTransactionProps {
  hash?: string
}

const VerifyTransaction: React.FC<VerifyTransactionProps> = ({ hash }) => {
  const { loading, error, data, call } = useActorMethod("verify_transaction")

  useEffect(() => {
    if (!hash) return

    call(hash)
  }, [hash])

  if (loading) return <div>Processing…</div>
  if (error) return <div>{error.toString()}</div>
  return data ? (
    <div>
      Transaction: {hash} with {formatEther(data[0])} from {data[1]} is
      confirmed on Ethereum.
    </div>
  ) : null
}

export default VerifyTransaction
