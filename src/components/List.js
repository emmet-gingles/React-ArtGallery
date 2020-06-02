import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Painting from './Painting';
import SearchBar from './SearchBar';
import SelectSearchBy from './SelectSearchBy';
import SelectOrderBy from './selectOrderBy';
import SetOrder from './SetOrder';
import Suggestion from './Suggestion';
import FullscreenImage from './FullscreenImage';
import data from "../data/paintings.json";

// creates a component with a list of painting components
class List extends Component {

    constructor(props) {
        super();

        this.state = {
            paintings: [],                      // array of paintings taken from JSON file
            orderBy: "year",                    // property the data will be ordered by
            searchBy: "artist",                 // property used for searches
            searchFor: "",                      // values used for searches
            ascendingOrder: true,               // boolean used to determine ascending or descending order
            suggestions: [],                    // array of suggestions based on the value of searchFor 
            showSuggestions: true               // boolean used to determine whether suggestions are show
        };

        this.getData = this.getData.bind(this);
        this.setOrderBy = this.setOrderBy.bind(this);
        this.setSearchBy = this.setSearchBy.bind(this);
        this.setSearchFor = this.setSearchFor.bind(this);
        this.setAscendingOrder = this.setAscendingOrder.bind(this);
        this.listPaintings = this.listPaintings.bind(this);
        this.listSuggestions = this.listSuggestions.bind(this);
        this.clearSuggestions = this.clearSuggestions.bind(this);
        this.clickSuggestion = this.clickSuggestion.bind(this);
        this.hideImage = this.hideImage.bind(this);
        this.showImage = this.showImage.bind(this);
    }

    componentDidMount() {
        this.getData();
    }
    
    // function that gets the data from JSON file and populates array
    getData() {     
        // put list of paintings in the correct order
        this.sortData();
        // set painting's state to the JSON array
        this.setState({
            paintings: data.paintings
        });

        // if searchbar is not empty
        if(this.state.searchFor !== "") {
            
            var res;                                                // the resulting data of searching array
            var suggestions = [];                                   // array of suggestions
            var searchField = this.state.searchBy;                  // variables to access the state properties
            var searchFor = this.state.searchFor;
            var showSuggestions = this.state.showSuggestions;
            var i;                                                  // for iterating through

            // if searching for an artist
            if(searchField === "artist") {
                // return all paintings that have that artist
                res = data.paintings.filter(function(painting) {
                    return painting.artist.toLowerCase().match(searchFor);
                });
                // if true
                if(showSuggestions) {
                    // iterate through list of results
                    for(i=0;i< res.length;i++) {
                        // if array doesnt already contain the artist
                        if(!suggestions.includes(res[i].artist)) {
                            // add it to array
                            suggestions.push(res[i].artist);
                        }
                    }
                }
            }
            // if searching for a painting
            else if(searchField === "title") {
                // return all paintings that have that title
                res = data.paintings.filter(function(painting) {
                    return painting.title.toLowerCase().match(searchFor);
                });
                // if true
                if(showSuggestions) {
                    // iterate through list of results
                    for(i=0;i< res.length;i++) {
                        // if array doesnt already contain the painting title
                        if(!suggestions.includes(res[i].title)) {
                            // add it to the array
                            suggestions.push(res[i].title);
                        }
                    }
                }
            } 

            // if true
            if(showSuggestions) {
                // update state 
                this.setState({
                    suggestions: suggestions
                }, function(){
                    // create list of suggestions
                    this.listSuggestions();
                    // make suggestions appear on DOM
                    document.getElementById("suggestionsMenu").style.display = "block";
                })
            }
   
            // update state's paintings and allow suggestions to be shown
            this.setState({
                paintings: res,
                showSuggestions: true
            });
        }
    }

    // function that changes the order of the paintings
    sortData() {
        // assign the state's ascendingOrder property to a variable
        var ascending = this.state.ascendingOrder;
        // assign the state's orderBy propery to a variable
        var orderBy = this.state.orderBy;
        // if ordered by year
        if(orderBy === "year") {
            data.paintings.sort(function(a, b){
                // if true order ascendingly
                if(ascending) {
                    return a.year > b.year;
                }
                // else order descendingly
                else {
                    return a.year < b.year;
                }
            });
        }
        // else if ordered by painting title
        else if(orderBy === "title") {
            data.paintings.sort(function(a, b){
                if(ascending) {
                    return a.title > b.title;
                }
                else {
                    return a.title < b.title;
                }
            });
        }
        // else if orderd by artist
        else if(this.state.orderBy === "artist") {
            data.paintings.sort(function(a, b){
                if(ascending) {
                    return a.artist > b.artist;
                }
                else {
                    return a.artist < b.artist;
                }
            });
        }
    }

