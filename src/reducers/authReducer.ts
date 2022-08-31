import { AuthSignIn, AuthSignOut, AuthSignUp } from "../constants/authConstant"

interface InitialState{
  user?: any,
  isLoading?:boolean,
  isSuccess?:boolean,
  isError?:boolean,
  message?: any 
}

interface Action{
  payload: any,
  type: string
}

const initialState: InitialState={
  user:null,
  isLoading:false,
  isSuccess:false,
  isError:false,
  message:null
}

export const authSignUpReducer= (state = initialState, action: Action): InitialState => { 
  switch(action.type){
    case AuthSignUp.AUTH_SIGN_UP_REQUEST:
      return { isLoading:true }
    case AuthSignUp.AUTH_SIGN_UP_SUCCESS:
      return { isLoading:false, isSuccess:true, user: action.payload }
    case AuthSignUp.AUTH_SIGN_UP_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const authSignInReducer= (state = initialState, action: Action):InitialState =>{
  switch(action.type){
    case AuthSignIn.AUTH_SIGN_IN_REQUEST:
      return { isLoading:true }
    case AuthSignIn.AUTH_SIGN_IN_SUCCESS:
      return { isLoading:false, user: action.payload, isSuccess:true }
    case AuthSignIn.AUTH_SIGN_IN_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const authSignOutReducer= (state= {user: null, isLoading:false}, action: Action):InitialState =>{
  switch(action.type){
    case AuthSignOut.AUTH_SIGN_OUT_REQUEST:
      return { isLoading:true }
    case AuthSignOut.AUTH_SIGN_OUT_SUCCESS:
      return { isLoading:false, user: null, isSuccess:true }
    case AuthSignOut.AUTH_SIGN_OUT_FAIL:
      return { isLoading:false, isError:true, message: action.payload, isSuccess:false }
    default:
      return state
  }
}