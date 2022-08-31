import { Dispatch } from "redux";
import { AddCategory, DeleteCategory, DeleteContent, EditCategory, EditContent, GetCategory, GetContent, SearchCategory, SearchContent } from "../constants/interfaceConstant";
import { firestore, timestamp } from "../config/firebase";
import { GetCategoryActionTypes } from "./actionDispatchTypes/interfaceActionType";
import {RootState} from "../store"
import { AddContent } from "../constants/interfaceConstant";

export interface DataCategory{
  categoryName?:string,
  slugUrl?:string,
  userId?:string,
  userName?:string,
  id?: string,
  createdAt?: any
}
export interface DataContent{
  contentTitle?: string,
  categoryType?: string,
  contentDescription?: string,
  userId?: string,
  userName?: string,
  id?:string,
  picture?:string
}
export const addCategoryAction = (data: DataCategory) => async(dispatch: Dispatch, getState:() => void) =>{
  try{
    dispatch({ type: AddCategory.ADD_CATEGORY_REQUEST })
    
    const values={
      ...data,
      createdAt: timestamp
    }
    await firestore.collection('categories').add(values)
    return dispatch({ type: AddCategory.ADD_CATEGORY_SUCCESS, payload: values })
  }catch(err:any){
    dispatch({ type: AddCategory.ADD_CATEGORY_FAIL, payload: err.message })
  }
}

export const getCategoryAction = () => async(dispatch:Dispatch<GetCategoryActionTypes>, getState: () => void) => {
  try{
    dispatch({ type: GetCategory.GET_CATEGORY_REQUEST })
    
    firestore.collection('categories').orderBy("createdAt", "desc").onSnapshot(snapshot =>{
      if(!snapshot.empty){
        const data:any[] =[]
        snapshot.docs.forEach(value =>{
          data.push({
            ...value.data(),
            id: value.id
          })
        })
        dispatch({ type:GetCategory.GET_CATEGORY_SUCCESS, payload: data })
      }else{
        dispatch({ type: GetCategory.GET_CATEGORY_FAIL, payload: 'Data not found' })
      }
    })
  }catch(err:any){
    dispatch({ type: GetCategory.GET_CATEGORY_FAIL, payload: err.message })
  }
}

export const editCategoryAction = (values: DataCategory) => async(dispatch:Dispatch, getState:() => void) =>{
  try{  
    dispatch({ type: EditCategory.EDIT_CATEGORY_REQUEST })
    return await firestore.collection('categories').doc(values.id).update({
      categoryName: values.categoryName,
      slugUrl: values.slugUrl
    }).then(() =>{
      dispatch({ type: EditCategory.EDIT_CATEGORY_SUCCESS })
    })
  }catch(err:any){
    dispatch({ type: EditCategory.EDIT_CATEGORY_FAIL, payload: err.message })
  }
}

export const deleteCategoryAction = (id:string) => async(dispatch:Dispatch, getState:() => RootState) =>{
  try{
    dispatch({ type: DeleteCategory.DELETE_CATEGORY_REQUEST })

    return firestore.collection('categories').doc(id).delete().then(() =>{
      dispatch({ type: DeleteCategory.DELETE_CATEGORY_SUCCESS })
    })
  }catch(err:any){
    dispatch({ type: DeleteCategory.DELETE_CATEGORY_FAIL, payload: err.message })
  }
}

export const searchCategoryAction = (keyword: string | any) => async(dispatch:Dispatch, getState:() => void) =>{
  try{
    dispatch({ type: SearchCategory.SEARCH_CATEGORY_REQUEST })
    firestore
      .collection('categories')
      .orderBy('categoryName')
      .where(`categoryName`, ">=", keyword.charAt(0).toUpperCase() + keyword.slice(1))
      .where("categoryName", "<=", keyword.charAt(0).toUpperCase() + keyword.slice(1) + "\uf8ff")
      .onSnapshot(snapshot =>{
        if(Number(snapshot.size) > 0){
          const docs:any[] =[]
          snapshot.docs.forEach(val => {
            docs.push({
              ...val.data(),
              id:val.id
            })
          })
          dispatch({ type: SearchCategory.SEARCH_CATEGORY_SUCCESS, payload: docs })
        }else{
          dispatch({ type: SearchCategory.SEARCH_CATEGORY_FAIL, payload: 'Data search not found' })
        }
      })
    dispatch({ type: SearchCategory.SEARCH_CATEGORY_SUCCESS })
  }catch(err:any){
    console.log(err)
    dispatch({ type: SearchCategory.SEARCH_CATEGORY_FAIL, payload: err.message })
  }
}


