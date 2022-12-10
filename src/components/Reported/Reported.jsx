import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import Tablerow from "../Tablerow/Tablerow";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../Admin/Header/Header";
import {
  deleteReportedPosts,
  getAllReportedPosts,
} from "../../api/AdminRequest";

function Reported() {
  const user = useSelector((state) => state.authReducer.authData);
  console.log(user, "userrr");
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  useEffect(() => {
    reportedpost();
  }, []);
  async function reportedpost() {
    try {
      const { data } = await getAllReportedPosts();
      console.log(data);

      setPost(data.post);
      console.log(data.post, "postsssss");
    } catch (error) {
      console.log(error);
    }
  }
  async function deletePost(id) {
    try {
      const { data } = await deleteReportedPosts(id, user.user._id);

      reportedpost();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <hr />
      <Typography
        variant="h4"
        sx={{ color: "black", fontSize: "20px", marginBottom: "5px" }}
      >
        {" "}
        Reported Posts
      </Typography>
      {post.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Posts</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {post.map((row, index) => (
                <Tablerow
                  deletePost={deletePost}
                  row={row}
                  key={index}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>No reported Images</h1>
      )}
      <Button
        className="button infoButton"
        style={{ marginTop: "10px", position: "relative", zIndex: "1000000" }}
        onClick={() => navigate("/admin")}
      >
        Back
      </Button>
    </div>
  );
}

export default Reported;
