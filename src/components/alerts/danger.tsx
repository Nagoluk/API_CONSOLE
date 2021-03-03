import React from 'react';
import styled from 'styled-components';
import {IError} from '../../interfaces/common';

const Alert = styled.div`
  padding: 15px 12px;
  background: rgba(207, 44, 0, 0.1);
  border-radius: 5px;
  color: red!important;
  margin-bottom: 10px;
  display: flex;
  
  &  h3 {
    font-size: 18px;
    font-weight: 400;
    color: red!important;
    margin: 0;
  }
  
  & .subtitle {
    font-size: 12px;
  }
  
  & .sad-men {
    margin-right: 5px;
  }
`

export const DangerAlert: React.FC<{errors: IError}> = ({errors}) => {
  return <Alert>
            <div className={"sad-men"}>
              <img src="/icons/sad-men.svg" alt="sad" />
            </div>
            <div>
              <h3>Вход не вышел</h3>
              <span className={"subtitle"}>{JSON.stringify(errors)}</span>
            </div>
        </Alert>
}