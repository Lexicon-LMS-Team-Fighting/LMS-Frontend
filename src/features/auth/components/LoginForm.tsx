import { ReactElement, FormEventHandler } from "react";
import { TextInput } from "./TextInput";
/* import { RoleSelector } from "./RoleSelector"; */
import { IconButton } from "../../shared/components/IconButton";

interface ILoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  error: string;
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error
}: ILoginFormProps): ReactElement {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <span className="material-symbols-outlined book-icon">menu_book</span>
      <h1 className="login-form-h1">Lexicon LMS</h1>
      <fieldset className="form-fieldset">
        <TextInput
          id="email"
          label="Användarnamn"
          type="text"
          value={email}
          onChange={onEmailChange}
          labelStyle="email-label"
        />
        <TextInput
          id="password"
          label="Lösenord"
          type="password"
          value={password}
          onChange={onPasswordChange}
          labelStyle="password-label"
        />

        {error && <p role="alert" className="login-error text-danger mt-2">{error}</p>}

        <IconButton icon="login" name="Logga in" addStyle="login-btn" />
      </fieldset>

      {/* <a className="forgot-password-link" href="#">
        Glömt lösenord?
      </a> */}
    </form>
  );
}
