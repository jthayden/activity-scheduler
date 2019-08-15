import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class GolfCourse extends Component {
    state = {
        golf_course:{},
        tee_time_bookings:[],
        golf_lesson_bookings:[],
        redirectToHome: false,
        isNewTeeTimeBookingFormDisplayed: false,
        newTeeTimeBooking: {
            name:'',
            time:'',
            guests:'',
            carts:'',
            course: this.props.match.params.id
        },
        isNewGolfLessonBookingFormDisplayed: false,
        newGolfLessonBooking: {
            name:'',
            time:'',
            pro:'',
            course: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.getGolfCourse(this.props.match.params.id)
        this.getRoutes()
    }

    getGolfCourse = () => {
        axios.get(`/api/v1/golfcourses/${this.props.match.params.id}/`)
        .then(res => {
            this.setState({ golf_course: res.data })
        })
    }

    getRoutes = () => {
axios.get(`/api/v1/teetimes/`).then(res => {
    this.setState({ tee_time_bookings: res.data })
})
    }

    render() {
        let teeTimeBookingList = this.state.tee_time_bookings.map((tee_time_booking) => {
            return (
                <Link>
                    <p>{tee_time_booking.name}{tee_time_booking.time}{tee_time_booking.guests}{tee_time_booking.carts}</p>
                </Link>
            )
        })
        return (
            <div>
                <div>
                    <img src={this.state.golf_course.photo_url} />
                    <h2>{this.state.golf_course.name}</h2>
                    <p>{this.state.golf_course.description}</p>
                    
                    <h4>Tee Time Bookings</h4>
                    <Link to={`/golfcourses/${this.props.match.params.id}/teetimes/new`}>Book a Tee Time</Link>
                    <div>{teeTimeBookingList}</div>
                </div>
            </div>
        )
    }
}
