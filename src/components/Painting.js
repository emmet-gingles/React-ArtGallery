import React, { Component } from "react";

// creates an component that shows an image of a painting and information about it
class Painting extends Component {

    render() {

        return (
            <section>
                <h2>{ this.props.title }</h2>
                <img src={ this.props.url } alt={ this.props.title } width={ this.props.width } onClick={ this.props.handleClick }/>
                <p>Artist: { this.props.artist }</p>
                <p>Year: { this.props.year }</p>
                <p>Period: { this.props.period }</p> 
                <p>Medium: { this.props.medium }</p>
                <p>Location: { this.props.location }</p>
            </section>  
        );

    }
}

export default Painting;



