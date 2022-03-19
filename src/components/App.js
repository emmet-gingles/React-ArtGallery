import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import List from './List';
import data from "../data/paintings.json";

// Creates a component containing a list of painting components and options to filter
class App extends Component {

    constructor(props) {
        super();

        this.state = {
            paintings: [],                      // Array of paintings taken from JSON file
            orderBy: "year",                    // Property that paintings will be ordered by
            searchBy: "artist",                 // Property used for searching pintings
            searchFor: "",                      // Value used for searches
            suggestions: [],                    // Array of suggestions based on the value of searchFor 
            ascendingOrder: true,               // Boolean used to determine ascending or descending order of paintings
            showSuggestions: false,             // Boolean used to determine whether or not suggestions are show
            hideInformation: false,             // Boolean used to determine whether or not additional information about each painting is shown
            scale: 1,                           // Used to store the scale of the image
            currentPage: 1,                     // Used to store the current results page
            resultsPerPage: 5,                  // Used to store the number of results for each page
            numPages: 0                         // Used to store the total number of pages 
        };

        // Functions triggered when the page loads to show DOM elements
        this.showSearchbar = this.showSearchbar.bind(this);
        this.showOrderBy = this.showOrderBy.bind(this);
        this.showSearchBy = this.showSearchBy.bind(this);
        this.showSuggestions = this.showSuggestions.bind(this);
        this.showAscendingOrder = this.showAscendingOrder.bind(this);
        this.showResultsPerPage = this.showResultsPerPage.bind(this);
        this.showImageSize = this.showImageSize.bind(this);
        this.showHideInfo = this.showHideInfo.bind(this);
        
        // Functions that are triggered by click events
        this.setSearchFor = this.setSearchFor.bind(this);
        this.setOrderBy = this.setOrderBy.bind(this);
        this.setSearchBy = this.setSearchBy.bind(this);         
        this.toggleAscendingOrder = this.toggleAscendingOrder.bind(this);
        this.setResultsPerPage = this.setResultsPerPage.bind(this);
        this.setImageSize = this.setImageSize.bind(this); 
        this.toggleHideInformation = this.toggleHideInformation.bind(this);
        this.hideImage = this.hideImage.bind(this);
        this.showImage = this.showImage.bind(this);
        this.clearSuggestions = this.clearSuggestions.bind(this);
        this.clickSuggestion = this.clickSuggestion.bind(this);
        this.gotoNextPage = this.gotoNextPage.bind(this);
        this.gotoPrevPage = this.gotoPrevPage.bind(this);
        
        // Functions triggered by calling other functions
        this.getData = this.getData.bind(this);
        this.sortData = this.sortData.bind(this);
        this.setPageNumber = this.setPageNumber.bind(this);
        this.setNumPages = this.setNumPages.bind(this);
    }

    // When component loads 
    componentDidMount() {
        // Call function to get the list of paintings
        this.getData();
    }

    // Function that shows a searchbar for handling user input
    showSearchbar() {
        return (
            <div>
                <input type="text" id="search" placeholder="some text" onChange={e => this.setSearchFor(e.target.value)} />
            </div>
        )
    }

    // Function that shows a checkbox for changing the order of results
    showAscendingOrder() {
        return (
            <div>
                <label>Ascending order</label>
                <input type="checkbox" defaultChecked onChange={() => this.toggleAscendingOrder()} />
            </div>
        );
    }

    // Function that shows a drop down menu for changing the property that paintings are ordered by
    showOrderBy() {
        return (
            <div>
                <label>Order by</label>
                <select id="orderBy" onChange={e => this.setOrderBy(e.target.value)}>
                    <option value="year">Year</option>
                    <option value="artist">Artist</option>
                    <option value="title">Painting</option>
                </select>
            </div>
        )
    }

    // Function that shows a drop down menu for changing the property to search by
    showSearchBy() {
        return (
            <div>
                <label>Search by</label>
                <select id="searchFields" onChange={e => this.setSearchBy(e.target.value)}>
                    <option value="artist">Artist</option>
                    <option value="title">Painting</option>
                    <option value="museum">Museum</option>
                    <option value="period">Period</option>
                </select>
            </div>
        )
    }

