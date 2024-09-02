import { useUser } from "@/auth/auth";
import Router from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const { setUser } = useUser();
  const [username, setUsername] = useState("test@gmail.com");
  const [password, setPassword] = useState("1234");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (username && password) {
      setUser({ name: "User", email: username });
      Router.push("/entering");
    } else {
      console.error("Username or password is missing");
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
        <label className="font-bold text-[16px] ">メールアドレス</label>
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
        <button type="submit" style={buttonStyle}>
          ログイン
        </button>
      </form>
    </div>
  );
}
