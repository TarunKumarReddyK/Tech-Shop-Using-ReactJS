import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Components/Navbar/Routing.jsx';
import './App.css'; // For additional styling
import Header from './Components/Navbar/Header.jsx';
import CarouselComponent from './Components/Navbar/Courosel/CarouselComponent.jsx';
import ProductsList from './Components/Products/ProductsList.jsx';
import Footer from './Components/Footer/Footer.jsx';


function App() {
  return (
    <Router>
     <Header/>
      <Routing />
     {/* <ProductsList/> */}
      <Footer/>
  </Router>
  );
}

export default App;
