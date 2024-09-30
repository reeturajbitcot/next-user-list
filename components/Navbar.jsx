"use client";
import React from "react";
import Button from "@mui/material/Button";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slice/authSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };
  return (
    <div
      style={{
        display: "flex",
        padding: "20px 40px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <ApartmentIcon
          fontSize="large"
          color="primary"
          onClick={() => navigate("/")}
        />
      </div>
      <Button variant="contained" size="small" onClick={handleLogout}>
        Logout Please
      </Button>
    </div>
  );
}

export default Navbar;
