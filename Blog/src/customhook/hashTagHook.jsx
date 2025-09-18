import { useState } from 'react'

export function useTag() {
  const [value, setValue] = useState('')
  const [tags, setTags] = useState([])

  function handleTags(e) {
    if (e.code === 'Space' && value.trim() !== '') {
      setTags([...tags, value.trim()])
      setValue('')
    }
  }
  return [value, tags, handleTags, setValue, setTags]
}
