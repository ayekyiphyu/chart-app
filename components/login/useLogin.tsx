import { useUser } from "@/auth/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import Router from "next/router";
import React, { useState } from "react";

export default function LoginPage() {
  const { setUser } = useUser();
  const [username, setUsername] = useState("test@gmail.com");
  const [password, setPassword] = useState("1234");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (username && password) {
      setUser({ name: "User", email: username });
      Router.push("/entering");
    } else {
      console.error("Username or password is missing");
    }
  };

  const boxstyle = {
    backgroundColor: "#ffffff",
    width: "480px",
    height: "auto",
    borderRadius: "12px",
    padding: "40px 80px",
  };

  return (
    <div style={boxstyle}>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0px",
          }}
        >
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="メールアドレス"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, backgroundColor: "#2563EB" }}
            >
              ログイン
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
