import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";

export default function SignInForm() {
  const { theme } = useTheme();
  const { signIn } = useAuth();

  const [userSignInData, setUserSignInData] = useState({
    email: "",
    password: ""
  });

  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      <h3>Sign in!</h3>
      <hr />
      <form>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="email"
          onChange={(e) =>
            setUserSignInData({ ...userSignInData, email: e.target.value })
          }
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="password"
          onChange={(e) =>
            setUserSignInData({ ...userSignInData, password: e.target.value })
          }
        />
      </form>
      <Link
        to="/notes"
        type="button"
        className="btn btn-secondary mb-2"
        onClick={() => signIn(userSignInData.email, userSignInData.password)}
      >
        Sign in
      </Link>
    </div>
  );
}
