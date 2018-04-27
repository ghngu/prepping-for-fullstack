import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Put from './put';

export default class Chirp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chirp: {},
        }
    }

    componentDidMount() {
        fetch(`/api/chirps/${this.props.match.params.id}`)
            .then(res => {
                return res.json()
            })
            .then(chirp => {
                this.setState({ chirp })
            })
    }

    render() {
        let chirp = this.state.chirp
        return (
            <div className="container d-flex justify-content-center">
                <div className="card col-md-10 my-5" >
                    <div className="card-head">
                        <h5 className="card-title">Chirp ID: {chirp.id}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Chirp Message:</h6>
                    </div>
                    <div className="card-body d-flex justify-content-center">
                        {/* <input type="text" name="chirp" className="w-100 text-center" value={`${chirp.message}`} onChange={(e) => { this.handleInput(e.target.value) }} /> */}
                        <p className="card-text">{chirp.message}</p>
                    </div>
                    <div className="links text-center">
                        <Link className="btn btn-primary mr-2" to="/">Home!</Link>
                        <Link className="btn btn-primary" to={`/chirp/${chirp.id}/update`}>Edit Chirp!</Link>
                    </div>
                </div>
            </div>
        )
    }
}