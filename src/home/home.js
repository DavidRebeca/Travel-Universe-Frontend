import React from 'react';
import BackgroundImg from '../commons/images/contact.png';
import { Container, Jumbotron } from 'reactstrap';
import NavigationBar from "../navigation-bar";

const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: "100vw", // Set width to viewport width
    height: "100vh", // Set height to viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${BackgroundImg})`,
    padding: 0, // Override default padding to make the background full screen
    margin: 0 // Remove default margin
};

const titleStyle = {
    color: '#FFFFFF',
    fontWeight: 'bold', // Make the text bold
    fontSize: '3rem', // Adjust the font size
    position: 'absolute', // Position the text absolutely
    top: '100px', // Set the distance from the top
    left: '20px', // Set the distance from the left
};

const contentStyle = {
    color: '#FFFFFF',
    fontSize: '1.5rem', // Adjust the font size
    textAlign: 'left', // Align the text to the left
    marginLeft: '20px', // Add left margin for better readability
    width: '50%' // Limit content to left half of the page
};

const paragraphStyle = {
    marginBottom: '20px' // Add margin between paragraphs
};

class Home extends React.Component {
    render() {
        return (
            <div><NavigationBar  />
            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={titleStyle}>Welcome to TravelUniverse!</h1>
                        <div style={contentStyle}>
                            <p className="lead" style={paragraphStyle}>
                                At TravelUniverse, we believe that every journey is an opportunity for adventure, discovery, and connection.
                            </p>
                            <p className="lead" style={paragraphStyle}>
                                Step into a world of endless possibilities as we invite you to explore the wonders of our planet.
                            </p>
                            <p className="lead" style={paragraphStyle}>
                                From the majestic peaks of the Himalayas to the pristine beaches of the Caribbean, from bustling city streets
                                to serene countryside retreats, TravelUniverse is your gateway to unforgettable experiences.
                            </p>
                            <p className="lead" style={paragraphStyle}>
                                Whether you're seeking adrenaline-pumping adventures, cultural immersion, or simply a moment of tranquility
                                amidst nature's beauty, our expert team is dedicated to crafting personalized journeys tailored to your dreams and desires.
                            </p>
                            <p className="lead" style={paragraphStyle}>
                                Join us as we embark on a voyage of exploration, where every destination is a new chapter waiting to be written.
                                Welcome to TravelUniverse, where the journey begins.
                            </p>
                        </div>
                    </Container>
                </Jumbotron>
            </div>
            </div>
        )
    };
}

export default Home;