    // Function that shows a radio button group for selecting the number of paintings shown on each page
    showResultsPerPage() {
        return (
            <div>
                <label>Results per page</label>    
                <input type="radio" name="numResults" value="5" defaultChecked onChange={e => this.setResultsPerPage(e.target.value)} />
                <label>5</label>
                <input type="radio" name="numResults" value="10" onChange={e => this.setResultsPerPage(e.target.value)} />
                <label>10</label>
                <input type="radio" name="numResults" value="15" onChange={e => this.setResultsPerPage(e.target.value)} />
                <label>15</label>
            </div>
        )
    }
    
    // Function that shows a radio button group for selecting the size of each image
    showImageSize() {
        return (
            <div>
                <label>Image size</label>    
                <input type="radio" name="imageSize" value=".5" onChange={e => this.setImageSize(e.target.value)} />
                <label>Small</label>
                <input type="radio" name="imageSize" value="1" defaultChecked onChange={e => this.setImageSize(e.target.value)} />
                <label>Large</label>
            </div>
        )     
    }

    // Function that shows a checkbox for setting whether or not information about each painting is shown
    showHideInfo() {
        return (
            <div>
                <label>Hide painting information</label>
                <input type="checkbox" onChange={() => this.toggleHideInformation()} />
            </div>
        )
    }
    
    // Function that gets the data from JSON file and populates array of paintings
    getData() {     
        // Put list of paintings in the correct order
        this.sortData();
        console.log(data.paintings[0])
        // Set painting's state to the JSON array
        this.setState({
            paintings: data.paintings
        }, function(){
            // Call function to set the number of pages required
            this.setNumPages()
        });

        // If searchbar is not empty
        if(this.state.searchFor !== "") {
            let paintings = data.paintings                          // To store the painting data
            let res = [];                                           // To store the resulting data from searching array
            let suggestions = [];                                   // To store suggestions passed on user input
            let searchField = this.state.searchBy;                  // To store the property to search
            let searchFor = this.state.searchFor;                   // To store the value to search for
            let showSuggestions = this.state.showSuggestions;       // To store whether or not to show suggestions based on user input

            // If searching by artist
            if(searchField === "artist") {
                // Return all paintings that match that pattern
                res = paintings.filter(function(painting) {
                    return painting.artist.toLowerCase().match(searchFor);
                });
                // Iterate through list of results
                for(let i=0;i< res.length;i++) {
                    // If suggestions array doesnt already contain the artist
                    if(!suggestions.includes(res[i].artist)) {
                        // Add it to array
                        suggestions.push(res[i].artist);
                    }
                }
            }
            // If searching by painting
            else if(searchField === "title") {
                res = paintings.filter(function(painting) {
                    return painting.title.toLowerCase().match(searchFor);
                });
                for(let i=0;i< res.length;i++) {
                    if(!suggestions.includes(res[i].title)) {
                        suggestions.push(res[i].title);
                    }
                }
            }
            // If searching by museum
            else if(searchField === "museum") {
                res = paintings.filter(function(painting) {
                    return painting.location.toLowerCase().match(searchFor);
                });
                for(let i=0;i< res.length;i++) {
                    if(!suggestions.includes(res[i].location)) {
                        suggestions.push(res[i].location);
                    }
                }
            }
            // If searching by period
            else if(searchField === "period") {
                // Iterate through list of paintings
                for(let i=0;i< paintings.length;i++){
                    // For each painting iterate through the list of periods              
                    for(let j=0;j< paintings[i].period.length;j++){
                        // Store the current period
                        let period = paintings[i].period[j]
                        // If the period matches the value input
                        if(period.toLowerCase().match(searchFor) !== null) {
                            // Add painting to the results
                            res.push(paintings[i]);
                            // Check that the period is not already in suggestions array
                            if(!suggestions.includes(period)){
                                // If not then add it
                                suggestions.push(period);
                            }
                        }
                    }
                }
            }

            // If true
            if(showSuggestions) {
                // Order array
                suggestions.sort();
                // Update state with suggestions
                this.setState({
                    suggestions: suggestions
                }, function() {
                    // Create list of suggestions
                    this.showSuggestions();
                    // Make suggestions appear on DOM
                    document.getElementById("suggestionsMenu").style.display = "block";
                })
            }
            
            // Update state's paintings 
            this.setState({
                paintings: res
            });
        }
    }

