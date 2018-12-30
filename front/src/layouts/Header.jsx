import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Mutation } from 'react-apollo'
import { SET_AUTH, RESET_AUTH, GET_AUTH } from '../store'
import { client } from '../store'

export default function Header({ location, history }) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    client.query({ query: GET_AUTH }).then(data => {
      setChecked(data.data.auth)
    })
  }, [])

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Product Manger
          </Typography>
          <Button
            onClick={() => history.push('/')}
            variant={
              (location.pathname === '/products' ||
                location.pathname === '/') &&
              'outlined'
            }
            color="inherit"
            style={{ marginLeft: '20px' }}
          >
            Gallery
          </Button>
          <Button
            color="inherit"
            onClick={() => history.push('/dashboard/products')}
            variant={location.pathname === '/dashboard/products' && 'outlined'}
          >
            DashBoard
          </Button>
          <div style={{ flexGrow: 1 }} />

          <Mutation mutation={checked ? RESET_AUTH : SET_AUTH}>
            {(authChange, { error, loading }) => {
              if (error) return <p>{error.message}</p>
              if (loading) return <CircularProgress color="secondary" />
              return (
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={() => {
                        authChange()
                        setChecked(!checked)
                      }}
                    />
                  }
                  label="Admin"
                />
              )
            }}
          </Mutation>
        </Toolbar>
      </AppBar>
    </div>
  )
}
