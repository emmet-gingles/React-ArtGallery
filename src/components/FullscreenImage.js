import React, { Component } from "react"

// creates a component with an image taking up the full screen size
class FullscreenImage extends Component {

        render() {
            return (
                <div>
                    <div id="fsimageBorder" onClick={ this.props.handleClick }>                  
                        <img id="fsimage" alt="something" src="" />                      
                    </div>                 
                </div>
            );
        }
}

export default FullscreenImage;