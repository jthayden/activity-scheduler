import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class TeeTimeBooking extends Component {
    state = {
        tee_time_booking: [],
        redirectToHome: false
    }

    componentDidMount() {
        axios.get(`/api/v1/teetimes/${this.state.tee_time_booking.id}/`)
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
