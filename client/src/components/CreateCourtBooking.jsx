import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default class CreateCourtBooking extends Component {
    state = {
        new_court_booking: {
            name:'',
            time:'',
            court_type:'',
            guests:'',
            tennis_complex: this.props.match.params.id
        },
        redirectToHome: false
    }

    handleInputChange = (evt) => {
        let copiedCourtBooking = {...this.state.new_court_booking}
        copiedCourtBooking[evt.target.name] = evt.target.value
        this.setState({new_court_booking: copiedCourtBooking})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/v1/courtbookings/', this.state.new_court_booking).then(() => {
            this.setState({ 
                redirectToHome:true
            })
        })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to={`/tenniscomplexes/${this.props.match.params.id}/`} />
        }
        
        return (
            <div>
                <h2>Reserve Court</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                        <label htmlFor="new-court-booking-name">Name</label>
                        <input 
                            type="text"
                            name='name'
                            id='new-court-booking-name'
                            onChange={this.handleInputChange}
                            value={this.state.new_court_booking.name}
                        />
                        </div>
                        <div>
                        <label htmlFor="new-court-booking-time">Time</label>
                        <input 
                            type="text"
                            name='time'
                            id='new-court-booking-time'
                            onChange={this.handleInputChange}
                            value={this.state.new_court_booking.time}
                        />
                        </div>
                        <div>
                        <label htmlFor="new-court-booking-court-type">Court Type</label>
                        <input 
                            type="text"
                            name='court_type'
                            id='new-court-booking-court-type'
                            onChange={this.handleInputChange}
                            value={this.state.new_court_booking.court_type}
                        />
                        </div>
                        <div>
                        <label htmlFor="new-court-booking-guests">Guests</label>
                        <input 
                            type="text"
                            name='guests'
                            id='new-court-booking-guests'
                            onChange={this.handleInputChange}
                            value={this.state.new_court_booking.guests}
                        />
                        </div>
                        <Button type='submit' color='primary'>Reserve Court</Button>
                        {/* <input 
                            type="submit"
                            value='Reserve Court'
                        /> */}
                    </div>
                </form>
            </div>
        )
    }
}
