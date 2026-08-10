import { useCallback, useEffect, useState } from 'react'
import AsterButton from './AsterButton'
import AsterPanel from './AsterPanel'

export default function Aster() {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])
  const openPanel = useCallback(() => setOpen(true), [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  return (
    <div className="aster-root">
      <AsterPanel open={open} onClose={close} />
      <AsterButton open={open} onClick={openPanel} />
    </div>
  )
}
