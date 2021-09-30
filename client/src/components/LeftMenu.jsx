import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/AddCircle";
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
          <Button color="success" size="small" variant="contained">
            CREATE BLOG +
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
