import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        errorText: '',
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1) {
            return this.setState({
                errorText: 'Please choose a number between 1 and 32',
                numberOfEvents: '',
            });
        } else if (value > 32) {
            return this.setState({
                errorText: 'Please choose a number between 1 and 32',
                numberOfEvents: '',
            });
        } else {
            this.setState({
                numberOfEvents: value,
                errorText: '',
            });
            this.props.updateNumber(event.target.value);
        }
    };

    render() {
        const numberOfEvents = this.state.numberOfEvents;
        return (
            <div className="NumberOfEvents">
                <Form>
                    <Form.Group>
                        <Form.Label size="lg">Number of Events: </Form.Label>
                        <Form.Control size ="lg" type="text" placeholder="32" className="EventsNumber" value={numberOfEvents} onChange={(e) => this.handleInputChanged(e)} />
                        <ErrorAlert text={this.state.errorText} />
                    </Form.Group>
                </Form>

                {/* <form>
                    <ErrorAlert text={this.state.errorText} />
                    <label>Number of Events:</label>
                    <input
                        type="text"
                        className="EventsNumber"
                        value={numberOfEvents}
                        onChange={(e) => this.handleInputChanged(e)}
                    />
                </form> */}
            </div>
        );
    }
}

export default NumberOfEvents;