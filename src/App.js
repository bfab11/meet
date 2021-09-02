import React from 'react';
import { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents } from './api';

import './nprogress.css';
import NumberOfEvents from './NumberOfEvents';
import { InfoAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    number: 32,
    currentCity: 'all',
    infoText: ''
  };

  updateEvents = (location, numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events.slice(0, numberOfEvents) :
        events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, numberOfEvents),
          currentLocation: location
        });
      }
    });
  }

  updateNumber(eventNumber) {
    this.setState({ numberOfEvents: eventNumber });
    const { currentCity } = this.state;
    this.updateEvents(currentCity, eventNumber);
  }

  componentDidMount() {
    const { numberOfEvents } = this.state;
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events)
        });
      }
      if (!navigator.onLine) {
        this.setState({
          infoText: alert('You are now offline. The events displayed may be out of date. Please connect to internet to stay updated with the newest events.')
        });
        console.log('offline');
      } else {
        this.setState({ infoText: '' });
      };
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <InfoAlert text={this.state.infoText} />
        <NumberOfEvents updateNumber={(e) => this.updateNumber(e)} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
