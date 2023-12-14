import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
function Landing() {
//function definition
//Redirect from one page to another page we can use useNavigate hook
const navigate=useNavigate()
const handleNavigate=()=>{
    navigate('/home')
  }
  return (
    <div>
      <Row className='align-items-center'>
          <Col></Col>
        <Col lg={6}>
          <h1>WELCOME TO VIDEOOO.COM</h1>
          <p style={{textAlign:'justify'}}>Where user can use their favourite videoos.user can upload any youtube videos by copy and paste  their url in to videooo.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop it is free try it now!!!</p>
          <button onClick={handleNavigate} className='btn btn-success'>Click Here To Know More</button>
        </Col>
        <Col lg={5}>
          <img src="https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-play-video-icon-graphic-design-template-vector-png-image_530837.jpg" alt="" className='img-fluid'  />
        </Col>
      </Row>
    </div>
  )
}

export default Landing