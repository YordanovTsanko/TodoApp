import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { dateConvert } from "../features/dateConvertor";
import { useDispatch, useSelector } from "react-redux";
import { fetchArhive } from "../features/todosSlicer";
import ErrorIcon from "@mui/icons-material/Error";

const Arhives = () => {
  const dispatch = useDispatch();
  const todoData = useSelector((state) => state.todos);

  const rows = todoData.data;

  useEffect(() => {
    dispatch(fetchArhive());
  }, [dispatch]);

  return (
    <Box width="80%" sx={{ margin: "15px auto 0 auto", maxWidth: "1400px" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        Arhive
      </Typography>

      {todoData.status === "loading" && (
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

      {todoData.status === "failed" && (
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
            Error {todoData.error}
          </Typography>
        </Box>
      )}
      {todoData.status === "success" && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{ background: "#e3f2fd", borderBottom: "2px solid black" }}
              >
                <TableCell>Task</TableCell>
                <TableCell align="right">Task ID</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    ...(row.completed && { background: "#ccffd0" }),
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{dateConvert(row.date)}</TableCell>
                  <TableCell align="right">
                    {row.completed ? <>Yes</> : <>No</>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Arhives;
