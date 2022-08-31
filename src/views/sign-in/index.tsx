import React, {useState} from 'react';
import {Row, Col, Container} from "reactstrap";
import ImgBackground from "../../assets/img/black-forest.jpg";
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri";
import {BsArrowRight} from "react-icons/bs";
import {MdOutlineEmail} from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { Router } from '../../router';
import useSelectorHook from '../../hooks/useSelectorHook';
import useDispatchHook from '../../hooks/useDispatchHook';
import './sign-in.scss';

export default function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShow, setIsShow]= useState(false)
  const {message, isLoading} = useSelectorHook(state => state.authSignIn)
  const {actionSignIn} = useDispatchHook()

  const onSubmitForm= (e:React.FormEvent) => {
    e.preventDefault();
    actionSignIn(email, password)
  }

  return (
    <>
      <Container fluid className='container-width'>
        <Row>
          <Col xl="5" lg="5" md="5" className="left-side-width">
            <div></div>
          </Col>
          <Col xl="7" lg="7" md="7" className="right-side-width">
            <div></div>
          </Col>
        </Row>
        <Row>
          <div className="box-pop-form">
            <Row>
              <Col xl="6" lg="6" md="6" className="left-box-form">
                <div className="box-overview">
                  <img src={ImgBackground} alt="scenery" />
                  <div className="background-blur">
                    <div className="box-sub-title">
                      <h3>Nature</h3>
                      <span>Relaxing Your mind From Madness</span>
                    </div>
                    <div className="underline"></div>
                    <div className="box-credition">
                      <div className="title"><span>calm & relaxed</span></div>
                      <div className="description">
                        <span>Contact: +62 891 7333 8801</span>
                      </div>
                      <div className="linkin">
                        <span>www.naturelax.co</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl="6" lg="6" md="6" className="right-box-form">
                <div className="form-submit">
                  <div className="title-form">
                    <span>Login Here!</span>
                  </div>
                  <form onSubmit={onSubmitForm}>
                    <div className="box-input">
                      <div className="icon-input">
                        <MdOutlineEmail />
                      </div>
                      <div className="input-text">
                        <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' required />
                      </div>
                    </div>
                    <div className="box-input">
                      <div className="icon-input">
                        <RiLockPasswordLine />
                      </div>
                      <div className="input-text">
                        <input type={isShow ? "text" : "password"} value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' required />
                        {isShow ? <AiFillEyeInvisible className='show-password' onClick={() => {setIsShow(false)}} />: <AiFillEye className="show-password" onClick={() => {setIsShow(true)}} />}
                      </div>
                    </div>
                    {isLoading && <button>Loggin In... <BsArrowRight /></button>}
                    {!isLoading && <button>Log In <BsArrowRight /></button>}
                  </form>
                </div>
                {message && (
                  <div className="box-error-message">
                    <span>{message}</span>
                  </div>
                )}
                <div className="bottom-description">
                  <p>Don't have an account? Create your account <NavLink to={Router.SIGN_UP}>here/</NavLink></p>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </>
  )
}
