import React from 'react'
import { Menu, Container } from 'semantic-ui-react'

export default function Header({ location, history }) {
  const handleItemClick = (e, { name }) => {
    switch (name) {
      case 'Dashboard':
        history.push('/dashboard/products')
        break
      case 'Gallery':
        history.push('/')
        break
      default:
        history.push('/')
        break
    }
  }
  return (
    <Menu>
      <Container>
        <Menu.Item
          name="Gallery"
          active={location === '/' || location === '/products'}
          onClick={handleItemClick}
        >
          Gallery
        </Menu.Item>
        <Menu.Item
          name="Dashboard"
          active={location === '/dashboard/products'}
          onClick={handleItemClick}
        >
          Dashboard
        </Menu.Item>
      </Container>
    </Menu>
  )
}
