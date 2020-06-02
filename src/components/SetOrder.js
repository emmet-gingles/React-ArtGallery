import React, { Component } from "react";
 
// creates a component with a checkbox for setting ascending/descending order 
class SetOrder extends Component {

    render() {
        return(
            <div>
                <label>Ascending order</label>
                <input type="checkbox" defaultChecked onChange={ this.props.handleChange } />
            </div>
        );
    }
}

export default SetOrder;