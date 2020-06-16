import { useState, useCallback } from 'react'

export default function useDraft<TValue>(stored: TValue) {
  const [draft, setDraft] = useState<TValue | null>(null)

  const value = draft === null ? stored : draft
  const setValue = useCallback(
    setAction => {
      setDraft(drft => (drft === null ? stored : drft))
      setDraft(setAction)
    },
    [stored],
  )

  return [value, setValue] as const
}
