import React, {Component} from 'react';
import Progress from '../components/progress';
import './player.scss';

let musicDuration = null;

class Player extends Component {

  constructor(props) {
    super(props),
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true
    },
    this.setProgress = this.setProgress.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      musicDuration = e.jPlayer.status.duration;
      this.setState({
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute
      });
    });
  }

  componentWillUnMount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }

  setProgress(pgs) {
    $('#player').jPlayer('play', musicDuration * pgs);
  }

  setVolume(pgs) {
    $('#player').jPlayer('volume', pgs);
  }

  play() {
    $('#player').jPlayer(this.state.isPlay ? 'pause' : 'play');
    this.setState({ isPlay: this.state.isPlay ? false : true});
  }

  render() {
    return (
      <div className="container-player">
        <h1 className="caption">我的私人音乐坊 &gt;</h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">
              {this.props.cuerrentMusicItem.title}
            </h2>
            <h3 className="music-artist mt10">
              {this.props.cuerrentMusicItem.artist}
            </h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-2:00</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{
                  top: 5,
                  left: -5
                }}></i>
                <div className="volume-wrapper">
                  <Progress
                    progress={this.state.volume}
                    setProgress={this.setVolume}
                    barColor='red'
                  />
                </div>
              </div>
            </div>
            <div style={{
              height: 10,
              lineHeight: '10px'
            }}>
              <Progress
                progress={this.state.progress}
                setProgress={this.setProgress}
                barColor='green'
              />
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev"></i>
                <i onClick={this.play} className="icon ml20 play"></i>
                <i className="icon next ml20"></i>
              </div>
              <div className="-col-auto">
                <i className="icon repeat-cycle"></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img
              src={this.props.cuerrentMusicItem.cover}
              alt={this.props.cuerrentMusicItem.title}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Player;
