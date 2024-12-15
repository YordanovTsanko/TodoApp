import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodos, editTodos } from "../features/todosSlicer";
import { Paper, Button, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import EditModal from "../components/EditModal";
import { dateConvert } from "../features/dateConvertor";

const Dashboard = () => {
  
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalRow, setModalRow] = useState({});

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleOpenEdit = (row) => {
    setOpenEditModal(true);
    setModalRow(row);
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
  };

  const handleMarkAsCompleted = (row) => {
    dispatch(editTodos({ ...row, completed: !row.completed }));
  };

  const handleArhive = (row) => {
    dispatch(editTodos({ ...row, arhive: !row.arhive }));
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 330,
      renderCell: (params) => (
        <Box
          sx={{
            textDecoration: params.row.completed ? "line-through" : "none",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: "id", headerName: "Task ID", width: 80 },
    {
      field: "completed",
      headerName: "Completed",
      type: "boolean",
      width: 110,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
       return <Typography sx={{lineHeight: 3.2}}>{dateConvert(params.row.date)}</Typography>
      },
    },
    {
      field: "arhive",
      headerName: "",
      description: "This column has a button forarhive.",
      sortable: false,
      width: 250,
      resizable: false,
      pinned: "right",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              handleArhive(params.row);
            }}
          >
            Arhive
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEdit(params.row);
            }}
          >
            Edit
          </Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteTodos(params.id));
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      {todos.status === "loading" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 15,
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography variant="h5">Loading . . .</Typography>
        </Box>
      )}

      {todos.status === "failed" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 15,
            gap: 2,
          }}
        >
          <ErrorIcon style={{ color: "red", fontSize: 50 }} />
          <Typography variant="h5" color="error">
            Error {todos.error}
          </Typography>
        </Box>
      )}

      {todos.status === "success" && (
        <Box
          width="80%"
          sx={{ margin: "15px auto 0 auto", maxWidth: "1400px" }}
        >
          <Paper sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={todos.data}
              columns={columns}
              initialState={{
                pagination: { paginationModel },
              }}
              pageSizeOptions={[5, 10, 15, 20]}
              rowSelectionModel={[]}
              onCellClick={(params) => handleMarkAsCompleted(params.row)}
              getRowClassName={(params) =>
                params.row.completed && "row-completed"
              }
              sx={{
                "& .row-completed": {
                  backgroundColor: "#d0f0c0",
                },
                border: "0",
              }}
            />
          </Paper>
        </Box>
      )}
      <EditModal
        openEditModal={openEditModal}
        handleCloseEdit={handleCloseEdit}
        modalRow={modalRow}
        setModalRow={setModalRow}
      />
    </>
  );
};

export default Dashboard;