    // function that updates the state's searchFor property whenever searchbar is changed
    setSearchFor(value) {
        this.setState({
            searchFor: value
        }, function(){
            this.getData();
        });  
    }

    // function that updates the state's searchBy property whenever the dropdown menu is changed
    setSearchBy(value) {
        this.setState({
            searchBy: value,
            showSuggestions: false 
        }, function(){
            this.getData();
        });
    }

    // function that updates the state's orderBy property whenever the dropdown menu is changed
    setOrderBy(value) {
        this.setState({
            orderBy: value,
            showSuggestions: false
        }, function(){
            this.getData();
        });
    }

    // function that updates the state's ascendingOrder property whenever the checkbox is changed
    setAscendingOrder(value) {
        this.setState({
            ascendingOrder: value.checked,
            showSuggestions: false
        }, function(){
            this.getData();
        })
    }

    // function that creates a list of Painting components
    listPaintings() {
        // iterate through array and each time create a new component passing in respective properties
        return this.state.paintings.map((item, i) =>	
            <Painting key={i}  title={item.title} artist={item.artist} url={item.url} 
                year={item.year} period={item.period} medium={item.medium} location={item.location} 
                width={item.width} handleClick={e=> this.showImage(e.target)}/>
        );
    }

    // function that creates a list of Suggestion components
    listSuggestions() {   
        // iterate through array and each time create a component passing in respective components     
        return this.state.suggestions.map((item, i) =>
            <Suggestion key={i} text={item} handleClick={e=> this.clickSuggestion(e.target.textContent)} />
        );
    }

    // function that removes the list of suggestions from DOM
    clearSuggestions() {
        document.getElementById("suggestionsMenu").style.display = "none";
        // update state 
        this.setState({
            showSuggestions: false
        })
    }

    // function that sets the searchbar value to the text of the selected suggestion 
    clickSuggestion(val) {
        // convert the suggestion to lower case and assign it to the searchbar
        document.getElementById("search").value = val.toLowerCase();
        // remove the list of suggestions
        this.clearSuggestions();
        // update the state's searchFor property
        this.setSearchFor(val.toLowerCase());
    }

    // function to show the fullscreen image on DOM
    showImage(image) {
        // get the image's source attribute and store in variable
        var imageSrc = image.getAttribute('src')
        // add image border to DOM
        document.getElementById("fsimageBorder").style.display = "block";
        // assign the image's source to the fullscreen image
        document.getElementById("fsimage").setAttribute("src", imageSrc);
        // get the image's width and store in variable
        var imageWidth = image.getAttribute("width");
        // depending on the width of the original image
        if(imageWidth >= 768) {
            // a different width and padding is applied to the full screen image
            document.getElementById("fsimage").style.width = "80%";
            // this means padding-top and bottom of 5% and padding-right and left of 10%
            document.getElementById("fsimageBorder").style.padding = "5% 10%";
        }
        else if(imageWidth >= 512) {
            document.getElementById("fsimage").style.width = "60%";
            document.getElementById("fsimageBorder").style.padding = "5% 20%";
        }
        else {
            document.getElementById("fsimage").style.width = "40%";
            document.getElementById("fsimageBorder").style.padding = "5% 30%";
        }
    }

     
    // function to remove the fullscreen image from DOM
    hideImage() {
        document.getElementById("fsimageBorder").style.display = "none";
    }

     render() { 
         return(   
            <div>   
                {/* here we call each component with each having its own event */}
                <FullscreenImage  handleClick={e =>{ this.hideImage()}} />
                <SelectSearchBy handleChange ={e => { this.setSearchBy(e.target.value)}}/>
                {/* use this tag to remove list of suggestions whenever mouse is pressed outside of its child elements */}
                <OutsideClickHandler onOutsideClick={() => {this.clearSuggestions()}} >
                    <SearchBar id="search" handleInput={e => this.setSearchFor(e.target.value) }/>
                    <ul id="suggestionsMenu" className="suggestion">
                        {/* call function to return each suggextion as a list item */}
                        {this.listSuggestions()}
                    </ul>
                </OutsideClickHandler>
                <SelectOrderBy handleChange={e => this.setOrderBy(e.target.value)}/>
                <SetOrder handleChange= {e =>this.setAscendingOrder(e.target)}/>
                {/* call function to return each painting */}
                {this.listPaintings()}           
            </div>
         );
    };
        
}

// export the class
export default List;