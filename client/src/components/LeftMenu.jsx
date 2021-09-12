import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import "../style/leftmenu.css";

const LeftMenu = () => {
  return (
    <>
      <div className="leftmenu">
        <Link style={{ paddingTop: "30px" }} to="/create_blog">
          <Button color="success" size="sm">
            CREATE BLOG <i className="fas fa-plus" />{" "}
          </Button>
        </Link>

        <ListGroup className="all_categories">
          <ListGroupItem active action>
            All Categories
          </ListGroupItem>
          <ListGroupItem tag="a" href="#" action>
            Dapibus
          </ListGroupItem>
          <ListGroupItem tag="a" href="#" action>
            Morbi
          </ListGroupItem>
          <ListGroupItem tag="a" href="#" action>
            Porta
          </ListGroupItem>
          <ListGroupItem disabled tag="a" href="#" action>
            Vestibulum
          </ListGroupItem>
        </ListGroup>
      </div>
    </>
  );
};

export default LeftMenu;
