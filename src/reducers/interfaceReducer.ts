import { AddCategory, AddContent, DeleteCategory, DeleteContent, EditCategory, EditContent, GetCategory, GetContent, SearchCategory, SearchContent } from "../constants/interfaceConstant";

interface InitialState{
  category?: any,
  content?: any,
  isLoading?:boolean,
  isError?:boolean,
  isSuccess?:boolean,
  message?: any
}

interface Action{
  type:string,
  payload: any
}

export const addCategoryReducer= (state:InitialState={category:[], isLoading:false}, action:Action): InitialState =>{
  switch(action.type){
    case AddCategory.ADD_CATEGORY_REQUEST:
      return { isLoading:true }
    case AddCategory.ADD_CATEGORY_SUCCESS:
      return { isLoading:false, category: action.payload, isSuccess:true }
    case AddCategory.ADD_CATEGORY_FAIL:
      return { isLoading:false, isError:true, message: action.payload, isSuccess:false }
    default:
      return state
  }
}

export const getCategoryReducer= (state:InitialState ={ category:[], isLoading:false }, action:Action) : InitialState => {
  switch(action.type){
    case GetCategory.GET_CATEGORY_REQUEST:
      return { isLoading:true }
    case GetCategory.GET_CATEGORY_SUCCESS:
      return { isLoading:false, category:action.payload, isSuccess:true }
    case GetCategory.GET_CATEGORY_FAIL:
      return { isLoading:false, isError:true, isSuccess:false, message:action.payload }
    default:
      return state
  }
}

export const editCategoryReducer= (state: InitialState= {category:{}, isLoading:false}, action:Action) :InitialState => {
  switch(action.type){
    case EditCategory.EDIT_CATEGORY_REQUEST:
      return { isLoading:true }
    case EditCategory.EDIT_CATEGORY_SUCCESS:
      return { isLoading:false, category:action.payload, isSuccess:true }
    case EditCategory.EDIT_CATEGORY_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message:action.payload }
    default:
      return state
  }
}

export const deleteCategoryReducer= (state: InitialState= { category:{}, isLoading:false }, action:Action) : InitialState =>{
  switch(action.type){
    case DeleteCategory.DELETE_CATEGORY_REQUEST:
      return { isLoading:true }
    case DeleteCategory.DELETE_CATEGORY_SUCCESS:
      return { isLoading:false, category:action.payload, isSuccess:true }
    case DeleteCategory.DELETE_CATEGORY_FAIL:
      return { isLoading:false, isError:true, isSuccess:false, message:action.payload }
    default:
      return state
  }
}

export const searchCategoryReducer = (state:InitialState = {category:[], isLoading:false}, action:Action):InitialState =>{
  switch(action.type){
    case SearchCategory.SEARCH_CATEGORY_REQUEST:
      return {isLoading:true}
    case SearchCategory.SEARCH_CATEGORY_SUCCESS:
      return { isLoading:false, category: action.payload, isSuccess:true }
    case SearchCategory.SEARCH_CATEGORY_FAIL:
      return { isLoading:false, message: action.payload, isSuccess:false, isError:true }
    default:
      return state
  }
}


export const addContentReducer= (state:InitialState = {content:[], isLoading:false}, action:Action): InitialState =>{
  switch(action.type){
    case AddContent.ADD_CONTENT_REQUEST:
      return { isLoading:true }
    case AddContent.ADD_CONTENT_SUCCESS:
      return { isLoading:false, content:action.payload, isSuccess:true }
    case AddContent.ADD_CONTENT_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const getContentReducer= (state:InitialState = {content:[], isLoading:false}, action:Action): InitialState =>{
  switch(action.type){
    case GetContent.GET_CONTENT_REQUEST:
      return { isLoading:true }
    case GetContent.GET_CONTENT_SUCCESS:
      return { isLoading:false, content:action.payload, isSuccess:true }
    case GetContent.GET_CONTENT_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const editContentReducer= (state:InitialState = {content:{}, isLoading:false}, action:Action): InitialState =>{
  switch(action.type){
    case EditContent.EDIT_CONTENT_REQUEST:
      return { isLoading:true }
    case EditContent.EDIT_CONTENT_SUCCESS:
      return { isLoading:false, content:action.payload, isSuccess:true }
    case EditContent.EDIT_CONTENT_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const deleteContentReducer= (state:InitialState = {content:{}, isLoading:false}, action:Action): InitialState =>{
  switch(action.type){
    case DeleteContent.DELETE_CONTENT_REQUEST:
      return { isLoading:true }
    case DeleteContent.DELETE_CONTENT_SUCCESS:
      return { isLoading:false, content:action.payload, isSuccess:true }
    case DeleteContent.DELETE_CONTENT_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const searchContentReducer= (state:InitialState = {content:[], isLoading:false}, action:Action): InitialState =>{
  switch(action.type){
    case SearchContent.SEARCH_CONTENT_REQUEST:
      return { isLoading:true }
    case SearchContent.SEARCH_CONTENT_SUCCESS:
      return { isLoading:false, content:action.payload, isSuccess:true }
    case SearchContent.SEARCH_CONTENT_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message: action.payload }
    default:
      return state
  }
}
