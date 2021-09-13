import React from 'react';
import { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents } from './api';
import 'bootstrap/dist/css/bootstrap.css';

import './nprogress.css';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    number: 32,
    currentCity: 'all',
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
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    if(!navigator.onLine){
      return(
      <div className="App">
        <WarningAlert text="You are offline. New events could not be loaded"/>
        <NumberOfEvents updateNumber={(e) => this.updateNumber(e)} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents}/>
        <EventList events={this.state.events} />
      </div>
      )
    }
    return (
      <div className="App">
        <NumberOfEvents updateNumber={(e) => this.updateNumber(e)} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
