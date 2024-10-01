import { Repeat } from '@material-ui/icons';
import { assets } from '../../assets/assets';

const Card = () => {
  const cardStyle = {
    background: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #d9d9d9',
    padding: '24px',
    marginBottom: '24px',
    width: '100%',  // Ensure it takes up the full width of the container
  };

  const titleStyle = {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '24px',
    letterSpacing: '-0.48px',
    lineHeight: '120%',
    color: '#1e1e1e',
    marginBottom: '16px',  // Adds gap between title and body
  };

  const bodyStyle = {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '140%',
    color: '#757575',
  };

  return (
    <div style={cardStyle} >
      <div style={titleStyle}>Title</div>
      <div style={bodyStyle}>
        Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
      </div>
    </div>
  );
};

const Cards = () => {
  const containerStyle = {
    backgroundImage: 'url(./src/assets/rectangle-4376.svg)', Repeat,
    display: 'flex',  // Set container to flex to place image and cards side by side
    alignItems: 'flex-start',  // Align items to the top
    gap: '24px',
    padding: '50px',  // Space between the image and the cards
  };

  const imageStyle = {
    width: '41%',  // Set the width of the image
    height: '100%',  // The image height will expand to match the cards
    objectFit: 'cover',  // Ensures the image covers its container
    borderRadius: '8px',
  };

  const cardsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',  // Space between the cards
    width: '100%',  // Take up remaining space next to the image
  };

  return (
    <div style={containerStyle} id='Cards'>
      <img 
        style={imageStyle}
        src={assets.image5}  // Replace with your image URL
        alt="Left Side"
      />
      <div style={cardsContainerStyle}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Cards;