import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function () {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('basic')
  }, [])
  return null
}
