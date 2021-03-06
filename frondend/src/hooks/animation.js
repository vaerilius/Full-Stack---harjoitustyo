import { useEffect } from 'react'

export const Animation = () => {
  useEffect(() => {
    setTimeout(() => {
      const container = window.document.querySelectorAll('.container')
      container.forEach(c => {
        c.classList.add('visible')
      })
    }, 100)
  }, [])

  return false
}
