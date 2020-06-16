import { Store, Dispatch as ReduxDispatch, Action, AnyAction } from 'redux'
import { RootState, AllActions } from '.'
import { StoreExt } from '../createStoreProvider'

declare module 'react-redux' {
  type Dispatch<A extends Action = AnyAction> = ReduxDispatch<A>

  function useDispatch(): Dispatch
  function useStore(): Store<RootState, AllActions> & StoreExt
  function useSelector<TSelected>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected
}
