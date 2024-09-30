"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export default function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
      }}
    >
      {isAuthenticated ? (
        <>
          <h1> You have access to view Dashboard</h1>
          <div>
            <Button
              variant="contained"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1>To show user info get authenticated</h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <Button variant="contained" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button variant="contained" onClick={() => router.push("/signup")}>
              Sign up
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
