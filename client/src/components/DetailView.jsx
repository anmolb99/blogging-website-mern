import React from "react";
import "../style/detailview.css";
import { Link } from "react-router-dom";

const DetailView = () => {
  return (
    <>
      <div className="detailview">
        <div className="full_blog_image">
          <img
            id="full_blog_image"
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            alt="not found"
          />
        </div>
        <div className="full_blog_icons">
          <Link to="edit_blog">
            <i class="fas fa-edit"></i>
          </Link>

          <i class="fas fa-trash"></i>
        </div>
        <div className="full_blog_title">
          <h2>How to delete instagram account permanentally with</h2>
        </div>

        <div className="full_blog_description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            voluptates blanditiis vel laboriosam consectetur natus corrupti
            doloremque provident nulla quibusdam qui, eos minima tempora
            reprehenderit a nesciunt esse placeat aut facilis temporibus. Ipsa
            aperiam architecto commodi vero eos soluta esse corrupti sit dolor
            cum porro ab ex ut, suscipit animi velit quis, inventore earum
            laborum voluptate dolorum cumque maiores qui.
          </p>
        </div>
        <div className="full_blog_other_details">
          <div className="full_blog_author">
            <p>
              Author-{" "}
              <span className="full_blog_author_name"> Anshuman Sharma </span>
            </p>
          </div>
          <div className="full_blog_date">
            <p>Publish Date: 23 july 2021</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailView;
