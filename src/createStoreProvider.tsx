import React from 'react'
import {
  createStore,
  Reducer,
  AnyAction,
  DeepPartial,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  compose,
} from 'redux'
import { Provider as ReactReduxProvider } from 'react-redux'
import { RootState } from './modules'


export default function createStoreProvider(
  reducer: Reducer<unknown, AnyAction>,
  preloadedState?: DeepPartial<unknown>,
) {
  const store = createStore(
    reducer,
    preloadedState,
    reduxDevtoolsExtensionEnhancer
      ? compose(
          appendableReducerStoreEnhancer,
          reduxDevtoolsExtensionEnhancer,
        )
      : appendableReducerStoreEnhancer,
  )

  function Provider({ children }: { children: React.ReactNode }) {
    return <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
  }

  return {
    Provider,
    store,
  }
}

export type StoreExt = {
  /**
   * Reducer を追加する。
   *
   * @param additional 追加したい reducer
   * @returns 追加した reducer を削除する関数
   * @see https://redux.js.org/recipes/code-splitting
   */
  appendReducer(
    additional: Reducer<DeepReadonly<RootState>, AnyAction>,
  ): () => void
}

/**
 * `store.appendReducer` で `reducer` を追加できるようにする。
 *
 * @param _createStore createStore
 */
const appendableReducerStoreEnhancer: StoreEnhancer<StoreExt> = (
  _createStore: StoreEnhancerStoreCreator<StoreExt>,
) => (reducer, preloadedState) => {
  const reducers: Reducer<unknown, AnyAction>[] = [reducer]
  const appendReducer: StoreExt['appendReducer'] = additional => {
    reducers.push(additional)

    return function removeReducer(): void {
      const index = reducers.lastIndexOf(additional)
      if (index < 0) return

      reducers.splice(index, 1)
    }
  }

  const store = _createStore<any, any>(
    (state, action) => reducers.reduce((s, r) => r(s, action), state),
    preloadedState,
  )
  store.appendReducer = appendReducer

  return store
}

/**
 * Chrome の Redux DevTools Extension によるデバッグ機構を仕込む
 *
 * @see https://github.com/zalmoxisus/redux-devtools-extension#usage
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const reduxDevtoolsExtensionEnhancer: StoreEnhancerStoreCreator | undefined =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
