import { FormEventHandler, ReactElement, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../../features/auth/hooks/useAuthContext";
import { LoginForm } from "../../features/auth/components/LoginForm";

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
      <LoginForm
        email={email}
        password={password}
        role={role}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onRoleChange={setRole}
        onSubmit={handleOnSubmit}
      />
    </main>
  );
}
