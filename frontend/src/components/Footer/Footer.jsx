import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';


const linksData = [
    {
        title: "Use cases",
        links: [
            "UI design", "UX design", "Wireframing", "Diagramming",
            "Brainstorming", "Online whiteboard", "Team collaboration"
        ]
    },
    {
        title: "Explore",
        links: [
            "Design", "Prototyping", "Development features",
            "Design systems", "Collaboration features",
            "Design process", "FigJam"
        ]
    },
    {
        title: "Resources",
        links: [
            "Blog", "Best practices", "Colors", "Color wheel",
            "Support", "Developers", "Resource library"
        ]
    }
];

const Footer = () => {
    return (
        <>
            <img src={assets.footer1} className='imageFooter'/>
            <div className="footer">

                <div className="title-section">
                    <div className="social-icons">
                        <img src={assets.xLogo} alt="X Logo" />
                        <img src={assets.logoinstagram} alt="Instagram" />
                        <img src={assets.logoyoutube} alt="YouTube" />
                        <img src={assets.linkedin} alt="LinkedIn" />
                    </div>
                </div>
                {linksData.map((group, index) => (
                    <div className="link-group" key={index}>
                        <h3>{group.title}</h3>
                        {group.links.map((link, idx) => (
                            <a key={idx} href="#">
                                {link}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}



export default Footer;
