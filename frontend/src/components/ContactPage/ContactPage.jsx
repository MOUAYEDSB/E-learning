import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from "../../api/axiosConfig";

import './ContactPage.css';
import { assets } from '../../assets/assets';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/contact', formData);
      setFormStatus(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus(error.response?.data?.error || 'Submission failed, try again.');
    }
  };

  return (
    <Box className="containercontact" id="ContactPage">
      <Box className="form-and-image-container">
        <Box className="form-container">
          <Typography variant="h3" className="title">Contact us</Typography>
          <form className="form" onSubmit={handleSubmit}>
            <Box className="input-container">
              <TextField
                id="name"
                label="Name"
                variant="standard"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Box>

            <Box className="input-container">
              <TextField
                id="email"
                label="Email"
                variant="standard"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>

            <Box className="input-container">
              <TextField
                id="message"
                label="Your message"
                multiline
                rows={2}
                variant="standard"
                fullWidth
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Box>

            <Box className="button-container">
              <Button type="submit" variant="contained" className="cta-button">
                <img src={assets.buttonbackground} alt="Button background" className="button-background" />
                <Typography variant="button" className="cta-text">CALL TO ACTION</Typography>
              </Button>
            </Box>
          </form>
          {formStatus && <Typography variant="body1">{formStatus}</Typography>}
        </Box>

        <Box className="imagecontainer">
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6791792.024814696!2d5.068121084672593!3d33.778628920483065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x125595448316a4e1%3A0x3a84333aaa019bef!2sTunisie!5e0!3m2!1sfr!2stn!4v1645090974647!5m2!1sfr!2stn"
  width="450"
  height="300"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/>

        </Box>
      </Box>
    </Box>
  );
}

export default ContactPage;