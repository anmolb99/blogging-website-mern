import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import "../style/leftmenu.css";

const LeftMenu = () => {
  const [categories, setCategories] = useState([
    "Music",
    "Fashion",
    "Beauty",
    "Travel",
    "Food",
    "Photography",
    "Health",
    "Technology",
    "Business",
    "Fitness",
    "Education",
    "Science",
    "Shopping",
    "Entertainment",
    "Sports",
    "Gaming",
  ]);
  return (
    <>
      <div className="leftmenu">
        <Link style={{ paddingTop: "30px" }} to="/create_blog">
          <Button color="success" size="sm">
            CREATE BLOG <i className="fas fa-plus" />{" "}
          </Button>
        </Link>

        <ListGroup className="all_categories">
          <Link to="/">
            <ListGroupItem active action>
              All Categories
            </ListGroupItem>
          </Link>

          {categories.map((category, index) => {
            return (
              <Link to={`/?category=${category}`} key={index}>
                <ListGroupItem action>{category}</ListGroupItem>
              </Link>
            );
          })}
        </ListGroup>
      </div>
    </>
  );
};

export default LeftMenu;
