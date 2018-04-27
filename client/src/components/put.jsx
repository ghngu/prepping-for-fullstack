import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Put extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            id: ""
        }
    }
    deleteChirp() {
        fetch(`/api/chirps/${this.state.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                console.log("success: ", response)
                this.props.history.replace("/")
            })
            .catch(err => {
                console.log("error: ", err)
            })
    }
    handleInput(message) {
        this.setState({ message })
    };

    componentDidMount() {
        fetch(`/api/chirps/${this.props.match.params.id}`)
            .then(res => {
                return res.json()
            })
            .then(chirp => {
                this.setState({ message: chirp.message, id: chirp.id })
            })
    }

    putChirp() {
        let data = {
            message: this.state.message,
            id: this.state.id
        }
        fetch(`/api/chirps/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => {
                console.log("success: ", response)
                this.props.history.replace("/")
            })
            .catch(err => {
                console.log("error: ", err)
            })
    }

    render() {
        return (
            <div className="container d-flex justify-content-center">
                <div className="card col-md-10 my-5" >
                    <div className="card-head">
                        <h5 className="card-title">Chirp ID: {this.state.id}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Edit Chirp Message:</h6>
                    </div>
                    <div className="card-body d-flex justify-content-center">
                        <input type="text" name="chirp" className="w-100 text-center" value={`${this.state.message}`} onChange={(e) => { this.handleInput(e.target.value) }} />
                    </div>
                    <div className="links text-center">
                        <Link className="btn btn-primary mr-2" to="/">Home!</Link>
                        <button className="btn btn-primary mr-2" onClick={() => { this.putChirp() }}>Save Changes</button>
                        <button className="btn btn-danger mr-2" onClick={() => { this.deleteChirp() }}>Delete Chirp</button>
                    </div>
                </div>
            </div>
        )
    }
}