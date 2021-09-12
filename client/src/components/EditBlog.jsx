import React, { useState } from "react";
import "../style/createblog.css";
import { Button, Label } from "reactstrap";

const EditBlog = () => {
  const [showImg, setShowImg] = useState("");

  const imageHandler = (e) => {
    const imagePath = URL.createObjectURL(e.target.files[0]);
    setShowImg(imagePath);
  };

  const removeImg = () => {
    setShowImg("");
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
          />
          <textarea
            cols="30"
            rows="15"
            autoFocus="true"
            placeholder="Enter Description..."
            className="input_description"
          ></textarea>

          <Button type="submit" color="primary" className="publish_button">
            EDIT <i className="fas fa-check-circle"></i>
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
