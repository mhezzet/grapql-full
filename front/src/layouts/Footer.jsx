import React from 'react'
import { Menu, Container } from 'semantic-ui-react'

export default function Footer() {
  return (
    <Menu>
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ paddingRight: '2rem' }}>c 2018,StoreName</div>
            <div>Powered by StorePlus</div>
          </div>
        </div>
      </Container>
    </Menu>
  )
}
