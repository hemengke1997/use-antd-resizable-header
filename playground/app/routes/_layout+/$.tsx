import { useIsomorphicLayoutEffect } from 'ahooks'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  useIsomorphicLayoutEffect(() => {
    navigate(`/`, { replace: true })
  }, [])

  return null
}
