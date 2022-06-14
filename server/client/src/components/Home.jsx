import React from "react";
import "../styles/Home.css";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  return (
    <div className="home">
      <div className="home_container">
        <div className="img_container d-flex flex-column align-items-center justify-content-center">
          <img
            src="https://left-nav.blogs.hopkinsmedicine.org/files/2016/11/connecting-people.jpg"
            alt="network"
            className="home popdown"
          ></img>
        </div>

        <div className="popup">
          <div>
            <h1>Let's Chat with your friends</h1>
            <p>- This is chat app -</p>
            <LinkContainer to="/joinroom">
              <Button variant="success" className="start_btn">
                Get Started
                <i className="fas fa-comments home-message-icon"></i>
              </Button>
            </LinkContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;