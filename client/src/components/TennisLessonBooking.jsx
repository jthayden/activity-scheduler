import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class TennisLessonBooking extends Component {
    state = {
        tennis_lesson_booking: {},
        redirectToHome: false,
        isEditTennisLessonBookingFormDisplayed: false
    }

    componentDidMount() {
        axios.get(`/api/v1/tennislessons/${this.props.match.params.id}/`).then (res => {
            this.setState({
                tennis_lesson_booking: res.data
            })
        })
    }

    handleDeleteTennisLessonBooking = () => {
        axios.delete(`/api/v1/tennislessons/${this.props.match.params.id}/`, this.state.tennis_lesson_booking).then(() => {
            this.setState({
                redirectToHome:true
            })
        })
    }

    handleInputChange = (evt) => {
        let copiedTennisLessonBooking = {...this.state.tennis_lesson_booking}
        copiedTennisLessonBooking[evt.target.name] = evt.target.value
        this.setState({
            tennis_lesson_booking: copiedTennisLessonBooking
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/v1/tennislessons/${this.state.tennis_lesson_booking.id}/`, this.state.tennis_lesson_booking).then(() => {
            this.setState({
                redirectToHome:true
            })
        })
    }

    toggleEditTennisLessonBookingForm = () => {
        this.setState({
            isEditTennisLessonBookingFormDisplayed:true
        })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to='/' />
        }

        return (
            <div>
                {this.state.isEditTennisLessonBookingFormDisplayed ?(
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="tennis-lesson-name">Name</label>
                        <input 
                            type="text"
                            name='name'
                            id='tennis-lesson-name'
                            onChange={this.handleInputChange}
                            value={this.state.tennis_lesson_booking.name}
                        />
                        <label htmlFor="tennis-lesson-time">Time</label>
                        <input 
                            type="text"
                            name='time'
                            id='tennis-lesson-time'
                            onChange={this.handleInputChange}
                            value={this.state.tennis_lesson_booking.time}
                        />
                        <label htmlFor="tennis-lesson-pro">Pro</label>
                        <input 
                            type="text"
                            name='pro'
                            id='tennis-lesson-id'
                            onChange={this.handleInputChange}
                            value={this.state.tennis_lesson_booking.pro}
                        />
                        <input type="submit" value='Update Tennis Lesson'/>
                    </form>
                ) : (
                    <div>
                        <h5>Name: {this.state.tennis_lesson_booking.name}</h5>
                        <h5>Time: {this.state.tennis_lesson_booking.time}</h5>
                        <h5>Pro: {this.state.tennis_lesson_booking.pro}</h5>
                    
                        <button onClick={this.toggleEditTennisLessonBookingForm}>Edit Tennis Lesson</button>
                        <button onClick={this.handleDeleteTennisLessonBooking}>Delete Tennis Lesson</button>
                    </div>
                
                )}

            </div>
        )
    }
}
