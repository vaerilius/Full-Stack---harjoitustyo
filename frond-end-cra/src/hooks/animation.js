import { useEffect } from 'react'

export const Animation = () => {
  useEffect(() => {
    setTimeout(() => {
      const cards = window.document.querySelectorAll('.card')
      console.log(cards)
      cards.forEach(c => {
        console.log(c.classList)
        c.classList.add('visible')
      })
    }, 300)
  
  
  }, [])

  return false
}



