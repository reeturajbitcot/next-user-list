import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
function EditModal({
  handleClose,
  email,
  name,
  city,
  phoneNo,
  handleSubmit,
  setName,
  setEmail,
  setCity,
  setPhoneNo,
}) {
  return (
    <Box sx={style}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ paddingBottom: "20px" }}
      >
        Edit Info
      </Typography>
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
          label="Name"
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={name}
        />
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
        />

        {/* city */}
        <TextField
          label="City"
          onChange={(e) => setCity(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="text"
          value={city}
          fullWidth
          sx={{ mb: 3 }}
        />
        {/* phone no */}
        <TextField
          label="phone No"
          onChange={(e) => setPhoneNo(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="text"
          value={phoneNo}
          fullWidth
          sx={{ mb: 3 }}
        />
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default EditModal;
