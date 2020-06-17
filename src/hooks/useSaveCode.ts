import { useEffect } from 'react'
import { saveStart } from '../store/features/db/slices'
import { useDispatch } from 'react-redux'

const useSaveCode = () => {
  const dispatch = useDispatch()

  const handleSave = (e: KeyboardEvent) => {
    if (
      e.keyCode === 83 &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault()
      dispatch(saveStart())
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleSave, false)
    return () => window.removeEventListener('keydown', handleSave, false)
  }, [])
}

export default useSaveCode
