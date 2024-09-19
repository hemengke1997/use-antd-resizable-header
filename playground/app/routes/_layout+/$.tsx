import { useNavigate } from 'react-router-dom'
import { useIsomorphicLayoutEffect } from 'ahooks'

export default function NotFound() {
  const navigate = useNavigate()
  useIsomorphicLayoutEffect(() => {
    navigate(`/`, { replace: true })
  }, [])

  return null
}
