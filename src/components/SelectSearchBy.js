import React, { Component } from 'react';

// creates a component with a dropdown menu for changing the property that paitings are searched by
class SelectSearchBy extends Component {

    render() {
        return (
            <div>
                <label>Search by</label>
                <select id="searchFields" onChange={this.props.handleChange}>
                    <option value="artist">Artist</option>
                    <option value="title">Painting</option>
                </select>
            </div>
        )
    }
}

export default SelectSearchBy;