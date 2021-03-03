import {IFormField} from '../interfaces/common';

export const required = (value: IFormField) => (value ? undefined : 'Required')
export const login = (value: IFormField) => {
  if(value) {
    return (value.match(/(^[a-z0-9_]+$)|(^\S+@\S+\.\S+$)/gmsi) === null ? 'incorrect login' : undefined)
  }
}

export const password = (value: IFormField) => {
  if(value){
    return (value.match(/^[^а-яА-Я]+$/gmsi) === null ? 'incorrect password' : undefined)
  }
}

export const composeValidators = (...validators: Function[]) => (value: IFormField) => validators.reduce((error, validator) => error || validator(value), undefined)
