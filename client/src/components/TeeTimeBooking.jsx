import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Button from '@material-ui/core/Button'

export default class TeeTimeBooking extends Component {
    state = {
        tee_time_booking: {},
        redirectToHome: false,
        isEditTeeTimeBookingFormDisplayed: false
    };

    componentDidMount() {
        axios.get(`/api/v1/teetimes/${this.props.match.params.id}/`).then(res => {
        this.setState({
            tee_time_booking: res.data
        });
        });
    }

    handleDeleteTeeTimeBooking = () => {
        axios
        .delete(
            `/api/v1/teetimes/${this.props.match.params.id}/`,
            this.state.tee_time_booking
        )
        .then(() => {
            this.setState({
            redirectToHome: true
            });
        });
    };

    handleInputChange = evt => {
        let copiedTeeTimeBooking = { ...this.state.tee_time_booking };

        copiedTeeTimeBooking[evt.target.name] = evt.target.value;
        this.setState({
        tee_time_booking: copiedTeeTimeBooking
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();

        axios
        .put(
            `/api/v1/teetimes/${this.state.tee_time_booking.id}/`,
            this.state.tee_time_booking
        )
        .then(() => {
            this.setState({
            isEditTeeTimeBookingFormDisplayed:false
            });
        });
    };

    toggleEditTeeTimeBookingForm = () => {
        this.setState({
        isEditTeeTimeBookingFormDisplayed: true
        });
    };

    render() {
        if (this.state.redirectToHome) {
        return <Redirect to={`/golfcourses/${this.state.tee_time_booking.course}/`} />;
        }

        return (
        <div>
            {this.state.isEditTeeTimeBookingFormDisplayed ? (
            <form onSubmit={this.handleSubmit}>
                <div>
                <label htmlFor="tee-time-name">Name</label>
                <input
                type="text"
                name="name"
                id="tee-time-name"
                onChange={this.handleInputChange}
                value={this.state.tee_time_booking.name}
                />
                </div>
                <div>
                <label htmlFor="tee-time-time">Time</label>
                <input
                type="text"
                name="time"
                id="tee-time-time"
                onChange={this.handleInputChange}
                value={this.state.tee_time_booking.time}
                />
                </div>
                <div>
                <label htmlFor="tee-time-guests">Guest(s)</label>
                <input
                type="text"
                name="guests"
                id="tee-time-guests"
                onChange={this.handleInputChange}
                value={this.state.tee_time_booking.guests}
                />
                </div>
                <div>
                <label htmlFor="tee-time-carts">Cart(s)</label>
                <input
                type="text"
                name="carts"
                id="tee-time-carts"
                onChange={this.handleInputChange}
                value={this.state.tee_time_booking.carts}
                />
                </div>
                <Button type='submit' color='primary'>Update Tee Time</Button>
                {/* <input type="submit" value="Update Tee Time" /> */}
            </form>
            ) : (
            <div>
                <h5>Name: {this.state.tee_time_booking.name}</h5>
                <h5>Time: {this.state.tee_time_booking.time}</h5>
                <h5>Guests: {this.state.tee_time_booking.guests}</h5>
                <h5>Carts: {this.state.tee_time_booking.carts}</h5>
                {/* <h5>Course: {this.state.tee_time_booking.course}</h5> */}

                <Button onClick={this.toggleEditTeeTimeBookingForm} color='primary'>
                Edit Tee Time
                </Button>
                <Button color='secondary' onClick={this.handleDeleteTeeTimeBooking}>
                Delete Tee Time
                </Button>
            </div>
            )}
        </div>
        );
    }
}
