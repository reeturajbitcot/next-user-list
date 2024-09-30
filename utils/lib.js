export const createColumns = (handleOpen, handleDelete) => [
  {
    field: "name",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "Phone No",
    type: "number",
    width: 160,
    editable: true,
  },
  {
    field: "city",
    headerName: "City",
    width: 160,
  },
  {
    field: "action",
    headerName: "Action",
    width: 160,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          height: "100%",
        }}
      >
        <button
          onClick={() => handleOpen(params.row._id)}
          style={{
            padding: "5px 10px",
            backgroundColor: "orange",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(params.row._id)}
          style={{
            padding: "5px 10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          Del
        </button>
      </div>
    ),
  },
];
