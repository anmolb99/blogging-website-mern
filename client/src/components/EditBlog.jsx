import React, { useState, useEffect } from "react";
import "../style/createblog.css";
import { Button, Label } from "reactstrap";
import axios from "axios";
import { Api } from "../API/Api";
import Cookies from "universal-cookie";

const EditBlog = ({ match }) => {
  const cookies = new Cookies();
  const [showImg, setShowImg] = useState("");
  const [blogData, setBlogData] = useState({
    blogTitle: "",
    blogDescription: "",
  });

  const imageHandler = (e) => {
    const imagePath = URL.createObjectURL(e.target.files[0]);
    setShowImg(imagePath);
  };

  const removeImg = () => {
    setShowImg("");
  };

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(blogData);
  };

  const getBlogData = async () => {
    const token = {
      jwt: cookies.get("token"),
    };
    try {
      const res = await axios.post(
        `${Api.URL}/particular_blog/${match.params.id}`,
        token
      );
      console.log(res);

      if (res.status === 200) {
        setShowImg(Api.URL + "/" + res.data.blogImage);
        setBlogData({
          blogTitle: res.data.blogTitle,
          blogDescription: res.data.blogDescription,
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
            color="primary"
            className="publish_button"
            onClick={handleEdit}
          >
            EDIT <i className="fas fa-check-circle"></i>
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
