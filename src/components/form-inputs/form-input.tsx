import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string, any>;

export const TextInput: React.FC<Props & {label: string}> = ({ input, meta, ...rest }: Props) =>
  (<div className={"form__item " + ((meta.error && meta.touched) ? "error" : null)}>
    <label>{rest.someArbitraryOtherProp}</label>
    <input type="text" {...input} {...rest} />
  </div>);

export const PasswordInput: React.FC<Props & {label: string}> = ({ input, meta, ...rest }: Props) =>
  (<div className={"form__item " + ((meta.error && meta.touched) ? "error" : null)}>
    <label>{rest.someArbitraryOtherProp}</label>
    <input type="password" {...input} {...rest} />
  </div>);
