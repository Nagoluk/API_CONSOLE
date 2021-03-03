import {IFormField} from './common';

export interface ILogin {
  login: IFormField,
  sublogin: IFormField,
  password: IFormField
}

export type ILoginWithSessionKey = ILogin & {sessionKey: string}