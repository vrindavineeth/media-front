import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addCategory, deleteCategory, getCategory, getVideos, updateCategory } from '../service/allapi';
import { toast } from 'react-toastify';
import { Trash2 } from 'react-feather';
import VideoCard from './VideoCard';



function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[addcategory,setaddcategory]=useState({id:"",name:"",allVideos:[]})
  //

  const[allcategories,setallcategories]=useState([])

  const handleAddcategory=(e)=>{
    const{name,value}=e.target
    setaddcategory({...addcategory,[name]:value})//...rest operator
  }
  console.log(addcategory)
  const handleAdd=async(e)=>{
    e.preventDefault()
    const{id,name}=addcategory
    if(!id||!name)
    {
      alert('Please fill the form completely')
    }
    else{
      //api call
      const res= await addCategory(addcategory)
      console.log(res)
      if(res.status>=200&& res.status<300)
      {
        setShow(false)
        toast('Category successfully added')
        getCategorylist()
      }
      else{
      toast('Please provide a unique id!!')      }
    }
  }
  useEffect(() => {
    getCategorylist()
  
   
    
  }, [])
  
  const getCategorylist=async()=>{
    //api call
    const resp=await getCategory()
    console.log(resp)
    setallcategories(resp.data)
  }
 
  console.log(allcategories);
  const handleDeleteCategory=async(e,id)=>{
    e.preventDefault()
    //api call for delete category
  const res= await  deleteCategory(id)
  console.log(res);
  getCategorylist()
 
  }
 //define onDragOver
 const  dragOver=(e)=>{
  e.preventDefault()
  console.log("Dragging over the category")
 }
 const dropped=async(e,categoryId)=>{
  console.log("categoryId",categoryId)
  let sourceCardId=e.dataTransfer.getData("cardId")
  console.log(sourceCardId)
  const {data}= await getVideos(sourceCardId)
  console.log(data)
  let selectedCategory=allcategories.find(item=>item.id==categoryId)
  console.log("Target categoryDetails",selectedCategory)
  selectedCategory.allVideos.push(data)
  console.log("Updated category details",selectedCategory)
  await updateCategory(categoryId,selectedCategory)
  getCategorylist()
 }
  return (
    <>
      <div className='d-grid'>
        <div onClick={handleShow} className='btn btn-dark m-2'> Add Category</div>
      </div>
      {
        allcategories.map(item=>(
          <div droppable onDragOver={e=>dragOver(e)} onDrop={e=>dropped(e,item?.id)}>
          <div className='d-flex justify-content-between border rounded mt-3 p-3'>
            <h4>{item?.name}</h4>
            <span onClick={e=>handleDeleteCategory(e,item?.id)}><Trash2 color='red'/></span>
            <Row>
              {
                item?.allVideos.map((card)=>(
                  <Col>
                  <VideoCard card={card} insideCategory={true}  />
                  </Col>
                ))
              }
            </Row>
          </div>
        </div>
        ))
      }
     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
              <Form.Control onChange={handleAddcategory} name='id' type="text" placeholder="Category Video id" />
            </FloatingLabel>
            <FloatingLabel className='mb-3' controlId="floatingcaption" label="Caption">
              <Form.Control type="text" onChange={handleAddcategory} name='name' placeholder="Caption" />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default Category