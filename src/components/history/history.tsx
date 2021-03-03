import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import { Menu, Dropdown } from 'antd';
import {IRequests} from '../../interfaces/requests';
import {getHistory} from '../../store/toolkit/selectors/history-selector';
import { clearAll, deleteItem, getHistoryFromLocalStore, sendRequest, setRequestField } from '../../store/toolkit/slices/requests';


const HistoryWrapStyled = styled.div`
  background: #F6F6F6;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
  height: 55px; 
`

const HistoryLine = styled.div`
  overflow-x: scroll;
  display: flex;
  padding: 2px;
  
  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const HistoryItemStyled = styled.div<{status: string}>`
  position: relative;
  z-index: 999999;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  overflow: hidden;

  &::before {
    content: " ";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: ${props => props.status === "success" ? "green" : "red"};
    margin-right: 5px;
  }
  
  & .dots {
    margin-left: 9px;
    cursor: pointer;
  }
`

const Clear = styled.button`
   height: 53px;
   width: 50px;
   background: #F6F6F6;
   position: absolute;
   right: 0;
   top: 0px;
   border-left: 1px solid #C4C4C4;
   border-radius: 0px;
`


const BaseMenuItem = styled(Menu.Item)`
  &:hover {
    background: #0055FB;
    color: #fff;
  }
`

const DeleteMenuItem = styled(BaseMenuItem)`
  &:hover {
      background: red;
  }
`

const CopyAnimation = styled.div`
  background: #F6F6F6;
  padding: 3px;
  border-radius: 3px;
  position: absolute;
  width: 100%;
  font-size: 10px;
  text-overflow: ellipsis; 
  left: 0;
  top: -30px;
`


const HistoryItem = (props: IRequests & {index: number}) => {
  const dispatch = useDispatch()
  const [fade, setFade] = useState(false)

  const menu = (
    <Menu>
      <BaseMenuItem key="0" onClick={() => {
        dispatch(setRequestField(props.request))
        dispatch(sendRequest())
      }}>
        Выполнить
      </BaseMenuItem>
      <BaseMenuItem key="1" onClick={() => {
        setFade(true)
        navigator.clipboard.writeText(props.request)
      }}>
        Скопировать
      </BaseMenuItem>
      <Menu.Divider />
      <DeleteMenuItem key="2"
        onClick={
          () => dispatch(deleteItem(props.index))
        }
      >Удалить</DeleteMenuItem>
    </Menu>
  );


  return <HistoryItemStyled status={props.status}>
            <CopyAnimation className={fade ? " active": ""} onAnimationEnd={() => setFade(false)}>Скопировано</CopyAnimation>
            <span onClick={
              () => {
                dispatch(setRequestField(props.request))
              }
            }>{props.action}</span>

            <Dropdown overlay={menu} trigger={['click']} placement={'bottomCenter'}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <img src="/icons/dots.svg" alt="..." className={"dots"} />
              </a>
            </Dropdown>

        </HistoryItemStyled>
}

export const History: React.FC = () => {
  const dispatch = useDispatch()
  const requestHistory = useSelector(getHistory)

  useEffect(() => {
    dispatch(getHistoryFromLocalStore())
  }, [])


  return (<HistoryWrapStyled>
            <HistoryLine>
              {requestHistory.map( (request, index) => {
                return <HistoryItem {...request} key={request.id + index } index={index}/>
              }).reverse()}

            </HistoryLine>

            <Clear onClick={() => dispatch(clearAll())}><img src="/icons/cross.svg" alt="Cancel" /></Clear>
          </HistoryWrapStyled>)
}