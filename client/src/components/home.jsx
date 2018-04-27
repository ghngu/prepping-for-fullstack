import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './form';
import Chirp from './chirp';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chirps: [],
        }
    }

    componentDidMount() {
        fetch(`/api/chirps/`)
            .then(res => {
                return res.json()
            })
            .then(chirps => {
                let chirpArr = Object.values(chirps);
                chirpArr.pop();
                chirpArr.reverse();
                this.setState({ chirps: chirpArr })
            })
    }

    render() {
        let chirps = this.state.chirps;
        console.log(chirps)

        let allChirps = chirps.map((chirp) => {
            return (
                <div key={chirp.id} className="card col-md-8 text-center my-2">
                    <div className="card-body">
                        <p className="card-text">{chirp.message}</p>
                    </div>
                    <Link className="btn btn-primary w-1" to={`/chirp/${chirp.id}`}>View Chirp!</Link>
                </div>
            )
        })
        return (
            <Fragment>
                <div className="jombotron text-center my-3">
                    <div className="header">
                        <h1>Chirpr!</h1>
                        <h3>A Place For Friends</h3>
                    </div>
                </div>

                <div className="container">
                    <Form />
                    <div className="row d-flex justify-content-center my-3">
                        {allChirps}
                    </div>
                </div>
            </Fragment>
        )
    }
}