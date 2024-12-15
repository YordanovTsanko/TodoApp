import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodos } from "../features/todosSlicer";

const styleEditModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  outline: "none",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const EditModal = ({
  openEditModal,
  handleCloseEdit,
  modalRow,
  setModalRow,
}) => {
  const [editTodo, setEditTodo] = useState("");

  const dispatch = useDispatch();

  const handleSumbite = (e) => {
    dispatch(editTodos({ ...modalRow, title: editTodo }));

    e.preventDefault();
    setEditTodo("");
    setModalRow({});
    handleCloseEdit();
  };

  return (
    <Modal
      open={openEditModal}
      onClose={handleCloseEdit}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      sx={{ borderRadius: "20px" }}
    >
      <Box sx={{ ...styleEditModal, width: 200 }}>
        <Typography
          variant="body1"
          color="initial"
          sx={{ textAlign: "center" }}
        >
          Edit Task
        </Typography>
        <Box
          onSubmit={handleSumbite}
          component="form"
          sx={{ "& > :not(styleEditModal)": { m: 1 } }}
          noValidate
          autoComplete="off"
        >
          <FormControl variant="standard">
            <InputLabel htmlFor="editTodo">New Task</InputLabel>
            <Input
              id="editTodo"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              aria-describedby="editTodo"
            />
            <FormHelperText id="editTodo">
              Maximum of 50 characters.
            </FormHelperText>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button type="submit" variant="contained">
              Add
            </Button>
            <Button onClick={handleCloseEdit} color="error">
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
