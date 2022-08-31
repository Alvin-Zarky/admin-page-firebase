import React, {useState, useEffect, useRef} from 'react'
import { Container, Row, Col} from 'reactstrap'
import SideBar from '../../components/Sidebar'
import TopBar from '../../components/Topbar'
import {IoSettings} from "react-icons/io5"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Table} from "reactstrap"
import {GrUpdate} from "react-icons/gr"
import {AiFillDelete} from "react-icons/ai"
import useSelectorHook from '../../hooks/useSelectorHook'
import useDispatchHook from '../../hooks/useDispatchHook'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DataCategory, getCategoryAction } from '../../actions/interfaceAction'
import Loading from '../../components/Loading'
import './add-category.scss'
import { Router } from '../../router'

export default function AddCategory() {

  const [modal, setModal]= useState(false)
  const [categoryName, setCategory] = useState('')
  const [slug, setSlug] = useState('')
  const [textSearch, setTextSearch] = useState('')
  const [isEdit, setIsEdit] = useState<{isEdited:boolean, values:DataCategory}>({isEdited:false, values:{}})
  const {user} = useSelectorHook(state => state.authSignIn)
  const {category, isLoading} = useSelectorHook(state => state.getCategory)
  const {addCategoryAction, deleteCategoryAction, editCategoryAction}= useDispatchHook()
  const dispatch= useDispatch()
  const inputText= useRef<HTMLInputElement>(null)
  const {isEdited, values} = isEdit
  const history= useHistory()

  const onToggle = () =>{
    setIsEdit({isEdited:false, values:{}})
    setCategory('')
    setSlug('')
    setModal(!modal)
  }

  useEffect(() =>{
    if(user){
      dispatch(getCategoryAction() as any)
    }
  }, [dispatch, user])

  const onSubmitCategory= (e:React.FormEvent) =>{
    if(!isEdited){
      const data={
        categoryName,
        slugUrl: slug,
        userId: user?.uid,
        userName: user?.displayName
      }
      addCategoryAction(data)
      setCategory('')
      setSlug('')
      inputText.current?.focus()
      setModal(false)
    }else{
      const value={
        categoryName,
        slugUrl:slug,
        id: values.id
      }
      setCategory(`${values.categoryName}`)
      setSlug(`${values.slugUrl}`)
      editCategoryAction(value)
      setModal(false)
    }

    e.preventDefault()
  }

  const onDeleteCategory = (id:string) =>{
    if(window.confirm('Are you sure to delete this category')){
      deleteCategoryAction(id)
    }
  }

  const onEditCategory = (value:DataCategory) =>{
    if(value){
      setCategory(`${value.categoryName}`)
      setSlug(`${value.slugUrl}`)
      setIsEdit({isEdited:true, values:value})
    }
  }

  const onLiveSearch = (e:React.FormEvent) =>{
    
    if(textSearch.trim()){
      history.push(`${Router.ADD_CATEGORY}/search/${textSearch}`)
    }else{
      history.push(`${Router.ADD_CATEGORY}`)
    }
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
                    <span>Add Category</span>
                  </div>
                </Col>
                <Col xl="6" lg="6" md="6">
                  <div className="box-form">
                    <form onSubmit={onLiveSearch}>
                      <div className="input-search-form">
                        <input type="text" value={textSearch} onChange={(e) => {setTextSearch(e.target.value)}} />
                        <div className="btn-search"><span>Search</span></div>
                      </div>
                    </form>
                    <Button className="button-add-on" color="dark" outline onClick={onToggle}>
                      Add On
                    </Button>
                  </div>
                 <Modal isOpen={modal} toggle={onToggle}>
                  <form onSubmit={onSubmitCategory}>
                    <ModalHeader toggle={onToggle}>Add Category</ModalHeader>
                    <ModalBody>
                      <div className="box-input-modal">
                          <div className="label">
                            <label>Category Name: </label>
                          </div>
                          <div className="input-text">
                            <input ref={inputText} type="text" value={categoryName} onChange={(e) => {setCategory(e.target.value)}} required />
                          </div>
                          <div className="label">
                            <label>Slug Name: </label>
                          </div>
                          <div className="input-text">
                            <input type="text" value={slug} onChange={(e) => {setSlug(e.target.value)}} required />
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

              <div className="table-content">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Category Name</th>
                      <th>Slug Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && <Loading />}
                    {category && category.map((value:DataCategory, ind:number) =>(
                      <tr key={ind}>
                          <td>{value.id}</td>
                          <td>{value.categoryName}</td>
                          <td>{value.slugUrl}</td>
                          <td>
                            <div className="button-edit-del">
                              <div className="btn-update" onClick={() => {onEditCategory(value)}}>
                                <GrUpdate onClick={onToggle} />
                              </div>
                              <div className="btn-delete" onClick={() =>{onDeleteCategory(value.id as string)}}>
                                <AiFillDelete />
                              </div>
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
