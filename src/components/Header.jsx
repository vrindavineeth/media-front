import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Upload } from 'react-feather';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand >
            <Link to={'/'} style={{textDecoration:'none'}}>
            <span className='text-light'>
            <Upload/>
            <span className='ms-2'>Videooo.com</span>
            </span>
            </Link>

          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header