export const addContentAction = (values: DataContent) => async(dispatch:Dispatch, getState:() => void) =>{
  try{
    dispatch({ type: AddContent.ADD_CONTENT_REQUEST })

    const data={
      ...values,
      createdAt: timestamp
    }
    await firestore.collection('contents').add(data)
    return dispatch({ type: AddContent.ADD_CONTENT_SUCCESS })
  }catch(err:any){
    dispatch({ type: AddContent.ADD_CONTENT_FAIL, payload: err.message })
  }
}

export const getContentAction = () => async(dispatch:Dispatch, getState:() => RootState) =>{
  try{
    dispatch({ type: GetContent.GET_CONTENT_REQUEST })
    firestore.collection('contents').orderBy("createdAt", "desc").onSnapshot(snapshot =>{
      if(Number(snapshot.size) > 0){
        const array:DataContent[]=[]
        snapshot.docs.forEach(val =>{
          array.push({
            ...val.data(),
            id: val.id
          })
        })
        dispatch({ type: GetContent.GET_CONTENT_SUCCESS, payload: array })
      }else{
        dispatch({ type: GetContent.GET_CONTENT_FAIL, payload: 'Data content not found' })
      }
    })
  }catch(err:any){
    dispatch({ type: GetContent.GET_CONTENT_FAIL, payload: err.message })
  }
}

export const editContentAction = (values: DataContent) => async(dispatch:Dispatch, getState:() => void) =>{
  try{
    dispatch({ type: EditContent.EDIT_CONTENT_REQUEST })

    return await firestore.collection('contents').doc(values.id).update(values).then(() =>{
      dispatch({ type: EditContent.EDIT_CONTENT_SUCCESS })
    })
  }catch(err:any){
    dispatch({ type: EditContent.EDIT_CONTENT_FAIL, payload: err.message })
  }
}

export const deleteContentAction = (id:string) => async(dispatch:Dispatch, getState:() => void) =>{
  try{  
    dispatch({ type: DeleteContent.DELETE_CONTENT_REQUEST})
    
    return await firestore.collection('contents').doc(id).delete().then(() =>{
      dispatch({ type: DeleteContent.DELETE_CONTENT_SUCCESS})
    }) 
  }catch(err:any){
    dispatch({ type: DeleteContent.DELETE_CONTENT_FAIL, payload: err.message })
  }
}

export const searchContentAction = (keyword:string) => async(dispatch:Dispatch, getState:() => void) =>{
  try{
    dispatch({ type: SearchContent.SEARCH_CONTENT_REQUEST })
    firestore
      .collection('contents')
      .orderBy("categoryType")
      .where(`categoryType`, ">=", keyword.charAt(0).toUpperCase() + keyword.slice(1))
      .where("categoryType", "<=", keyword.charAt(0).toUpperCase() + keyword.slice(1) + "\uf8ff")
      .onSnapshot(snapshot =>{
        if(!snapshot.empty){
          const array: DataContent[]=[]
          snapshot.docs.forEach(val =>{
            if(val.exists){
              array.push({
                ...val.data(),
                id:val.id
              })
            }
          })
          dispatch({ type: SearchContent.SEARCH_CONTENT_SUCCESS, payload: array })
        }else{
          dispatch({ type: SearchContent.SEARCH_CONTENT_FAIL, payload: 'Data content not found' })
        }
      })
  }catch(err:any){
    dispatch({ type: SearchContent.SEARCH_CONTENT_FAIL, payload: err.message })
  }
}