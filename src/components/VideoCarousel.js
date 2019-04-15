import React from "react";
import Slider from "react-slick";
import VideoPlayer from "./VideoPlayer";
import screenfull from "screenfull";
import { findDOMNode } from 'react-dom';
import defaultPlaceholder from '../assets/img/placeholder.png';


class VideoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();

    this.state = {
      movies: null,
      playVideo: false,
      videoUrl: "",
      playing:false
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.stopVideo = this.stopVideo.bind(this);

    if (screenfull.enabled) {
      screenfull.on('change', (e) => {
        this.state.playing ? this.stopVideo(e) : console.log(this.state.playing);
      });
    }
  }



  playVideo(item, e) {
    this.setState({
      playVideo: true,
      videoUrl: item.contents[0].url
    });
    screenfull.request(findDOMNode(this.player.current));
    this.props.parentMethod(item,e);
  }

  stopVideo(e) {
    this.setState({
      playVideo: false,
      videoUrl: '',
      playing:false
    });
  }

  handleKeyDown(item,e) {
    console.log("keypress")
    console.log(e.key)
    if (e.key === "Escape") {
      console.log("escaped")
      this.stopVideo(e);
    }

    if(e.key === "Enter"){
      console.log("enter")
      this.playVideo(item,e);

    }
  }

  setStart(){
    this.player.current.seekTo(0);
  }

  setReady(){
    this.setState({playing:true})

  }




  componentDidMount() {
    // #1. Fetch movies from the API
    fetch('https://demo2697834.mockable.io/movies')
      .then(response => response.json()) // Parse the JSON response
      .then(movies => this.setState({ movies })) // #2. Push the movies json object to component state

      //document.addEventListener('keydown',this.handleKeyDown);
  }

  componentWillUnmount(){
    //document.removeEventListener('keydown',this.handleKeyDown);

  }

  addDefaultSrc(e){
    e.target.src = defaultPlaceholder;
  }




  render() {

    const settings = {
      accessibility:true,
      focusOnSelect: true,
      draggable: true,
      arrows:true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            arrows: true,
            slidesToShow: 4,
            infinite: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1,
          }
        }
      ]
    };
    const { movies } = this.state

    if (!movies) return <div className="loading"></div>

    // #3. Finally, render the `<Carousel />` with the movies
    return <div className="container">
      <div className="content row">
        <div className="col-12">
          <Slider {...settings}>
            {
              movies.entries.map((item, index) => {
                return (<div className="video" key={index} tabIndex="0" onKeyDown={(e) => this.handleKeyDown(item,e)}  onClick={(e) => this.playVideo(item, e)}>
                  <img src={item.images[0].url} onError={this.addDefaultSrc} />
                  <div className="title">{item.title}</div>
                </div>)
              })
            }
          </Slider>
          <VideoPlayer setReady={()=>this.setReady()} stopVideo={() =>this.stopVideo()} setStart={() =>this.setStart()} setRef={this.player} isVisible={this.state.playVideo} onKeyDown={(e) => this.handleKeyDown(null,e)} url={this.state.videoUrl}></VideoPlayer>
        </div>
      </div>

    </div>
  }
}

export default VideoCarousel;