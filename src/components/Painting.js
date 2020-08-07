import React, { Component } from "react";

// Creates an component that shows an image of a painting and information about it
class Painting extends Component {

    render() {
        // Variable to store the periods associated with the painting
        let period = "";
        // Each period will be listed seperated by a comma
        for(let i=0;i< this.props.period.length;i++){
            if(i > 0){
                period = period + ", " + this.props.period[i];
            }
            else {
                period = period + this.props.period[i];
            }
        }
        // Variable to store information about the paiting
        let info = null;
        // If the props value is true then show the painting information
        if(!this.props.hideInformation) {
            info = 
                <div>
                    <p>Artist: { this.props.artist }</p>
                    <p>Year: { this.props.year }</p>
                    <p>Period: { period }</p> 
                    <p>Medium: { this.props.medium }</p>
                    <p>Location: { this.props.location }</p>
                </div>
        }
        return (
            /* Display the painting properties within DOM elements */
            <section>
                <h2>{ this.props.title }</h2>
                <img src={ this.props.url } alt={ this.props.title } width={ this.props.width } onClick={ this.props.onClick }/>
                { info }                
            </section>  
        );
    }
}

export default Painting;