import React from 'react'
import styled from 'styled-components'

/**
 * 子コンポーネントがクラッシュしたときのフォールバックを表示するためのコンポーネント
 *
 * @see https://reactjs.org/docs/error-boundaries.html
 */
export default class ErrorBoundary extends React.Component<
  {},
  {
    hasError: boolean
  }
> {
  static getDerivedStateFromError(_err: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  constructor(props: Readonly<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(err: any, errInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(err, errInfo)
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      // You can render any custom fallback UI
      return <Container>Something went wrong.</Container>
    }

    return children
  }
}

const Container = styled.div`
  padding: 16px 16px 160px 24px;
`
