import { useCallback } from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../modules'
import { UIAction, UI } from '../modules/ui'

/**
 * Experimental hook
 */
export default function useUIState<TValue>(
  selector: (ui: UI) => TValue,
): [TValue, Dispatch<ValueOf<UIAction>>] {
  const uiState = useSelector(
    useCallback<(state: RootState) => TValue>(state => selector(state.ui), [
      selector,
    ]),
  )

  const dispatch = useDispatch()

  return [uiState, dispatch]
}
