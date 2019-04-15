import React, { Component } from 'react';
import ReactPlayer from 'react-player'

const VideoPlayer = React.forwardRef((props) => (


    <div className={props.isVisible ? "visible" : "hidden" +" player-wrapper"}><ReactPlayer ref={props.setRef}
        controls="true" className="react-player" url='http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4' playing /></div>

));


export default VideoPlayer