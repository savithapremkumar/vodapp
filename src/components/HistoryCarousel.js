import React from "react";
import Slider from "react-slick";
import VideoPlayer from "./VideoPlayer";
import screenfull from "screenfull";
import { findDOMNode } from 'react-dom';


class HistoryCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();

    this.state = {
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

  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.stopVideo(e);
    }
  }

  setStart(){
    this.player.current.seekTo(0);
  }

  setReady(){
    this.setState({playing:true})
  }


  componentDidMount() {
    document.addEventListener('keydown',this.handleKeyDown);

  }
   
  componentWillUnmount(){
    document.removeEventListener('keydown',this.handleKeyDown);
  }




  render() {

    const settings = {
      accessibility:true,
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
    const movies = this.props.history

    if (!movies || movies.length === 0) return <div>You haven't viewed any videos yet</div>

    // #3. Finally, render the `<Carousel />` with the movies
    return <div className="container">
      <div className="content row">
        <div className="col-12">
          <Slider {...settings}>
            {
              movies.map((item, index) => {
                return (<div className="video" key={index} onClick={(e) => this.playVideo(item, e)}>
                  <img src={item.images[0].url} />
                  <div className="title">{item.title}</div>
                </div>)
              })
            }
          </Slider>
          <VideoPlayer tabIndex="0" setReady={()=>this.setReady()} stopVideo={() =>this.stopVideo()} setStart={() =>this.setStart()} setRef={this.player} isVisible={this.state.playVideo} onKeyDown={(e) => this.handleKeyDown(e)} url={this.state.videoUrl}></VideoPlayer>
        </div>
      </div>

    </div>
  }
}

export default HistoryCarousel;