import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import { Form, Field } from 'react-final-form'
import styled from 'styled-components';

import {DangerAlert} from '../components/alerts/danger';
import {authenticate} from '../store/toolkit/slices/auth';
import {composeValidators, login, password, required} from '../helpers/validators';
import {getAuthErrorsSelector, getAuthLoading, getIsLogined} from '../store/toolkit/selectors/auth-selector';
import {ILogin} from '../interfaces/login';
import {PasswordInput,TextInput} from '../components/form-inputs/form-input';


const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FormWrapper = styled.section`
  width: 520px;
  min-height: 425px;
  max-height: 505px;
  left: calc(50% - 520px / 2);
  top: 222px;
  background: #ffffff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 40px 30px;
`;

const LogoStyled = styled.img`
  margin-bottom: 20px;
`;

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const errors = useSelector(getAuthErrorsSelector)
  const loading = useSelector(getAuthLoading);
  const isLoggedIn = useSelector(getIsLogined);


  useEffect(() => {
    if (isLoggedIn) {
      history.push('/console');
    }
  }, [isLoggedIn]);


  const onSubmit = async (values: ILogin) => {
    dispatch(authenticate({...values}));
  }

  return (
    <Wrapper>
      <LogoStyled src="/icons/logo.svg" alt="" />
      <FormWrapper>
        <h2>API-консолька</h2>
        {errors && <DangerAlert errors={errors}/>}
        <Form onSubmit={onSubmit} render={({form, submitting, handleSubmit, values}) =>{
            return (<form onSubmit={handleSubmit}>
                      <Field name="login"
                             validate={composeValidators(login,required)}
                             component={TextInput}
                             label={"Логин"}
                      />

                      <Field name="sublogin"
                             validate={composeValidators(login)}
                             component={TextInput}
                             label={"Сублогин"}
                      />

                      <Field name="password"
                             validate={composeValidators(password, required)}
                             component={PasswordInput}
                             label={"Пароль"}
                      />


                      {!loading && <button type="submit" className={"normal"} disabled={submitting}>
                        Войти
                      </button>}

                      {loading && <button className={"normal"}><img src="/icons/load.svg" alt="loading..." /></button>}
                    </form>)
        }}>
        </Form>
      </FormWrapper>
      <div className={"github"} style={{"marginTop": "20px"}}>
        <a href="https://github.com/Nagoluk">Link to my github</a>
      </div>

    </Wrapper>
  );
}

export default LoginPage;
