import { useEffect, useCallback } from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from '../modules'

export default function useAPI<TSelected>(
  selector: (state: RootState) => TSelected,
  effect: (dispatch: Dispatch) => (selected: TSelected) => unknown,
) {
  const selected = useSelector(selector, shallowEqual)
  const dispatch = useDispatch()
  // 実は memoize 必要ないかも？
  const memoizedEffect = useCallback(effect(dispatch), [])

  useEffect(() => {
    memoizedEffect(selected)
  })
}
