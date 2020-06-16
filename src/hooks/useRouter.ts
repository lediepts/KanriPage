import { useContext } from 'react'
import {
  __RouterContext,
  RouteComponentProps,
  StaticContext,
} from 'react-router'
import { PathParams } from '../modules/ui'

export default function useRouter() {
  return useContext<RouteComponentProps<PathParams, StaticContext, any>>(
    __RouterContext,
  )
}
