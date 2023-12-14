import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getVideo } from '../service/allapi'


function View({serverRes}) {
  const[allVideos,setallVideos]=useState([])
  const[deleteStatus,setdeleteStatus]=useState(false)

  //useEffect
useEffect(()=>{
  getallvideos()//content to be loaded
},[serverRes,deleteStatus]
//if array is blank one tym it will load,if array is value it will load each time
)
const handleDeleteStatus=(res)=>{
  setdeleteStatus(res)
}
  //define a function for api call
  const getallvideos = async() => {
    //api call
      const response= await getVideo()
      //console.log(response.data);
      setallVideos(response.data)
  }
  console.log(allVideos);

  return (
    <>
      <div className='border p-3 rounded m-4'>
        <Row>
          {
            allVideos.map(video=>(
              <Col sm={12} md={6}><VideoCard card={video} handleDeleteStatus={handleDeleteStatus}/>
              </Col>

            ))
           
          }
          
        </Row>
      </div>
    </>
  )
}

export default View