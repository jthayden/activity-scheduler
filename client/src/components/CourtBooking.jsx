import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class CourtBooking extends Component {
    state = {
        court_booking:{},
        redirectToHome: false,
        isEditCourtBookingFormDisplayed: false
    }

    componentDidMount() {
        axios.get(`/api/v1/courtbookings/${this.props.match.params.id}/`).then(res => {
            this.setState({
                court_booking: res.data
            })
        })
    }

    handleDeleteCourtBooking = () => {
        axios.delete(`/api/v1/courtbookings/${this.props.match.params.id}/`, this.state.court_booking).then(() => {
            this.setState({
                redirectToHome: true
            })
        })
    }

    handleInputChange = (evt) => {
        let copiedCourtBooking = {...this.state.court_booking}
        copiedCourtBooking[evt.target.name] = evt.target.value
        this.setState({
            court_booking: copiedCourtBooking
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/v1/courtbookings/${this.state.court_booking.id}/`, this.state.court_booking).then(() => {
            this.setState({
                redirectToHome:true
            })
        })
    }

    toggleEditCourtBookingForm = () => {
        this.setState({
            isEditCourtBookingFormDisplayed: true
        })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to='/' />
        }

        return (
            <div>
                {
                    this.state.isEditCourtBookingFormDisplayed
                    ? (
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="court-booking-name">Name</label>
                        <input 
                            type="text"
                            name='name'
                            id='court-booking-name'
                            onChange={this.handleInputChange}
                            value={this.state.court_booking.name}
                        />
                        <label htmlFor="court-booking-time">Time</label>
                        <input 
                            type="text"
                            name='time'
                            id='court-booking-time'
                            onChange={this.handleInputChange}
                            value={this.state.court_booking.time}
                        />
                        <label htmlFor="court-booking-court-type">Court Type</label>
                        <input 
                            type="text"
                            name='court_type'
                            id='court-booking-court-type'
                            onChange={this.handleInputChange}
                            value={this.state.court_booking.court_type}
                        />
                        <label htmlFor="court-booking-guests">Guests</label>
                        <input 
                            type="text"
                            name='guests'
                            id='court-booking-guests'
                            onChange={this.handleInputChange}
                            value={this.state.court_booking.guests}
                        />
                        <input type='submit' value='Update Court Reservation'/>
                    </form>
                    ) : (
                        <div>
                            <h5>Name: {this.state.court_booking.name}</h5>
                            <h5>Time: {this.state.court_booking.time}</h5>
                            <h5>Court Type: {this.state.court_booking.court_type}</h5>
                            <h5>Guests: {this.state.court_booking.guests}</h5>

                            <button onClick={this.toggleEditCourtBookingForm}>Edit Court Reservation</button>
                            <button onClick={this.handleDeleteCourtBooking}>
                                Delete Court Reservation
                            </button>
                        </div>
                    )
                }
            </div>
        )
    }
}
