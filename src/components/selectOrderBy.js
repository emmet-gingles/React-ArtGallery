import React, { Component } from 'react';

// creates a component with a dropdown menu for changing the property that paitings are ordered by
class SelectOrderBy extends Component {

    render() {
        return (
            <div>
                <label>Order by</label>
                <select id="orderBy" onChange={ this.props.handleChange }>
                    <option value="year">Year</option>
                    <option value="artist">Artist</option>
                    <option value="title">Painting</option>
                </select>
            </div>
        )
    }
}

export default SelectOrderBy;