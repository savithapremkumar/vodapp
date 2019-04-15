import React, { Component} from "react";
import {hot} from "react-hot-loader";
import VideoCarousel from "./components/VideoCarousel";
import Header from './components/Header';
import History from './components/History';
import "./App.css";

const App = () => (
    <div>
     <Header></Header>
      <VideoCarousel />
      <History></History>
    </div>
  );


export default hot(module)(App);