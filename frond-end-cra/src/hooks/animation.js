import { useEffect } from 'react'

export const Animation = () => {
  useEffect(() => {
    setTimeout(() => {
      const container = window.document.querySelectorAll('.container')
      container.forEach(c => {
        // console.log(c.classList)
        c.classList.add('visible')
      })
    }, 100)
  }, [])

  return false
}
