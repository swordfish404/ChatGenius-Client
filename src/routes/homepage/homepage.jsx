// import { TypeAnimation } from 'react-type-animation';
import './homepage.css';
import { Link } from "react-router-dom";
// import {useState} from "react";



const Homepage = () => {
    // const [typingStatus,setTypingStatus]=useState("human1");
    // const test= async() =>{
    //     await fetch("http://localhost:3000/api/test",{
    //         credentials:"include",
    //     });
    // };
    return (
        <div className='homepage'>
          <img src="/orbital.png" alt="" className="orbital"/>
            <div className="left">
                <h1>ChatGenius</h1>
                <h2>Supercharge your creativity and productivity</h2>
                <h3>ChatGenius is an AI assistant that gives you direct access to Google’s best family of AI models on your device. Get help learning in new ways, planning events, writing thank you notes, and more.</h3>
                <Link to="/dashboard">Get Started</Link>

                {/* for testing  */}
                {/* <button onClick={test}> Test back end</button> */}
            </div>
            <div className="right">
                <div className="imgContainer">
                    <div className="bgContainer">
                       <div className="bg"></div> 
                       <div className='chat'>
                       {/* <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'We produce food for Mice',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'We produce food for Hamsters',
                                1000,
                                'We produce food for Guinea Pigs',
                                1000,
                                'We produce food for Chinchillas',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '2em', display: 'inline-block' }}
                            repeat={Infinity}
                            /> */}
                       </div>
                       <img src="/bot.png" alt="" className="bot"/>
                    </div>
                </div>
            </div>
            <div className="terms">
                <img src="/black.jpg" alt="" />
                <div className="links">
                    <Link to ="/">Made By</Link>
                    <Link to="/"> Swordfish</Link>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
 