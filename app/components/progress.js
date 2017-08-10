import React, { Component } from 'react';
import './progress.scss';


class Progess extends Component {

    constructor(props) {
        super(props);
        this.setProgress = this.setProgress.bind(this);
    }

    setProgress(e) {
        let settedProgress = (e.screenX - this.refs.propgressBar.getBoundingClientRect().left) / this.refs.propgressBar.clientWidth;
        this.props.setProgress(settedProgress);
    }

    render() {
        let barStyle = {
            width: `${this.props.progress}%`,
            background: this.props.barColor
        };

        return(
            <div onClick={this.setProgress}
                ref="propgressBar"
                className="components-progress"
            >
                <div
                    className="progress"
                    style={barStyle}
                ></div>
            </div>
        );
    }
}

export default Progess;
