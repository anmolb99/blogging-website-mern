import React, { useState, useEffect } from "react";
import "../style/createblog.css";
import { Label } from "reactstrap";
import { Api } from "../API/Api";
import { useHistory } from "react-router";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cookies from "universal-cookie";
import { Button } from "@mui/material";
import FileUploadTwoToneIcon from "@mui/icons-material/FileUploadTwoTone";
import NavTop from "./Navbar";

const CreateBlog = () => {
  const [showImg, setShowImg] = useState("");
  const [blogData, setBlogData] = useState({
    blogImage: "",
    blogTitle: "",
    blogDescription: "",
    category: "",
  });
  const [userData, setUserData] = useState({});

  const history = useHistory();
  const cookies = new Cookies();

  const CreateBlogPage = async () => {
    try {
      const data = {
        jwt: cookies.get("token"),
      };
      const res = await axios.post(`${Api.URL}/create_blog_page`, data);
      if (res) {
        setUserData(res.data);
        console.log(userData);
      }
    } catch (error) {
      console.log(error);
      history.push("/signin");
    }
  };

  useEffect(() => {
    CreateBlogPage();
  }, []);

  const imageHandler = (e) => {
    const imagePath = URL.createObjectURL(e.target.files[0]);
    setShowImg(imagePath);
    setBlogData({
      ...blogData,
      blogImage: e.target.files[0],
    });
  };

  const removeImg = () => {
    setShowImg("");
    setBlogData({
      ...blogData,
      blogImage: "",
    });
  };

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
    // console.log(blogData);
  };

  const publishBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("BLOGPOST", blogData.blogImage);
    formData.append("blogTitle", blogData.blogTitle);
    formData.append("blogDescription", blogData.blogDescription);
    formData.append("blogCategory", blogData.category);
    formData.append("blogOwnerId", userData._id);
    formData.append("blogUsername", userData.username);

    try {
      const res = await axios.post(`${Api.URL}/post_blog`, formData);
      if (res.status === 201) {
        window.alert("Blog Posted Successfully");
        console.log("Blog Posted Successfully");
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="createblog">
        <form>
          <input
            type="file"
            id="bannerimg"
            accept="image/*"
            className="input_image"
            onChange={imageHandler}
          />
          {showImg ? (
            <div className="create_blog_image">
              <img
                id="create_blog_image"
                src={showImg}
                alt="your banner will appear here"
              />
            </div>
          ) : null}
          <br />
          {showImg ? (
            <label onClick={removeImg} className="add_banner_button">
              Remove Banner <i className="fas fa-trash" />
            </label>
          ) : (
            <Label htmlFor="bannerimg" className="add_banner_button">
              Add Banner <i className="fas fa-plus" />
            </Label>
          )}{" "}
          <br /> <br />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              // labelId="demo-simple-select-helper-label"
              // id="demo-simple-select-helper"
              value={blogData.category}
              // label="category"
              name="category"
              onChange={handleChange}
            >
              {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
              <MenuItem value={"Music"}>Music</MenuItem>
              <MenuItem value={"Fashion"}>Fashion</MenuItem>
              <MenuItem value={"Beauty"}>Beauty</MenuItem>
              <MenuItem value={"Travel"}>Travel</MenuItem>
              <MenuItem value={"Design"}>Design</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Movie"}>Movie</MenuItem>
              <MenuItem value={"Photography"}>Photography</MenuItem>
              <MenuItem value={"Health"}>Health</MenuItem>
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"History"}>History</MenuItem>
              <MenuItem value={"Marketing"}>Marketing</MenuItem>
              <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
              <MenuItem value={"Fitness"}>Fitness</MenuItem>
              <MenuItem value={"Education"}>Education</MenuItem>
              <MenuItem value={"Science"}>Science</MenuItem>
              <MenuItem value={"Shopping"}>Shopping</MenuItem>
              <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
              <MenuItem value={"Sports"}>Sports</MenuItem>
              <MenuItem value={"Gaming"}>Gaming</MenuItem>
              <MenuItem value={"Career"}>Career</MenuItem>
              <MenuItem value={"Pet"}>Pet</MenuItem>
              <MenuItem value={"Wedding"}>Wedding</MenuItem>
            </Select>
            <FormHelperText>Select category</FormHelperText>
          </FormControl>
          <input
            type="text"
            className="input_title"
            placeholder="Enter Title"
            name="blogTitle"
            onChange={handleChange}
          />
          <textarea
            cols="30"
            rows="15"
            placeholder="Enter Description..."
            className="input_description"
            name="blogDescription"
            onChange={handleChange}
          ></textarea>
          <Button
            type="submit"
            color="success"
            className="publish_button"
            onClick={publishBlog}
            variant="contained"
            endIcon={<FileUploadTwoToneIcon />}
          >
            PUBLISH
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
