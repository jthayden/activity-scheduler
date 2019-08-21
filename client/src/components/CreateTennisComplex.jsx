import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class CreateTennisComplex extends Component {
    state = {
        new_tennis_complex: {
        name: "",
        description: "",
        photo_url: ""
        },
        redirectToHome: false
    };

    componentDidMount() {
        this.getAllTennisComplexes();
    }

    getAllTennisComplexes = () => {
        axios.get("/api/v1/tenniscomplexes/").then(res => {
        this.setState({ tennis_complexes: res.data });
        });
    };

    handleInputChange = evt => {
        let copiedTennisComplex = { ...this.state.new_tennis_complex };
        copiedTennisComplex[evt.target.name] = evt.target.value;
        this.setState({ new_tennis_complex: copiedTennisComplex });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        axios
        .post("/api/v1/tenniscomplexes/", this.state.new_tennis_complex)
        .then(() => {
            this.setState({ redirectToHome: true });
            this.getAllTennisComplexes();
        });
    };

    render() {
        if (this.state.redirectToHome) {
        return <Redirect to="/" />;
        }
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-tennis-complex-name">Tennis Complex Name</label>
            <input
                type="text"
                name="name"
                id="new-tennis-complex-name"
                onChange={this.handleInputChange}
                value={this.state.new_tennis_complex.name}
            />
            <label htmlFor="new-tennis-complex-description">
                Tennis Complex Description
            </label>
            <input
                type="text"
                name="description"
                id="new-tennis-complex-description"
                onChange={this.handleInputChange}
                value={this.state.new_tennis_complex.description}
            />
            <label htmlFor="new-tennis-complex-photo-url">
                Tennis Complex Photo
            </label>
            <input
                type="text"
                name="photo_url"
                id="new-tennis-complex-photo-url"
                onChange={this.handleInputChange}
                value={this.state.new_tennis_complex.photo_url}
            />
            <input type="submit" value="Add New Tennis Complex" />
            </form>
        </div>
        );
    }
}
