import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class TeeTimeBooking extends Component {
    state = {
        tee_time_booking: {},
        redirectToHome: false
    }

    componentDidMount() {
        axios.get(`/api/v1/teetimes/${this.props.match.params.id}/`)
        .then(res => {
            this.setState({
                tee_time_booking: res.data
            })
        })
    }

    render() {
        return (
            <div>
                <h5>Name: {this.state.tee_time_booking.name}</h5>
                <h5>Time: {this.state.tee_time_booking.time}</h5>
                <h5>Guests: {this.state.tee_time_booking.guests}</h5>
                <h5>Carts: {this.state.tee_time_booking.carts}</h5>
                {/* <h5>Course: {this.state.tee_time_booking.course}</h5> */}
            </div>
        )
    }
}
