import React, { Component } from "react";
import { hot } from "react-hot-loader";
import VideoCarousel from "./components/VideoCarousel";
import Header from './components/Header';
import History from './components/History/History';
import "./assets/css/App.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moviesPlayed: []
          }
    }

    addToHistory(item,e){
        this.setState({ moviesPlayed: [item,...this.state.moviesPlayed, ] });

    }
    render() {
        return (<div>
            <Header></Header>
            <VideoCarousel parentMethod= {this.addToHistory.bind(this)}/>
            <History moviesPlayed={this.state.moviesPlayed}></History>
        </div>);
    }

}




export default hot(module)(App);