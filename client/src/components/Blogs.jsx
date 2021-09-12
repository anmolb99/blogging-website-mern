import React from "react";
import { Link } from "react-router-dom";
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

const Blogs = () => {
  return (
    <>
      <div className="rigthmenu">
        <div className="particular_blog">
          <Card>
            <CardBody>
              <CardTitle className="mini_blog_username">
                Anshuman sharma{" "}
                <Badge color="success" className="mini_blog_category_badge">
                  Travel
                </Badge>
              </CardTitle>

              <p className="mini_blog_date">23 july</p>
            </CardBody>
            <Link to="detail">
              <CardImg
                id="mini_blog_image"
                width="100%"
                src="https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle className="mini_blog_title">
                  How to delete instagram account permanentaly
                </CardTitle>

                <CardText className="mini_blog_description">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
              </CardBody>
            </Link>
          </Card>
        </div>
        <div className="particular_blog">
          <Card>
            <CardBody>
              <CardTitle className="mini_blog_username">
                Anshuman sharma{" "}
                <Badge color="success" className="mini_blog_category_badge">
                  Travel
                </Badge>
              </CardTitle>

              <p className="mini_blog_date">23 july</p>
            </CardBody>

            <CardImg
              id="mini_blog_image"
              width="100%"
              src="https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle className="mini_blog_title">
                How to delete instagram account permanentaly
              </CardTitle>

              <CardText className="mini_blog_description">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="particular_blog">
          <Card>
            <CardBody>
              <CardTitle className="mini_blog_username">
                Anshuman sharma{" "}
                <Badge color="success" className="mini_blog_category_badge">
                  Travel
                </Badge>
              </CardTitle>

              <p className="mini_blog_date">23 july</p>
            </CardBody>
            <CardImg
              id="mini_blog_image"
              width="100%"
              src="https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle className="mini_blog_title">
                How to delete instagram account permanentaly
              </CardTitle>

              <CardText className="mini_blog_description">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="particular_blog">
          <Card>
            <CardBody>
              <CardTitle className="mini_blog_username">
                Anshuman sharma{" "}
                <Badge color="success" className="mini_blog_category_badge">
                  Travel
                </Badge>
              </CardTitle>

              <p className="mini_blog_date">23 july</p>
            </CardBody>
            <CardImg
              id="mini_blog_image"
              width="100%"
              src="https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle className="mini_blog_title">
                How to delete instagram account permanentaly
              </CardTitle>

              <CardText className="mini_blog_description">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Blogs;
