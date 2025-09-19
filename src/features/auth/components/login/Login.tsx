import { FormEventHandler, ReactElement, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

export function Login(): ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<string>("student");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    //Add role here when it's implemented
    await login(email, password);

    const redirectTo = searchParams.get("redirectTo") || "/";
    navigate(redirectTo, { replace: true });
  };

  return (
    <main id="login-page" className="g-container">
      <form className="login-form" onSubmit={handleOnSubmit}>
        <span className="material-symbols-outlined book-icon">menu_book</span>
        <h1 className="login-form-h1">Lexicon LMS</h1>
        <fieldset className="form-fieldset">
          {/* <legend>Login</legend> */}
          <label className="email-label" htmlFor="email">
            E-postadress
          </label>
          <input id="email" onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
          <label className="password-label" htmlFor="password">
            Lösenord
          </label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          <div className="role-container">
            <label className="role-label">Välj roll</label>
            <div className="role-input-container">
              <label className="student-role-label">
                <input
                  className="role-input"
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                />
                <span>Elev</span>
              </label>
              <label className="teacher-role-label">
                <input
                  className="role-input"
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={() => setRole("teacher")}
                />
                <span>Lärare</span>
              </label>
            </div>
          </div>
          <button className="btn btn-primary login-btn" type="submit">
            <span className="material-symbols-outlined">login</span> Logga in
          </button>
        </fieldset>
        <a className="forgot-password-link" href="#">
          Glömt lösenord?
        </a>
      </form>
    </main>
  );
}
