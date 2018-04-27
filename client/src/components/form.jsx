import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chirpMess: "",
            chirpId: ""
        }
    }

    handleInput(message) {
        this.setState({ chirpMess: message })
    };

    componentDidMount() {
        fetch(`api/chirps`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({ chirpId: data.nextid })
            })
    }


    postChirp() {
        let data = {
            message: this.state.chirpMess,
            id: this.state.chirpId
        }
        fetch(`api/chirps`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => {
                console.log("success: ", response)
                location.reload();
            })
            .catch(err => {
                console.log("error: ", err)
            })

    }

    render() {
        return (
            <Fragment>
                <div className="form text-center mt-3">
                    <textarea rows="3" col="250" maxLength="300" type="text" id="newChirp" onChange={(e) => { this.handleInput(e.target.value) }} />
                </div>
                <div className="btn d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={() => { this.postChirp() }}>Chirp!</button>
                </div>
            </Fragment>
        )
    }
}

