import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Api } from "../API/Api";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  CardLink,
  Badge,
} from "reactstrap";
import "../style/blogs.css";
import axios from "axios";
import moment from "moment";

const Blogs = () => {
  const { search } = useLocation();
  const [allBlogs, setAllBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      console.log(search);
      const res = await axios.get(`${Api.URL}/get_blogs/${search}`);
      setAllBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [search]);

  return (
    <>
      <div className="rigthmenu">
        {allBlogs.map((blog, index) => {
          const blogImg = blog.blogImage
            ? Api.URL + "/" + blog.blogImage
            : "https://media.istockphoto.com/photos/white-rough-paper-texture-background-picture-id672541502?k=20&m=672541502&s=170667a&w=0&h=GIS9KEBncPrIV81ULxaEURlfJq5-4cBWDwqemhkq8q0=";
          return (
            <div className="particular_blog" key={index}>
              <Card>
                <CardBody>
                  <CardTitle className="mini_blog_username">
                    <Link to={`/profile/${blog.blogOwnerId}`}>
                      {blog.blogUsername}{" "}
                    </Link>
                    <Link to={`/?category=${blog.blogCategory}`}>
                      <Badge
                        color="success"
                        className="mini_blog_category_badge"
                      >
                        {blog.blogCategory}
                      </Badge>
                    </Link>
                  </CardTitle>

                  <p className="mini_blog_date">
                    {moment(blog.blogTime).fromNow()}
                  </p>
                </CardBody>
                <Link to={`/full_blog/${blog._id}`}>
                  <CardImg
                    id="mini_blog_image"
                    width="100%"
                    src={blogImg}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle className="mini_blog_title">
                      {blog.blogTitle}
                    </CardTitle>

                    <CardText className="mini_blog_description">
                      {blog.blogDescription}
                    </CardText>
                  </CardBody>
                </Link>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Blogs;
