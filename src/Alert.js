import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class alertStyle extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
        };
    }


    render() {
        return (
            // <Alert variant={this.variant}>
            //     <p>{this.props.text}</p>
            // </Alert>
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends alertStyle {
    constructor(props) {
        super(props);
        this.color = 'blue';
    }
}

class ErrorAlert extends alertStyle {
    constructor(props) {
        super(props);
        this.color = 'red';
    }
}
  

export { InfoAlert, ErrorAlert };