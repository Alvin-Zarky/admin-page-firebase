import { Dispatch } from "redux"
import { auth, firestore, timestamp } from "../config/firebase"
import { AuthSignIn, AuthSignOut, AuthSignUp } from "../constants/authConstant"

export const actionSignUp = (displayName:string, email:string, password:any, secret:string) => async(dispatch: Dispatch, getState:() => void) =>{
  try{
    dispatch({ type:AuthSignUp.AUTH_SIGN_UP_REQUEST })
    const secretKey= 'alvindevops'
    if(secret !== secretKey){
      return dispatch({ type: AuthSignUp.AUTH_SIGN_UP_FAIL, payload: `This secret keys isn't available to the admin page area` })
    }

    const res= await auth.createUserWithEmailAndPassword(email, password)
    if(res.user){
      await res.user.updateProfile({displayName})
      dispatch({ type: AuthSignUp.AUTH_SIGN_UP_SUCCESS, payload: res.user })
      dispatch({ type: AuthSignIn.AUTH_SIGN_IN_SUCCESS, payload:res.user })

      const values={
        uid: res.user.uid,
        displayName,
        email,
        createdAt: timestamp,
        role:'user',
        isAdmin:false
      }
      localStorage.setItem('user', JSON.stringify(values))
      return await firestore.collection('users').doc(res.user.uid).set(values)
    }
  }catch(err:any){
    dispatch({ type: AuthSignUp.AUTH_SIGN_UP_FAIL, payload:err.message })
  }
}

export const actionSignIn = (email:string, password:any) => async(dispatch:Dispatch, getState:() => void) =>{
  try{
    dispatch({ type: AuthSignIn.AUTH_SIGN_IN_REQUEST })
    const res= await auth.signInWithEmailAndPassword(email, password)
    if(res.user){
      const values={
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        isAdmin:false,
        role:'user'
      }
      localStorage.setItem('user', JSON.stringify(values))
      return dispatch({ type: AuthSignIn.AUTH_SIGN_IN_SUCCESS, payload: res.user })
    }
  }catch(err:any){
    dispatch({type: AuthSignIn.AUTH_SIGN_IN_FAIL, payload: err.message})
  }
}

export const actionSignOut = () => async(dispatch:Dispatch, getState:() => void) =>{
  try{
    dispatch({ type: AuthSignOut.AUTH_SIGN_OUT_REQUEST })
    localStorage.removeItem('user')
    
    dispatch({ type: AuthSignOut.AUTH_SIGN_OUT_SUCCESS })
    dispatch({ type: AuthSignUp.AUTH_SIGN_UP_SUCCESS, payload: null })
    dispatch({ type: AuthSignIn.AUTH_SIGN_IN_SUCCESS, payload:null })
  }catch(err:any){
    dispatch({ type: AuthSignOut.AUTH_SIGN_OUT_FAIL, payload: err.message })
  }
}