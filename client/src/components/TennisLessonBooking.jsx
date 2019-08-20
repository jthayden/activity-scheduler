import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

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
                isEditTennisLessonBookingFormDisplayed:false
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
            return <Redirect to={`/tenniscomplexes/${this.state.tennis_lesson_booking.tennis_complex}/`} />
        }

        return (
            <div>
                {this.state.isEditTennisLessonBookingFormDisplayed ?(
                    <form onSubmit={this.handleSubmit}>
                        <div>
                        <label htmlFor="tennis-lesson-name">Name</label>
                        <input 
                            type="text"
                            name='name'
                            id='tennis-lesson-name'
                            onChange={this.handleInputChange}
                            value={this.state.tennis_lesson_booking.name}
                        />
                        </div>
                        <div>
                        <label htmlFor="tennis-lesson-time">Time</label>
                        <input 
                            type="text"
                            name='time'
                            id='tennis-lesson-time'
                            onChange={this.handleInputChange}
                            value={this.state.tennis_lesson_booking.time}
                        />
                        </div>
                        <div>
                        <label htmlFor="tennis-lesson-pro">Pro</label>
                        <input 
                            type="text"
                            name='pro'
                            id='tennis-lesson-id'
                            onChange={this.handleInputChange}
                            value={this.state.tennis_lesson_booking.pro}
                        />
                        </div>
                        <Button type='submit' color='primary'>Update Tennis Lesson</Button>
                        {/* <input type="submit" value='Update Tennis Lesson'/> */}
                    </form>
                ) : (
                    <div>
                        <h5>Name: {this.state.tennis_lesson_booking.name}</h5>
                        <h5>Time: {this.state.tennis_lesson_booking.time}</h5>
                        <h5>Pro: {this.state.tennis_lesson_booking.pro}</h5>
                    
                        <Button color='primary' onClick={this.toggleEditTennisLessonBookingForm}>Edit Tennis Lesson</Button>
                        <Button color='secondary' onClick={this.handleDeleteTennisLessonBooking}>Delete Tennis Lesson</Button>
                    </div>
                
                )}

            </div>
        )
    }
}
