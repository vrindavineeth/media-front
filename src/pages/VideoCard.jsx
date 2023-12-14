import React from 'react'
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addHistory, deleteVideo } from '../service/allapi';
import {v4 as uuidv4} from 'uuid';


function VideoCard({card,handleDeleteStatus,insideCategory}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() =>{
    setShow(true);
    const uid=uuidv4()
    console.log(uid);//to get card id we need to install uuid 
    const cardTime=new Date()
    console.log(cardTime)
    const{caption,url}=card
    if(uid!="",caption!="",url!="",cardTime!="")
    {
      const body={
        id:uid,cardname:caption,url:url,Date:cardTime //to store data in backend if there is value
      }
   const res=  await  addHistory(body)
   console.log(res)
   
    }


  } 

  //to remove or delete a card using an api call
  const removeItem=async(id)=>{
    //make an api call for delete
   const res= await deleteVideo(id)
   console.log(res);
   if(res.status>=200&&res.status<300)
   {
    handleDeleteStatus(true)
   }

  }
//define drag started
const dragStarted=(e,id)=>{
  console.log("Drag Started & source card id:"+id)
  e.dataTransfer.setData("cardId ",id)
}

  return (
    <>
    <div>
    <Card className='shadow' draggable onDragStart={e=>dragStarted(e,card?.id)}> 
  {/*draggable to drag the card*/}
      <Card.Img  onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
      <Card.Body>
        <Card.Title>
          <span>{card?.caption}</span>
         
          <span>
            {
              insideCategory?"":
              <Trash2 onClick={()=>removeItem(card?.id)} color='red' style={{float:'right'}} />
            }
          </span>
        </Card.Title>
      </Card.Body>
    </Card>
    {/*Modals}*/}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width={'100%'} height={'400px'} src={`${card?.url}?autoplay=1`} /*?autoplay=1 for autoplay the video in the modal*/ title="Scene Mone - Music Video | RDX | Neeraj Madhav, Shane Nigam,Antony Varghese | Nahas Hidhayath | Rzee" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


        </Modal.Body>
      </Modal>
    </div>
    </>
  )
}

export default VideoCard