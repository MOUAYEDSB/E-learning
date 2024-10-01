import React from 'react';
import './home.css';
import { Quad, Quad2, Quad3, Quad4 } from '../../components/conponentQ/conponentQ';
import Testimonial from '../../components/Testimonial//Testimonial';
import Cards from '../../components/CardsTitle/CardsTitle';
import CardConponent from '../../components/CardConponent/CardConponent';
import ListItem from '../../components/ListItems/ListItems';
import ContactPage from '../../components/ContactPage/ContactPage';
import ListGraines from '../../components/ListGraines/ListGraines';
import Footer from '../../components/Footer/Footer';
import HeaderImage from '../../components/HeaderImage/HeaderImage';


export default function HomePage() {
  return (
    <div>
      <HeaderImage />

      <Cards />

      <CardConponent />

      <ListItem />
      <ContactPage />
      <ListGraines />
      <Testimonial />
      <div className='faq'>
        <Quad />
        <Quad2 />
        <Quad3 />
        <Quad4 />
      </div>
      <Footer />
     
    </div>

  )
}