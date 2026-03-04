import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Story from './components/Story/Story';
import Countdown from './components/Countdown/Countdown';
import Events from './components/Events/Events';
import Schedule from './components/Schedule/Schedule';
import DressCode from './components/DressCode/DressCode';
import GiftRegistry from './components/GiftRegistry/GiftRegistry';
import RsvpForm from './components/RsvpForm/RsvpForm';
import Footer from './components/Footer/Footer';

import './App.scss';

const App = () => (
  <div className="app">
    <Navigation />
    <Hero />
    <Story />
    <Countdown />
    <Events />
    <Schedule />
    <DressCode />
    <GiftRegistry />
    <RsvpForm />
    <Footer />
  </div>
);

export default App;
