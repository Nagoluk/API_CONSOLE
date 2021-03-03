import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

import { useHistory } from "react-router-dom";
import {getIsLogined, getLogin, getSubLogin} from '../store/toolkit/selectors/auth-selector';
import {setFullScreenToggle} from '../helpers/fullscreen';
import { checkAutorization, logout} from '../store/toolkit/slices/auth';

import {setRequestField } from '../store/toolkit/slices/requests';
import {History} from '../components/history/history';
import {sendRequest} from '../store/toolkit/slices/requests';
import {
  getRequestError,
  getRequestField,
  getResponseError,
  getResponseValue,
} from '../store/toolkit/selectors/request-selectors';
import {Resizable} from 're-resizable';

//@ts-ignore
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';


const Header = styled.div`
  background: #F6F6F6;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`

const Logo = styled.div`
  display: flex;
    
  & h2 {
    margin-left: 20px;
    font-size: 20px;
    margin-top: 10px;
  }
`
const Activity = styled.div`
   font-size: 16px;
   display: flex;
   align-items: center;
`

const Login = styled.div`
   border: 1px solid rgba(0, 0, 0, 0.2);
   border-radius: 5px;
   padding: 2px 10px;
`

const LogoutText = styled.div`
  margin-left: 30px;
`

const FullScreen = styled.img`
  margin-left: 30px;
  cursor: pointer;
`

const LogoutIcon = styled.img`
  margin-left: 11px;
  cursor: pointer;
`

const ConsoleFields = styled.div`
  background: #fff;
  padding: 10px 15px;
  height: calc(100vh - 60px - 54px - 76px);
  display: flex;
  justify-content: space-around;
  overflow: hidden;

  
  & > div {
    width: 100%;
    height: 100%;
    margin: 5px;
  }
  
  & .title {
    font-size: 12px;
    color: #999;
  }
  
  & textarea {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    width: 100%;
    resize: none;
    height: 95%;
  }
`

const Footer = styled.div`
  padding: 15px;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & .format {
    display: flex;
    align-items: center;
  }
  
   & .format > div {
    margin-left: 5px;
   }
`

const ChangeSizeStyled = styled.img`
  position: absolute;
  top: 50%;
  left: 100.25%;
`

export function Console () {
  const dispatch = useDispatch()
  const history = useHistory()

  const login = useSelector(getLogin)
  const sublogin = useSelector(getSubLogin)
  const request = useSelector(getRequestField)
  const response = useSelector(getResponseValue)
  const isLoggedIn = useSelector(getIsLogined);
  const requestError = useSelector(getRequestError)
  const responseError = useSelector(getResponseError)

  const [isFullScreen, setIsFullScreen] = useState(!!document.fullscreenElement)

  useEffect(() => {
    dispatch(checkAutorization())
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  const send = () =>{
    dispatch(sendRequest())
  }

  const format = () => {
    // try {
    //   setRequsetError(false)
    //   setRequest(JSON.stringify(JSON.parse(request), null, 2))
    // }catch (e){
    //   setRequsetError(true)
    // }
  }


  return <div>
            <Header>
              <Logo>
                <img src="/icons/logo.svg" alt="logo" />
                <h2>API-консолька</h2>
              </Logo>

              <Activity>
                <Login>{login + (!!sublogin ? ":" + sublogin : "")}</Login>

                <LogoutText>Выйти</LogoutText>

                <LogoutIcon src="/icons/log-out.svg" alt="Logout" onClick={() => dispatch(logout())}/>

                <FullScreen src={"/icons/" + (isFullScreen ? "full-screen-active.svg":"full-screen.svg")} alt="Fullscreen" onClick={() => setFullScreenToggle(setIsFullScreen)}/>
              </Activity>
            </Header>

            <History/>

            <ConsoleFields>
              <Resizable
                enable={{
                  right: true,
                }}
                defaultSize={{height: "100%", width:"50%"}}
                maxWidth={"70%"}
                minWidth={"30%"}
              >
                <div className={"form__item " + (requestError ? "error": "") } style={{height: "100%"}}>
                  <label className={"title"}>Запрос:</label>
                  {/*<Editor value={request} />*/}
                  <textarea value={request}
                            onChange={(e) => dispatch(setRequestField(e.target.value)) }>

                  </textarea>
                </div>
                <ChangeSizeStyled src="/icons/dots.svg" alt="..." />
              </Resizable>
              <div className={"form__item "  + (responseError ? "error": "")}>
                <label className={"title"}>Ответ: </label>
                <textarea value={response} readOnly></textarea>
              </div>

            </ConsoleFields>
            <Footer>
              <button className={"normal"} onClick={() => send()} disabled={request === ""}>Отправить</button>

              <div className={"github"}>
                <a href="https://github.com/Nagoluk">Link to my github</a>
              </div>

              <div className={"format"} onClick={format}>
                <img src="/icons/format.svg" alt="" />
                <div>Форматировать</div>
              </div>
            </Footer>
        </div>
}