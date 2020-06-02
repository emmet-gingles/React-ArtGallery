import React, { Component } from 'react';

// creates a component with a searchbar for filtering paintings
class SearchBar extends Component {

    render() {
        return(
            <div>
                <input type="text" id="search" placeholder="some text" onChange={ this.props.handleInput }></input>
            </div>
        );
    }
}

export default SearchBar;