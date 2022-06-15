import React from 'react'
import { Navbar, Container, Button, NavbarBrand } from 'react-bootstrap'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import Link from 'next/link'

const Header = () => {
  return (
    <Navbar>
    <Container>
      <Navbar.Brand href="#home">Jira v2</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="p-3">
          Signed in as: <a href="#login">Nikky</a>
        </Navbar.Text>
        <Link href="/login>" passHref>
          <Button>Log out</Button>
        </Link>
      </Navbar.Collapse>
    </Container>
</Navbar>
  )
}

export default Header