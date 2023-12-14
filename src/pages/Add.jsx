import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addVideo } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Add({handleResponse}) {
  const [uploadData, setuploadData] = useState({
    id: "", caption: "", thumbnail: "", url: ""
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //set input function definition
  const setInput = (e) => {
    //setuploadData(e.target.value)
    const { name, value } = e.target
    setuploadData({ ...uploadData, [name]: value })//spread operator (...)-To display data in a line

  }
  // console.log(uploadData)
  //extract youtube ur
  const extractUrl = (e) => {
    //console.log(e.target.value);
    let youtubeUrl = e.target.value
    if (youtubeUrl.includes("v=")) {
      let index = youtubeUrl.indexOf("v=")
      console.log(index);
      let videourl = youtubeUrl.substring(index + 2, index + 13)
      console.log(videourl);
      let videoData = uploadData
      videoData.url = `https://www.youtube.com/embed/${videourl}`
      setuploadData(videoData)
    }
    console.log(uploadData);
  }
  //define handleAdd function
  const handleAdd = async () => {
    const { id, caption, thumbnail, url } = uploadData
    if (!id || !caption || !thumbnail || !url) {
      toast("Please fill the form completely.");
    }
    else {
      let response = await addVideo(uploadData)
      
      if (response.status >= 200 && response.status < 300) {
        //console.log(response);
        handleResponse(response.data)
        setShow(false)
        toast.success("Video uploaded successfully!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        })

      }
      else {
        toast("Please provide a unique Id")
      }
     }
  }


  return (
    <>
      <div onClick={handleShow} className='btn'>
        <PlusCircle color='green' size={90} />
      </div>
      {/*Modal*/}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/*id*/}
            <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
              <Form.Control onChange={setInput} type="text" placeholder="Uploading Video id" name='id' />
            </FloatingLabel>
            {/*caption*/}
            <FloatingLabel className='mb-3' controlId="floatingcaption" label="uploading video caption">
              <Form.Control onChange={setInput} type="text" placeholder="Uploading Video caption" name='caption' />
            </FloatingLabel>

            {/*image url*/}
            <FloatingLabel className='mb-3' controlId="floatingimage" label="video cover URL">
              <Form.Control onChange={setInput} type="text" placeholder="Video cover image URL" name='thumbnail' />
            </FloatingLabel>

            {/*Video link*/}
            <FloatingLabel className='mb-3' controlId="floatinglink" label="Uploading video link">
              <Form.Control onChange={extractUrl} type="text" placeholder="Video Link" name='url' />
            </FloatingLabel>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  )
}

export default Add