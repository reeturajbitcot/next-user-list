"use client";
import { login } from "@/store/slice/authSlice";
import { handleLogin } from "@/utils/api";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let userData = {
      email,
      password,
    };

    try {
      const resultAction = await handleLogin({ data: userData });

      if (!resultAction.hasOwnProperty("employee")) {
        Swal.fire({
          title: "Oops...",
          text: "User Not found",
          icon: "error",
          confirmButtonText: "Close",
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          title: "Successful",
          text: "User Created successfully",
          icon: "success",
          confirmButtonText: "Close",
          timer: 1500,
          timerProgressBar: true,
        }).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.timer
          ) {
            dispatch(login());
            router.push("/dashboard");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signupClick = () => {
    router.push("/signup");
  };

  if (isAuthenticated) {
    router.push("/dashboard");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        flexDirection: "column",
      }}
    >
      <h1>Login</h1>
      <div
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <small>Don't have an account?</small>
          <Button variant="outlined" onClick={signupClick}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
