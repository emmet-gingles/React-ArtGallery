import React, { Component } from 'react';
import Painting from './Painting';

// creates a component with a list of painting components
class List extends Component {

    constructor(props) {
        super();
        this.listPaintings = this.listPaintings.bind(this);
        this.getPageNumbers = this.getPageNumbers.bind(this);
    }
   
    // Function that creates a list of Painting components
    listPaintings() {
        // Variable to store the index of the last painting on page
        const indexOfLastPainting = this.props.currentPage * this.props.resultsPerPage;
        // Variable to store the index of the first painting on page 
        const indexOfFirstPainting = indexOfLastPainting - this.props.resultsPerPage;
       
        // Iterate through array and each time create a new component passing in respective properties
        return this.props.paintings.slice(indexOfFirstPainting, indexOfLastPainting).map((item, i) =>
            <Painting key={i} title={item.title} artist={item.artist} url={item.url} 
                year={item.year} period={item.period} medium={item.medium} location={item.location} 
                width={item.width*this.props.scale} hideInformation={this.props.hideInformation}
                onClick={e => this.props.onClick(e)} 
            /> 
        );
    }

    // Function that returns the page numbers 
    getPageNumbers() {
        // Array for storing page numbers
        const pageNumbers = [];
        // For each page add number to array
        for (let i = 1; i <= this.props.numPages; i++) {
            pageNumbers.push(i);
        }
        // Return the page number as a list item
        return pageNumbers.map((number) => 
            <li key={number}
                id={number} 
                className={number === this.props.currentPage ? "currentPage" : "pageNumber"}
                onClick={() => this.props.pageNum(number) } >
                {number}
            </li>
        );
    }

     render() { 
        // Variables to store the previous and next buttons
        let prevBtn;
        let nextBtn;

        // If the current page is greater than 1 then show previous button with onClick fuction
        if(this.props.currentPage > 1) {
            prevBtn = <li onClick={()=> this.props.prevPage()}>&laquo;</li>;
        }
        // Else disable the button
        else {
            prevBtn = <li className="disabled">&laquo;</li>;
        }
        // If the current page is les than the last page then show next button with onClick function
        if(this.props.currentPage < this.props.numPages) {
            nextBtn = <li onClick={()=> this.props.nextPage()}>&raquo;</li>;
        }
        // Else disable the button
        else {
            nextBtn = <li className="disabled">&raquo;</li>;
        }
         return (   
            <div>   
               <div id="resultsGrid">
                    <p>{this.props.paintings.length} results found</p>
                    <ul id="page-numbers"  >
                        { prevBtn }
                        {/* Call function to show page numbers */}
                        {this.getPageNumbers()}
                        { nextBtn }
                    </ul>
                </div>
                {/* Call function to show each painting */}
                {this.listPaintings()}                           
            </div>
         );
    };        
}

export default List;