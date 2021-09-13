import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.backgroundColor = null;
        this.borderColor = null;
    }

    getStyle = () => {
        return {
            backgroundColor: this.color,
            borderColor: this.borderColor
        };
    }


    render() {
        return (
            // <Alert show={this.visible} variant={this.variant}>
            //     <p>{this.props.text}</p>
            // </Alert>
            <div>
                <p className="Alert" style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(234, 250, 255)';
        this.borderColor = 'blue';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(255, 205, 205)';
        this.borderColor = 'red';
    }
}

class WarningAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'rgb(255, 255, 215)';
      this.borderColor = 'yellow'
    }
  }
  

export { InfoAlert, ErrorAlert, WarningAlert };