import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default function Footer() {
  return (
    <AppBar position="static" color="default">
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="body1" gutterBottom>
          c 2018, StorName
        </Typography>
        <Typography variant="body1" style={{ marginLeft: '20px' }} gutterBottom>
          Powered by StorePlus
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
