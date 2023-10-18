import { useEffect } from "react"
import { useActorMethod } from "service/hello"
import { formatEther } from "viem"

interface BalanceProps {}

const Balance: React.FC<BalanceProps> = ({}) => {
  const { data, loading, error, call } = useActorMethod("balance")

  useEffect(() => {
    call()
  }, [])

  if (loading) return <div>Fething balance…</div>
  if (error) return <div>{error.toString()}</div>
  return data ? <div>Balance: {formatEther(data)}</div> : null
}

export default Balance
