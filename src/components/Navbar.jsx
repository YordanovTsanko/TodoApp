import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Modal,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  styled,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postTodos } from "../features/todosSlicer";

const NavList = styled("ul")({
  listStyleType: "none",
  display: "flex",
  margin: 0,
  padding: 0,
});

const NavItem = styled("li")({
  marginLeft: "16px",
});

const style = {
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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [disabledNewTask, setDisabledNewTask] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/arhives"
      ? setDisabledNewTask(true)
      : setDisabledNewTask(false);
  }, [location]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const data = { title: input, completed: false, date: Date.now() };
    dispatch(postTodos(data));
    setInput("");
    handleClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            My Weekly Tasks
          </Typography>
          <NavList>
            <NavItem>
              <Button color="inherit">
                <Link
                  to="/arhives"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Arhives
                </Link>
              </Button>
            </NavItem>
            <NavItem>
              <Button
                color="inherit"
                onClick={handleOpen}
                disabled={disabledNewTask}
              >
                Add Task
              </Button>
            </NavItem>
          </NavList>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ borderRadius: "20px" }}
      >
        <Box sx={{ ...style, width: 200 }}>
          <Typography
            variant="body1"
            color="initial"
            sx={{ textAlign: "center" }}
          >
            Add New Task
          </Typography>
          <Box
            onSubmit={handleAddTask}
            component="form"
            sx={{ "& > :not(style)": { m: 1 } }}
            noValidate
            autoComplete="off"
          >
            <FormControl variant="standard">
              <InputLabel htmlFor="task">Task</InputLabel>
              <Input
                id="task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-describedby="task"
              />
              <FormHelperText id="task">
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
              <Button onClick={handleClose} color="error">
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
