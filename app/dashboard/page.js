"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import { createColumns } from "@/utils/lib";
import EditModal from "@/components/EditModal";
import {
  handleDeleteUser,
  handleFetchContent,
  handleUserUpdate,
} from "@/utils/api";

function page() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 5,
  });

  // modal
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState(null);

  const getData = async ({ pageno, limit }) => {
    let data = await handleFetchContent({
      pageNo: pageno,
      limit,
    });
    setRows(data.employees);
    setIsLoading(false);
  };

  const handleOpen = (id) => {
    let [data] = rows.filter((item) => item._id === id);
    setEmail(data.email);
    setName(data.name);
    setCity(data.city);
    setPhoneNo(data.phoneNumber);
    setEditId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
  };

  const handleDelete = async (id) => {
    try {
      const resultAction = await handleDeleteUser({ id });
      if (resultAction.message === "User deleted successfully") {
        Swal.fire({
          title: "Successful",
          text: "User Info deleted successfully",
          icon: "success",
          confirmButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            getData({
              pageno: paginationModel.page,
              limit: paginationModel.pageSize,
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);

    let userData = {
      name,
      email,
      city,
      phoneNumber: phoneNo,
    };
    try {
      const resultAction = await handleUserUpdate({
        data: userData,
        id: editId,
      });
      if (resultAction.message === "User updated successfully") {
        Swal.fire({
          title: "Successful",
          text: "User Info updated successfully",
          icon: "success",
          confirmButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            getData({
              pageno: paginationModel.page,
              limit: paginationModel.pageSize,
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData({ pageno: paginationModel.page, limit: paginationModel.pageSize });
  }, [paginationModel]);

  const columns = createColumns(handleOpen, handleDelete);

  if (!isAuthenticated) {
    router.push("/");
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "40px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Dashboard</h1>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ height: 400 }}>
            <DataGrid
              rows={rows}
              getRowId={(row) => row._id}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: paginationModel.pageSize,
                  },
                },
              }}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 15, 20]}
              onPaginationModelChange={setPaginationModel}
            />
          </Box>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditModal
          handleClose={handleClose}
          email={email}
          city={city}
          phoneNo={phoneNo}
          name={name}
          handleSubmit={handleSubmit}
          setName={setName}
          setEmail={setEmail}
          setCity={setCity}
          setPhoneNo={setPhoneNo}
        />
      </Modal>
    </div>
  );
}

export default page;
