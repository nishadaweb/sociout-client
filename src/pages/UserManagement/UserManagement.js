import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import Header from "../../Admin/Header/Header";
import { blockUser, getUsers } from "../../api/AdminRequest";

function UserManagement() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    usermanagement();
  }, []);
  async function usermanagement() {
    try {
      const { data } = await getUsers();
      setUser(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUser(id) {
    try {
      const { data } = await blockUser();
      if (data.status) {
        usermanagement();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Header />
      <hr />
      <Typography
        variant="h4"
        sx={{ color: "black", fontSize: "20px", marginBottom: "5px" }}
      >
        {" "}
        User Management
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  {row.activeStatus ? "Unbocked" : "Blocked"}
                </TableCell>
                <TableCell align="center">
                  {row.activeStatus ? (
                    <Button
                      className="button infoButton"
                      variant="contained"
                      color="success"
                      onClick={() => {
                        updateUser(row._id);
                      }}
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      className="button infoButton"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        updateUser(row._id);
                      }}
                    >
                      Unblock
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className="button infoButton"
        style={{ marginTop: "10px" }}
        onClick={() => navigate("/admin")}
      >
        Back
      </Button>
    </>
  );
}

export default UserManagement;
