import React, { Component } from 'react';
import ReactPlayer from 'react-player'

const VideoPlayer = React.forwardRef((props) => (
    <div className={(props.isVisible ? "visible" : "hidden") +" player-wrapper"} >
    <ReactPlayer  onEnded={props.stopVideo} onReady={props.setReady} onPlay={props.setStart} tabIndex="1"   ref={props.setRef} controls className="react-player" url={props.url} playing onKeyDown={props.onKeyDown} /></div>

));


export default VideoPlayer