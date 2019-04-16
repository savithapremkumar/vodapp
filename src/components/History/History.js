import React, { Component } from "react";
import HistoryCarousel from "./HistoryCarousel";

class History extends React.Component {
    constructor(){
        super();
    }

    render(){
        return (<div className="container">
               <div className="header row">
            <div className="col-12">
                <h3>History</h3>
                <HistoryCarousel history={this.props.moviesPlayed} ></HistoryCarousel>
            </div>
        </div>
    </div>
    );
    }

    
};


export default History;