    // Function that changes the order of the paintings
    sortData() {
        // Assign state's ascendingOrder property to a variable
        let ascending = this.state.ascendingOrder;
        // Assign state's orderBy propery to a variable
        let orderBy = this.state.orderBy;
        // If true then order paintings by year
        if(orderBy === "year") {       
            data.paintings.sort(function(a, b){ 
                // If true then order ascendingly
                if(ascending) {
                    console.log("true")
                    return a.year - b.year;
                }
                // Else order descendingly
                else {
                    console.log("false")
                    return b.year - a.year;
                }
            });
        }
        // Else if true then order paintings by title
        else if(orderBy === "title") {
            data.paintings.sort(function(a, b){
                if(ascending) {
                    console.log("true")
                    return a.title.localeCompare(b.title);
                }
                else {
                    console.log("false")
                    return b.title.localeCompare(a.title);
                }
            });
        }
        // Else if true then order paintings by artist
        else if(this.state.orderBy === "artist") {
            data.paintings.sort(function(a, b){
                if(ascending) {
                    console.log("true")
                    return a.artist.localeCompare(b.artist);
                }
                else {
                    console.log("false")
                    return b.artist.localeCompare(a.artist);
                }
            });
        }
    }

    // Function that updates the state's searchFor property whenever the searchbar's text is changed
    setSearchFor(value) {
        // Check that search value is not empty
        if(value === ""){
            // Clear list of suggestions
            this.clearSuggestions();
        }
        // Update state with new value for searchFor, allow suggestions and reset to page 1 of results
        this.setState({
            searchFor: value,
            currentPage: 1,
            showSuggestions: true
        }, function() {
            // Get new paintings based on search information
            this.getData();
        });  
    }

    // Function that updates the state's searchBy property whenever the dropdown menu is changed
    setSearchBy(value) {
        this.setState({
            searchBy: value
        }, function(){
            this.getData();
        });
    }

    // Function that updates the state's orderBy property whenever the dropdown menu is changed
    setOrderBy(value) {
        this.setState({
            orderBy: value
        }, function(){
            this.getData();
        });
    }

    // Function that toggles the state's ascendingOrder property whenever the checkbox is changed
    toggleAscendingOrder() {
        this.setState({
            ascendingOrder: !this.state.ascendingOrder
        }, function(){
            this.getData();
        })
    }


    // Function that creates a list of suggestions 
    showSuggestions() {   
        // Iterate through array of suggestions and create a list item  for each
         return this.state.suggestions.map((item, i) =>  
            <li key={i} className="suggestionItem" onClick={e=> this.clickSuggestion(e.target.textContent)}>{item}</li>          
        );
    }

    // Function that sets the number of pages by dividing the number of paintings by the number of results per page
    setNumPages() {
        this.setState({
            numPages: Math.ceil(this.state.paintings.length / this.state.resultsPerPage)
        })
    }

    // Function that removes the list of suggestions from DOM
    clearSuggestions() {
        document.getElementById("suggestionsMenu").style.display = "none";
        // Stop suggestions from appearing
        this.setState({
            showSuggestions: false
        })
    }

    // Function that sets the searchbar value to the text of the selected suggestion 
    clickSuggestion(val) {
        // Convert the suggestion to lower case and assign it's text to the searchbar
        document.getElementById("search").value = val.toLowerCase();
        // Update the state's searchFor property
        this.setSearchFor(val.toLowerCase());
        // Remove the list of suggestions
        this.clearSuggestions();
    }

