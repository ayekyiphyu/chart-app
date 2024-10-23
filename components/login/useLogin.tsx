import { useUser } from "@/auth/auth";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

// Mock user database
const users = [{ username: "test@example.com", password: "123" }];

export default function LoginPage() {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setUser({ name: "User", email: username });
      Router.push("/entering");
    } else {
      setError("Invalid username or password");
    }
  };

  const boxStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    width: "480px",
    height: "auto",
    borderRadius: "12px",
    padding: "40px 80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const formStyle = {
    width: "100%",
    marginTop: "16px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "100%",
    margin: "40px 0 0 0",
    backgroundColor: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    height: "42px",
  };

  return (
    <div style={boxStyle}>
      <h1 className="font-bold text-[24px]">ログイン</h1>
      <form onSubmit={handleSubmit} style={formStyle} noValidate>
        <label className="font-bold text-[16px]">メールアドレス</label>
        <input
          className="mt-[8px] mb-[24px]"
          type="email"
          id="username"
          name="username"
          placeholder="メールアドレス"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          required
        />
        <label className="pt-[24px] font-bold text-[16px]">パスワード</label>
        <input
          className="mt-[8px]"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={buttonStyle}>
          ログイン
        </button>
        <p className="text-center pt-[1rem]">
          Don't have an account? &nbsp;
          <Link href="/signUp" className="m-r[2rem] font-bold underline">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}
