import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                isEditCourtBookingFormDisplayed:false
            })
        })
    }

    toggleEditCourtBookingForm = () => {
        this.setState({
            isEditCourtBookingFormDisplayed: true
        })
    }

    toggleEditFormOff = () => {
        this.setState({
            isEditCourtBookingFormDisplayed:false
        })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to={`/tenniscomplexes/${this.state.court_booking.tennis_complex}/`} />
        }

        return (
            <div>
                {
                    this.state.isEditCourtBookingFormDisplayed
                    ? (
                    <div>
                        <IconButton onClick={this.toggleEditFormOff} aria-label='back'><FontAwesomeIcon icon={faChevronLeft}/></IconButton>
                    
                    <form onSubmit={this.handleSubmit}>
                        <div>
                        <label htmlFor="court-booking-name">Name</label>
                        <input 
                            type="text"
                            name='name'
                            id='court-booking-name'
                            onChange={this.handleInputChange}
                            value={this.state.court_booking.name}
                        />
                        </div>
                        <div>
                        <label htmlFor="court-booking-time">Time</label>
                        <input 
                            type="text"
                            name='time'
                            id='court-booking-time'
                            onChange={this.handleInputChange}
                            value={this.state.court_booking.time}
                        />
                        </div>
                        <div>
                        <label htmlFor="court-booking-court-type">Court Type</label>
                        <input 
                            type="text"
                            name='court_type'
                            id='court-booking-court-type'
                            onChange={this.handleInputChange}
                            value={this.state.court_booking.court_type}
                        />
                        </div>
                        <div>
                        <label htmlFor="court-booking-guests">Guests</label>
                        <input 
                            type="text"
                            name='guests'
                            id='court-booking-guests'
                            onChange={this.handleInputChange}
                            value={this.state.court_booking.guests}
                        />
                        </div>
                        <Button type='submit' color='primary'>Update Court Reservation</Button>
                        {/* <input type='submit' value='Update Court Reservation'/> */}
                    </form>
                    </div>
                    ) : (
                        <div>
                            <Link to={`/tenniscomplexes/${this.state.court_booking.tennis_complex}/`}><IconButton aria-label='back'><FontAwesomeIcon icon={faChevronLeft}/></IconButton></Link>
                            <h3>Court Reservation</h3>
                            <h5>Name: {this.state.court_booking.name}</h5>
                            <h5>Time: {this.state.court_booking.time}</h5>
                            <h5>Court Type: {this.state.court_booking.court_type}</h5>
                            <h5>Guests: {this.state.court_booking.guests}</h5>

                            <Button color='primary' onClick={this.toggleEditCourtBookingForm}>Edit Court Reservation</Button>
                            <Button color='secondary' onClick={this.handleDeleteCourtBooking}>
                                Delete Court Reservation
                            </Button>
                        </div>
                    )
                }
            </div>
        )
    }
}
