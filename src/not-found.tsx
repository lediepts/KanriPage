import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

export default function NotFound() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'UI.SetTitle',
      payload: '404: Not found',
    })
  }, [dispatch])

  return (
    <Container>
      <div style={{display:"block",padding:"50px auto",boxShadow:"0px 0px 10px -3px gray",background:"rgba(255,255,255,0.4)" }} >
      <h2 style={{display:"inlineBlock",paddingTop:"50px"}}>NOT FOUND</h2>
      <br/>
      <p style={{display:"inlineBlock",paddingBottom:"50px"}} >You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </Container>
  )
}

const Container = styled.div`
  text-align:center;
  stroke:red;
  padding:20vh 0px;
`
