import React, {useState, useEffect} from 'react'
import { Container, Row, Col} from 'reactstrap'
import SideBar from '../../components/Sidebar'
import TopBar from '../../components/Topbar'
import { IoSettings } from 'react-icons/io5'
import useDispatchHook from '../../hooks/useDispatchHook'
import useSelectorHook from '../../hooks/useSelectorHook'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {Modal, ModalHeader, ModalBody, ModalFooter, Table} from "reactstrap"
import {Button} from "reactstrap"
import { DataCategory, DataContent, getCategoryAction, getContentAction } from '../../actions/interfaceAction'
import Loading from '../../components/Loading'
import { GrUpdate } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import { Router } from '../../router'
import { storage } from '../../config/firebase'
import './add-content.scss'

export default function AddContent() {
  
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [modal, setModal] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const [pathImg, setPathImg] = useState('')
  const [isPending, setIsPending] = useState(false) 
  const [isBlur, setIsBlur] = useState(false)
  const [boxMessage, setBoxMessage]= useState<any>('')
  const [isEdit, setIsEdit] = useState<{isEdited: boolean, object: DataContent}>({isEdited:false, object:{}})
  const {user} = useSelectorHook(state => state.authSignIn)
  const {category} = useSelectorHook(state => state.getCategory)
  const {content, isLoading} = useSelectorHook(state => state.getContent)
  const {addContentAction, deleteContentAction, editContentAction} = useDispatchHook()
  const dispatch= useDispatch()
  const history= useHistory()
  const {isEdited, object} = isEdit

  const onToggle = () =>{
    setModal(!modal)
    setIsEdit({isEdited:false, object:{}})
    setTitle('')
    setDescription('')
    setPathImg('')
  }
  const onSearchSubmit= (e:React.FormEvent) =>{
    e.preventDefault()

    if(textSearch.trim()){
      history.push(`${Router.ADD_CONTENT}/search/${textSearch}`)
    }else{
      history.push(`${Router.ADD_CONTENT}`)
    }
  }
  const onFileUpload = async (e: any) =>{
    const file= e.target.files[0]
    if(!file){
      return setBoxMessage('Please input the file!')
    }
    if(!file.type.startsWith("image")){
      return setBoxMessage('Image only!')
    }
    if(file.size > 1000000){
      return setBoxMessage("Image is too large!")
    }
    try{
      setIsPending(true)
      setIsBlur(true)
      const imagePath= storage.ref(`/images/${file.name}`)
      await imagePath.put(file)
      const getUrl= await imagePath.getDownloadURL()
      setPathImg(getUrl)
      setIsPending(false)
      setIsBlur(false)
      setBoxMessage('')
    }catch(err:any){
      setBoxMessage(err)
      setIsPending(false)
      setIsBlur(false)
    }
  }

  useEffect(() =>{
    dispatch(getCategoryAction() as any)
    if(content && content.length===0){
      dispatch(getContentAction() as any)
    }

  }, [dispatch, content])

  const onSubmitContent = (e:React.FormEvent) =>{
    e.preventDefault()

    if(!isEdited){
      const values={
        contentTitle: title,
        categoryType: type,
        contentDescription: description,
        picture: pathImg,
        userId: user?.uid,
        userName: user?.displayName
      }
      addContentAction(values)
      setTitle('')
      setDescription('')
      setModal(false)
    }else{
      const contentStructure =  {
        contentTitle: title,
        categoryType: type,
        contentDescription: description,
        picture: pathImg,
        id: object.id
      }
      editContentAction(contentStructure)
      setModal(false)
    }
    
  }

  const onDeleteContent = (id:string) =>{
    if(window.confirm("Are you sure to delete this content")){
      deleteContentAction(id)
    }
  }
  const onEditToggle = (value: any) =>{
    setModal(!modal)
    setIsEdit({isEdited:true, object:value})
    setTitle(`${value.contentTitle}`)
    setDescription(`${value.contentDescription}`)
    setType(`${value.categoryType}`)
    setPathImg(`${value.picture}`)
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
                    <span>Add Content</span>
                  </div>
                </Col>
                <Col xl="6" lg="6" md="6">
                  <div className="box-form">
                    <form onSubmit={onSearchSubmit}>
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
                  <form onSubmit={onSubmitContent}>
                    <ModalHeader toggle={onToggle}>Add Content</ModalHeader>
                    <ModalBody>
                      <div className="box-input-modal">
                          <div className="label">
                            <label>Content Title:</label>
                          </div>
                          <div className="input-text">
                            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} required />
                          </div>
                          <div className="label">
                            <label>Category Type: </label>
                          </div>
                          <div className="input-text">
                            <select required value={type} onChange={(e) => {setType(e.target.value)}}>
                              <option value="">Select the category</option>
                              {category && category.map((val: DataCategory, ind:number) => (
                                <option key={ind} value={val.categoryName}>{val.categoryName}</option>
                              ))}
                            </select>
                          </div>
                          {boxMessage && !isPending && (
                            <div className="box-error-message">
                              <span>{boxMessage}</span>
                            </div>
                          )}
                          {isPending && (
                            <div className="pending-box">
                              <span>Image is uploading!</span>
                            </div>
                          )}
                          <div className="label">Photo</div>
                          <div className="input-text">
                            <input type="hidden" value={pathImg} onChange={(e) => {setPathImg(e.target.value)}} required />
                          </div>
                          <div className="input-text">
                            {pathImg ? <input type="file" onChange={onFileUpload} /> : <input type="file" onChange={onFileUpload} required />}
                          </div>
                          <div className="label">
                            <label>Content Description: </label>
                          </div>
                          <div className="input-text">
                            <textarea required value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                          </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <button className={`btn-submit ${isBlur && `btn-disabled`}`}>Submit</button>
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
                      <th>Category</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Author</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && <Loading />}
                    {content && content.map((value:DataContent, ind:number) =>(
                      <tr key={ind}>
                          <td>{value.id}</td>
                          <td>{value.categoryType}</td>
                          <td>{(value.contentTitle as string).length > 30 ? `${value.contentTitle?.substring(0,30)}...` : `${value.contentTitle}`}</td>
                          <td>{(value.contentDescription as string).length > 30? `${value.contentDescription?.substring(0,30)}...`: `${value.contentDescription}`}</td>
                          <td>{value.userName}</td>
                          <td>
                            <div className="button-edit-del">
                              <div className="btn-update">
                                <GrUpdate onClick={() => {onEditToggle(value)}} />
                              </div>
                              <div className="btn-delete" onClick={() => {onDeleteContent(value.id as string)}}>
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
