import { FormEventHandler, ReactElement, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../../features/auth/hooks/useAuthContext";
import { LoginForm } from "../../features/auth/components/LoginForm";
import { CustomError } from "../../features/shared/classes";

export function Login(): ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");


    const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");

      
    try {
      await login(email, password);         
      const redirectTo = searchParams.get("redirectTo") || "/";
      navigate(redirectTo, { replace: true }); 
    } catch (err) {
      if (err instanceof CustomError) {
        if (err.errorCode === 401) setError("Fel användarnamn eller lösenord");
        else setError(err.message || "Ett oväntat fel uppstod, försök igen senare.");
      } else {
        setError("Ett oväntat fel uppstod.");
      }
    }

  };

  return (
    <main id="login-page" className="g-container">
      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleOnSubmit}
        error={error}
      />

 
    </main>
  );
}
