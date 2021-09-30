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
  const [userData, setUserData] = useState({});

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${Api.URL}/get_blogs/${search}`);
      setAllBlogs(res.data);
      //  console.log(allBlogs);
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
        {allBlogs.length > 0 ? (
          allBlogs.map((blog, index) => {
            const blogImg = blog.blogImage
              ? Api.URL + "/" + blog.blogImage
              : "/images/blank-blogpic.jpg";
            let blogDes = blog.blogDescription;
            if (blog.blogDescription.length >= 80) {
              blogDes = blog.blogDescription.slice(0, 80) + "...";
            }
            let blogTit = blog.blogTitle;
            if (blog.blogTitle.length >= 55) {
              blogTit = blog.blogTitle.slice(0, 55) + "...";
            }
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
                        {blogTit}
                      </CardTitle>

                      <CardText className="mini_blog_description">
                        {blogDes}
                      </CardText>
                    </CardBody>
                  </Link>
                </Card>
              </div>
            );
          })
        ) : (
          <div className="no_blogs">
            <p> No Blogs Found </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
