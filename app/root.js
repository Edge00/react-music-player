import React, { Component } from 'react';
import Header from './components/header';
import Progess from './components/progress.js'

class Root extends Component {
    render() {
        return(
            <div>
                <Header />
                <Progess progress={5}></Progess>
            </div>

        )
    }
}

export default Root;
