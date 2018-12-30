import React from 'react'
import Grid from '@material-ui/core/Grid'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children, history, location }) {
  return (
    <Grid container direction="column">
      <Header history={history} location={location} />
      <Grid item style={{ minHeight: 'calc(100vh - 128px)' }}>
        {children}
      </Grid>
      <Footer />
    </Grid>
  )
}
//TODO: @600px width recalculate minheight useing mediaQuery
