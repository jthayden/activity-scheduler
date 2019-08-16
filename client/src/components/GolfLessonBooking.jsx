import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

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
            redirectToHome: true
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
        return <Redirect to="/" />;
        }
        return (
        <div>
            {this.state.isEditGolfLessonBookingFormDisplayed ? (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="golf-lesson-name">Name</label>
                <input
                type="text"
                name="name"
                id="golf-lesson-name"
                onChange={this.handleInputChange}
                value={this.state.golf_lesson_booking.name}
                />
                <label htmlFor="golf-lesson-time">Time</label>
                <input
                type="text"
                name="time"
                id="golf-lesson-time"
                onChange={this.handleInputChange}
                value={this.state.golf_lesson_booking.time}
                />
                <label htmlFor="golf-lesson-pro">Pro</label>
                <input
                type="text"
                name="pro"
                id="golf-lesson-pro"
                onChange={this.handleInputChange}
                value={this.state.golf_lesson_booking.pro}
                />
                <input type="submit" value="Update Golf Lesson" />
            </form>
            ) : (
            <div>
                <h5>Name: {this.state.golf_lesson_booking.name}</h5>
                <h5>Time: {this.state.golf_lesson_booking.time}</h5>
                <h5>Pro: {this.state.golf_lesson_booking.pro}</h5>

                <button onClick={this.toggleEditGolfLessonBookingForm}>
                Edit Golf Lesson
                </button>
                <button onClick={this.handleDeleteGolfLessonBooking}>
                Delete Golf Lesson
                </button>
            </div>
            )}
        </div>
        );
    }
}
