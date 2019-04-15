import React from "react";
import Slider from "react-slick";
import VideoPlayer from "./VideoPlayer";
import screenfull from "screenfull";
import { findDOMNode } from 'react-dom';


class VideoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();

    this.state = {
      movies: null,
      playVideo:false,
      videoUrl :""
    }
  }

  

  playVideo(url,e){
    console.log(url)
    this.setState({
      playVideo:true,
      videoUrl:url
    });

    screenfull.request(findDOMNode(this.player.current));
  }
 

  componentDidMount() {
    // #1. Fetch movies from the API
    fetch('https://demo2697834.mockable.io/movies')
      .then(response => response.json()) // Parse the JSON response
      .then(movies => this.setState({ movies })) // #2. Push the movies json object to component state
  }
 

  render() {

    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "120px",
      speed: 500,
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 4,
            infinite: true,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    };
    const { movies } = this.state

    if (!movies) return <div>Movies are not fetched yet!</div>

    // #3. Finally, render the `<Carousel />` with the movies
    return <div className="container">
    <div className="content row">
    <div className="col-12">
    <Slider {...settings}>
        {
          movies.entries.map((item, index) => {
            return (<div className="video" key={index} onClick={(e) => this.playVideo(item.contents[0].url, e)}>
              <img src={item.images[0].url} />
              <div className="title">{item.title}</div>
            </div>)
          })
        }
      </Slider>
      <VideoPlayer setRef={this.player} isVisible={this.state.playVideo} url={this.state.url}></VideoPlayer>
    </div>
    </div>

    </div>
  }
}

export default VideoCarousel;