import React, { useState, useEffect } from "react";
import "../style/createblog.css";
import { Label } from "reactstrap";
import { Button } from "@mui/material";
import DoneAllTwoToneIcon from "@mui/icons-material/DoneAllTwoTone";
import axios from "axios";
import { Api } from "../API/Api";
// import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import NavTop from "./Navbar";

const EditBlog = ({ match }) => {
  // const cookies = new Cookies();
  const history = useHistory();

  const [showImg, setShowImg] = useState("");
  const [imgStatus, setImgStatus] = useState("");
  const [blogId, setblogId] = useState("");
  const [blogData, setBlogData] = useState({
    blogImage: "",
    blogTitle: "",
    blogDescription: "",
  });

  const imageHandler = (e) => {
    setImgStatus("no");
    const imagePath = URL.createObjectURL(e.target.files[0]);
    setShowImg(imagePath);
    setBlogData({
      ...blogData,
      blogImage: e.target.files[0],
    });
    console.log(blogData.blogImage);
  };

  const removeImg = () => {
    setImgStatus("yes");
    setShowImg("");
    setBlogData({ ...blogData, blogImage: "" });
  };

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    console.log(blogData);

    const newImg = blogData.blogImage || "";

    const formData = new FormData();

    formData.append("BLOGPOST", newImg);
    formData.append("blogTitle", blogData.blogTitle);
    formData.append("blogDescription", blogData.blogDescription);
    formData.append("imgStatus", imgStatus);

    try {
      const res = await axios.put(`${Api.URL}/edit_blog/${blogId}`, formData);
      console.log(res);
      if (res.status === 200) {
        window.alert("Blog Updated Successfuly");
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogData = async () => {
    const token = {
      // jwt: cookies.get("token"),
      jwt: localStorage.getItem("token"),
    };
    try {
      const res = await axios.post(
        `${Api.URL}/particular_blog/${match.params.id}`,
        token
      );
      console.log(res);

      if (res.status === 200) {
        if (res.data.blog.blogImage) {
          setShowImg(Api.URL + "/" + res.data.blog.blogImage);
        }

        setblogId(res.data.blog._id);
        setBlogData({
          blogTitle: res.data.blog.blogTitle,
          blogDescription: res.data.blog.blogDescription,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

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
            <label onClick={removeImg} className="add_banner_button">
              Remove Banner <i className="fas fa-trash" />
            </label>
          ) : (
            <Label htmlFor="bannerimg" className="add_banner_button">
              Add Banner <i className="fas fa-plus" />
            </Label>
          )}

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

          <input
            type="text"
            className="input_title"
            placeholder="Enter Title"
            name="blogTitle"
            onChange={handleChange}
            value={blogData.blogTitle}
          />
          <textarea
            cols="30"
            rows="15"
            placeholder="Enter Description..."
            className="input_description"
            name="blogDescription"
            onChange={handleChange}
            value={blogData.blogDescription}
          ></textarea>

          <Button
            type="submit"
            color="success"
            className="publish_button"
            onClick={handleEdit}
            variant="contained"
            endIcon={<DoneAllTwoToneIcon />}
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
