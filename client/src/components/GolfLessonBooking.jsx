import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Button from '@material-ui/core/Button'

export default class GolfLesson extends Component {
    state = {
        golf_lesson_booking: {},
        redirectToHome: false,
        isEditGolfLessonBookingFormDisplayed: false
    };

    componentDidMount() {
        axios
        .get(`/api/v1/golflessons/${this.props.match.params.id}/`)
        .then(res => {
            this.setState({
            golf_lesson_booking: res.data
            });
        });
    }

    handleDeleteGolfLessonBooking = () => {
        axios
        .delete(
            `/api/v1/golflessons/${this.props.match.params.id}/`,
            this.state.golf_lesson_booking
        )
        .then(() => {
            this.setState({
            redirectToHome: true
            });
        });
    };

    handleInputChange = evt => {
        let copiedGolfLessonBooking = { ...this.state.golf_lesson_booking };

        copiedGolfLessonBooking[evt.target.name] = evt.target.value;
        this.setState({
        golf_lesson_booking: copiedGolfLessonBooking
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();

        axios
        .put(
            `/api/v1/golflessons/${this.state.golf_lesson_booking.id}/`,
            this.state.golf_lesson_booking
        )
        .then(() => {
            this.setState({
            isEditGolfLessonBookingFormDisplayed: false
            });
        });
    };

    toggleEditGolfLessonBookingForm = () => {
        this.setState({
        isEditGolfLessonBookingFormDisplayed: true
        });
    };

    render() {
        if (this.state.redirectToHome) {
        return <Redirect to={`/golfcourses/${this.state.golf_lesson_booking.course}/`} />;
        }
        return (
        <div>
            {this.state.isEditGolfLessonBookingFormDisplayed ? (
            <form onSubmit={this.handleSubmit}>
                <div>
                <label htmlFor="golf-lesson-name">Name</label>
                <input
                type="text"
                name="name"
                id="golf-lesson-name"
                onChange={this.handleInputChange}
                value={this.state.golf_lesson_booking.name}
                />
                </div>
                <div>
                <label htmlFor="golf-lesson-time">Time</label>
                <input
                type="text"
                name="time"
                id="golf-lesson-time"
                onChange={this.handleInputChange}
                value={this.state.golf_lesson_booking.time}
                />
                </div>
                <div>
                <label htmlFor="golf-lesson-pro">Pro</label>
                <input
                type="text"
                name="pro"
                id="golf-lesson-pro"
                onChange={this.handleInputChange}
                value={this.state.golf_lesson_booking.pro}
                />
                </div>
                <Button type='submit' color='primary'>Update Golf Lesson</Button>
                {/* <input type="submit" value="Update Golf Lesson" /> */}
            </form>
            ) : (
            <div>
                <h5>Name: {this.state.golf_lesson_booking.name}</h5>
                <h5>Time: {this.state.golf_lesson_booking.time}</h5>
                <h5>Pro: {this.state.golf_lesson_booking.pro}</h5>

                <Button color='primary' onClick={this.toggleEditGolfLessonBookingForm}>
                Edit Golf Lesson
                </Button>
                <Button color='secondary' onClick={this.handleDeleteGolfLessonBooking}>
                Delete Golf Lesson
                </Button>
            </div>
            )}
        </div>
        );
    }
}
