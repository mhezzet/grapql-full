import React from 'react'
import { render } from 'react-dom'
import Apollo from './store'
import App from './App'
import './styles/style.css'

render(
  <Apollo>
    <App />
  </Apollo>,
  document.getElementById('root')
)
