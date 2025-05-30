import { useState } from "react";
import "../style/Authpage.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={`auth-container ${isLogin ? "show-login" : "show-register"}`}>
      <div className="form-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form className={isLogin ? "login-form" : "register-form"}>
          <div className="input-group">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          {!isLogin && (
            <>
              <div className="input-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="input-group">
                <select>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <button onClick={toggleMode} className="toggle-btn">
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}