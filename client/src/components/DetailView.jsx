import React, { useEffect, useState } from "react";
import "../style/detailview.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Api } from "../API/Api";
import moment from "moment";
import Cookies from "universal-cookie";

const DetailView = ({ match }) => {
  const [impActions, setImpActions] = useState(false);
  const cookies = new Cookies();
  const [blog, setBlog] = useState({});

  const getBlog = async () => {
    const token = {
      jwt: cookies.get("token"),
    };
    const rootUsername = cookies.get("username");

    try {
      const res = await axios.post(
        `${Api.URL}/particular_blog/${match.params.id}`,
        token
      );
      //console.log(res);
      setBlog(res.data);
      if (rootUsername === res.data.blogUsername) {
        setImpActions(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <div className="detailview">
        <div className="full_blog_image">
          {blog.blogImage ? (
            <img
              id="full_blog_image"
              src={Api.URL + "/" + blog.blogImage}
              alt="not found"
            />
          ) : null}
        </div>

        {impActions ? (
          <div className="full_blog_icons">
            <Link to={`/edit_blog/${blog._id}`}>
              <i className="fas fa-edit"></i>
            </Link>

            <i className="fas fa-trash"></i>
          </div>
        ) : null}

        <div className="full_blog_title">
          <h2>{blog.blogTitle}</h2>
        </div>

        <div className="full_blog_description">
          <p>{blog.blogDescription}</p>
        </div>
        <div className="full_blog_other_details">
          <div className="full_blog_author">
            <p>
              Author-{" "}
              <span className="full_blog_author_name">
                {" "}
                {blog.blogUsername}{" "}
              </span>
            </p>
          </div>
          <div className="full_blog_date">
            <p> Publish Date- {moment(blog.blogTime).format("LL")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailView;
