import React from 'react';
import './ListItems.css';
import { assets } from '../../assets/assets';

const ListItem = () => {
    return (
        <div className="List-item-container" id='ListItem'>
            <div className="list-item">
                <img src={assets.overlayerImage} alt="Overlay" className="overlay-image" />

                <div className="state-layer">
                    <div className="leading-element">
                        <img src={assets.personIcon} alt="Person" className="person-icon" />
                    </div>

                    <div className="content">
                        <div className="overline">Overline</div>
                        <div className="headline">List item</div>
                        <div className="supporting-text">Supporting line text lorem ipsum dolor sit amet, consectetur.</div>
                    </div>
                </div>
            </div>
            <div className="list-item">
                <img src={assets.overlayerImage} alt="Overlay" className="overlay-image" />

                <div className="state-layer">
                    <div className="leading-element">
                        <img src={assets.personIcon} alt="Person" className="person-icon" />
                    </div>

                    <div className="content">
                        <div className="overline">Overline</div>
                        <div className="headline">List item</div>
                        <div className="supporting-text">Supporting line text lorem ipsum dolor sit amet, consectetur.</div>
                    </div>
                </div>
            </div>
            <div className="list-item">
                <img src={assets.overlayerImage} alt="Overlay" className="overlay-image" />

                <div className="state-layer">
                    <div className="leading-element">
                        <img src={assets.personIcon} alt="Person" className="person-icon" />
                    </div>

                    <div className="content">
                        <div className="overline">Overline</div>
                        <div className="headline">List item</div>
                        <div className="supporting-text">Supporting line text lorem ipsum dolor sit amet, consectetur.</div>
                    </div>
                </div>
            </div>
            
            <img src={assets.roundLogo} className='roundLogo' style={{width: 350, height: 350}}/>
        </div>
    );
};


export default ListItem;