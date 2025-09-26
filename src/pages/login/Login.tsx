import { FormEventHandler, ReactElement, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../../features/auth/hooks/useAuthContext";
import { LoginForm } from "../../features/auth/components/LoginForm";

export function Login(): ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const { login } = useAuthContext();
  const navigate = useNavigate();


  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await login(email, password);
    const redirectTo = searchParams.get("redirectTo") || "/";
    navigate(redirectTo, { replace: true });
  };

  return (
    <main id="login-page" className="g-container">
      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleOnSubmit}
      />
    </main>
  );
}
