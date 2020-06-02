import React, { Component } from 'react';

// creates a component with a list item for each suggestion
class Suggestion extends Component {

    render() {

        return (     
            <div>    
                <li className="suggestionItem" onClick={ this.props.handleClick }>{  this.props.text }</li>   
            </div>         
        );
    }
}

export default Suggestion;