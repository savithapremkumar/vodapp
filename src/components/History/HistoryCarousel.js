import React from "react";
import Slider from "react-slick";
import VideoPlayer from "../VideoPlayer";
import screenfull from "screenfull";
import { findDOMNode } from 'react-dom';
import defaultPlaceholder from '../../assets/img/placeholder.png';



class HistoryCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.slider = React.createRef();
    this.videos = React.createRef();

    this.state = {
      playVideo: false,
      videoUrl: "",
      playing: false
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    //using screenfull to check if fullscreen is enabled
    if (screenfull.enabled) {
      screenfull.on('change', (e) => {
        var e = window.event || e;
        //if video is playing then stop it 
        if (this.state.playing) {
          this.stopVideo(e)
        }
      });
    }
  }

  playVideo(item, e) {
    var e = window.event || e;
    this.setState({
      playVideo: true,
      videoUrl: item.contents[0].url
    });

    screenfull.request(findDOMNode(this.player.current));
  }

  stopVideo(e) {
    var e = window.event || e;
    this.setState({
      playVideo: false,
      videoUrl: '',
      playing: false
    });
  }

  handleKeyDown(e) {
    var e = window.event || e;
    if (e.key === "Escape") {
      this.stopVideo(e);
    }
    if (e.key === "ArrowRight") {
      this.slider.current.slickNext();
    }
    if (e.key === "ArrowLeft") {
      this.slider.current.slickPrev();
    }

    if (e.key === "Enter") {
      var item = this.state.movies[this.videos.current.id];
      this.playVideo(item, e);

    }
  }

  setStart() {
    this.player.current.seekTo(0);
  }

  setReady() {
    this.setState({ playing: true })
  }


  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);

  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  addDefaultSrc(e) {
    var e = window.event || e;
    var targ = e.target || e.srcElement;
    targ.src = defaultPlaceholder;
  }



  render() {

    const settings = {
      accessibility: false,
      focusOnSelect: false,
      draggable: false,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
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
          <Slider {...settings} ref={this.slider}> 
            {
              movies.map((item, index) => {
                return (<div className="video" key={index} id={index} tabIndex="0" ref={this.videos} onClick={(e) => this.playVideo(item, e)}>
                  <img src={item.images[0].url} onError={this.addDefaultSrc} />
                  <div className="title">{item.title}</div>
                </div>)
              })
            }
          </Slider>
          <VideoPlayer setReady={() => this.setReady()} stopVideo={() => this.stopVideo()} setStart={() => this.setStart()} setRef={this.player} isVisible={this.state.playVideo} onKeyDown={(e) => this.handleKeyDown(e)} url={this.state.videoUrl}></VideoPlayer>
        </div>
      </div>

    </div>
  }
}

export default HistoryCarousel;