    // Function to show the fullscreen image on DOM
    showImage(image) {
        // Get the image's source, alt and width attributes 
        let imageSrc = image.getAttribute('src');
        let altText = image.getAttribute('alt');
        let imageWidth = image.getAttribute("width");
        // Get the image's size from the radio button group
        let scale = document.querySelector("input[name=imageSize]:checked").value;
        // Add image border to DOM
        document.getElementById("fsimageBorder").style.display = "block"; 
        // Assign the image's source and alt to the fullscreen image
        document.getElementById("fsimage").setAttribute("src", imageSrc);
        document.getElementById("fsimage").setAttribute("alt", altText);
        // If the scale is 50% then multiply the width by 2 to get its size correct
        if (scale === '.5') {
            imageWidth = imageWidth * 2;
        }
        // Depending on the width of the original image
        if(imageWidth >= 768) {
            // A different width and padding is applied to the full screen image
            document.getElementById("fsimage").style.width = "70%";
            // This means padding-top and bottom of 5% and padding-right and left of 15%
            document.getElementById("fsimageBorder").style.padding = "5% 15%";
        }
        else if(imageWidth >= 512) {
            document.getElementById("fsimage").style.width = "50%";
            document.getElementById("fsimageBorder").style.padding = "5% 25%";
        }
        else {
            document.getElementById("fsimage").style.width = "30%";
            document.getElementById("fsimageBorder").style.padding = "5% 35%";
        }
    }

     
    // Function to remove the fullscreen image from DOM
    hideImage() {
        document.getElementById("fsimageBorder").style.display = "none";
    }

    // Function that changes the number of paintings per page whenever drop down menu is changed
    setResultsPerPage(value) {
        this.setState({
            resultsPerPage: value,
            currentPage: 1
        }, function() {
            this.setNumPages();
        })
    }

    // Function that changes the size of images
    setImageSize(value) {
        this.setState({
            scale: value 
        })
    }

    // Function that sets whether or not painting information is shown
    toggleHideInformation() {
        this.setState({
            hideInformation: !this.state.hideInformation
        })
    }    

    // Function that changes the page number being shown
    setPageNumber(id) {
        this.setState({
          currentPage: id
        })
      }
    
      // Function that changes the page number to the next page
      gotoNextPage() {
        this.setPageNumber(this.state.currentPage + 1)
      }
    
      // Function that changes the page number to the previous page
      gotoPrevPage() {
        this.setPageNumber(this.state.currentPage - 1)
      }

     render() { 

         return(   
            <div>   
                {/* 
                    A fullscreen image of a painting (hidden by default) with a border around the edges
                    Click event on border is used to hide the image and return to the list of paintings 
                    Click event on image is just called to prevent it from calling the parent's click function 
                */}
                <div id="fsimageBorder"  onClick={e => this.hideImage(e) } >  
                    <img id="fsimage" alt="" src="" onClick={e=> {e.stopPropagation();}}/>                                    
                </div> 
                
                {/* Call function to render search by drop down menu */}
                {this.showSearchBy()}
                {/* This tag is used to remove list of suggestions whenever mouse is pressed outside of its child elements */}
                <OutsideClickHandler onOutsideClick={() => {this.clearSuggestions()}} >
                    {/* Call function to render input box */}
                    {this.showSearchbar()}
                    {/*  List of suggestions*/}
                    <ul id="suggestionsMenu" className="suggestion">
                        {/* Call function to return each suggestion as a list item */}
                        {this.showSuggestions()}
                    </ul> 
                </OutsideClickHandler>

                {/* Call function to render order by drop down menu */}
                {this.showOrderBy()}
                {/* Call function to render ascending order checkbox */}
                {this.showAscendingOrder()}
                {/* Call function to render results per page radio buttons */}
                {this.showResultsPerPage()}
                {/* Call function to render image size radio buttons */}
                {this.showImageSize()}
                {/* Call function to render hide painting information checkbox */}
                {this.showHideInfo()}
                
                {/*  Generate list of paintings and page numbers by passing props */}
               <List paintings={ this.state.paintings } resultsPerPage={this.state.resultsPerPage}
                    scale={ this.state.scale } numPages={this.state.numPages}
                    hideInformation={ this.state.hideInformation } currentPage={this.state.currentPage}
                    onClick={e => this.showImage(e.target)} pageNum={e => this.setPageNumber(e)}
                    prevPage={() => this.gotoPrevPage()} nextPage={() => this.gotoNextPage()} 
                />                        
            </div>
         );
    };
}

export default App;