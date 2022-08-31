import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authSignInReducer, authSignOutReducer, authSignUpReducer } from "./reducers/authReducer";
import { addCategoryReducer, addContentReducer, deleteCategoryReducer, deleteContentReducer, editCategoryReducer, editContentReducer, getCategoryReducer, getContentReducer, searchCategoryReducer, searchContentReducer } from "./reducers/interfaceReducer";

const reducers= combineReducers({
  authSignUp: authSignUpReducer,
  authSignIn: authSignInReducer,
  authSignOut: authSignOutReducer,
  addCategory: addCategoryReducer,
  getCategory: getCategoryReducer,
  editCategory: editCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  searchCategory: searchCategoryReducer,
  addContent: addContentReducer,
  getContent: getContentReducer,
  editContent: editContentReducer,
  deleteContent: deleteContentReducer,
  searchContent: searchContentReducer
})

const userFromLocalStorage= JSON.parse(localStorage.getItem('user')!)
const initialState={
  authSignIn:{ user: userFromLocalStorage }
}
const middleware= [thunk]

const store= createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;

export type RootState = ReturnType<typeof reducers>