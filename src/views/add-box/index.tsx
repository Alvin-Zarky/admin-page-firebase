import React, {useState} from 'react'
import { Container, Row, Col} from 'reactstrap'
import SideBar from '../../components/Sidebar'
import TopBar from '../../components/Topbar'
import { IoSettings } from 'react-icons/io5'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap"
import './add-box.scss'

export default function AddBox() {

  const [modal, setModal] = useState(false)
  const onSearchSubmit = (e:React.FormEvent) =>{
    e.preventDefault()
  }
  const onToggle = () =>{
    setModal(!modal)
  }
  const onSubmitBox = (e:React.FormEvent) =>{
    e.preventDefault()
  }

  return (
    <>
      <Container className="padd-lr0" fluid>
        <Row className="row-column">
          <SideBar />
          <Col xl="10" lg="10" md="10" className="right-side-form">
            <TopBar />
            <div className="title-overview-page">
            <Row>
                <Col xl="6" lg="6" md="6">
                  <div className="title-content-page">
                    <div className="icon-setting">
                      <IoSettings />
                    </div>
                    <span>Add Box</span>
                  </div>
                </Col>
                <Col xl="6" lg="6" md="6">
                  <div className="box-form">
                    <form onSubmit={onSearchSubmit}>
                      <div className="input-search-form">
                        <input type="text" onChange={(e) => {}} />
                        <div className="btn-search"><span>Search</span></div>
                      </div>
                    </form>
                    <Button className="button-add-on" color="dark" outline onClick={onToggle}>
                      Add On
                    </Button>
                  </div>
                  <Modal isOpen={modal} toggle={onToggle}>
                  <form onSubmit={onSubmitBox}>
                    <ModalHeader toggle={onToggle}>Add Box</ModalHeader>
                    <ModalBody>
                      <div className="box-input-modal">
                          <div className="label">
                            <label>Category Name: </label>
                          </div>
                          <div className="input-text">
                            <input type="text" onChange={(e) => {}} required />
                          </div>
                          <div className="label">
                            <label>Slug Name: </label>
                          </div>
                          <div className="input-text">
                            <input type="text" onChange={(e) => {}} required />
                          </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <button className="btn-submit">Submit</button>
                      <Button color="secondary" className="btn-close-modal" onClick={onToggle}>
                        Close
                      </Button>
                    </ModalFooter>
                  </form>
                </Modal>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
