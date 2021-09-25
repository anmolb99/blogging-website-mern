import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../style/updateprofile.css";
import { Label } from "reactstrap";
import axios from "axios";
import { Api } from "../API/Api";
import Cookies from "universal-cookie";

export default function FormDialog({ uid, uname, profilepic }) {
  const cookies = new Cookies();
  // console.log(profilepic);

  const [showImg, setShowImg] = useState("");
  const [open, setOpen] = React.useState(false);
  const [imgStatus, setImgStatus] = useState("");
  const [myData, setMyData] = useState({
    username: "",
    profilepic: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("DP", myData.profilepic);
    formData.append("username", myData.username);
    formData.append("imgStatus", imgStatus);

    try {
      const res = await axios.post(
        `${Api.URL}/update_profile/${uid}`,
        formData
      );
      if (res.status === 200) {
        console.log(res);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageHandler = (e) => {
    setImgStatus("no");
    const imagePath = URL.createObjectURL(e.target.files[0]);
    setShowImg(imagePath);
    setMyData({
      ...myData,
      profilepic: e.target.files[0],
    });
  };

  const removeImg = () => {
    setImgStatus("yes");
    setShowImg("");
    setMyData({ ...myData, profilepic: "" });
  };

  const imgPre =
    showImg ||
    "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";

  //console.log(imgPre);

  useEffect(() => {
    if (uname) {
      setMyData({ ...myData, username: uname });
    }
    if (profilepic) {
      setShowImg(profilepic);
    }
  }, []);

  return (
    <div>
      <i className="fas fa-edit" onClick={handleClickOpen} />

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <div className="forflex">
            {showImg ? (
              <label onClick={removeImg} className="add_banner_button">
                Remove <i className="fas fa-trash" />
              </label>
            ) : (
              <Label htmlFor="dp" className="add_banner_button">
                Add Profilepic <i className="fas fa-plus" />
              </Label>
            )}{" "}
            <input
              type="file"
              accept="image/*"
              id="dp"
              className="inputfordp"
              onChange={imageHandler}
            />
            <img src={imgPre} id="dp_preview" />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="name"
            variant="standard"
            value={myData.username}
            onChange={(e) => {
              setMyData({ ...myData, username: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button onClick={updateProfile}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
