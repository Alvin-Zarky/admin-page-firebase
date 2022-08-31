import {actionSignUp, actionSignIn, actionSignOut} from "../actions/authAction"
import {addCategoryAction, getCategoryAction, deleteCategoryAction, editCategoryAction, searchCategoryAction, addContentAction, getContentAction, deleteContentAction, searchContentAction,editContentAction} from "./interfaceAction"

const actionCreators= {
  actionSignUp,
  actionSignIn,
  actionSignOut,
  addCategoryAction,
  getCategoryAction,
  editCategoryAction,
  deleteCategoryAction,
  searchCategoryAction,
  addContentAction,
  getContentAction,
  editContentAction,
  deleteContentAction,
  searchContentAction
}
export default actionCreators