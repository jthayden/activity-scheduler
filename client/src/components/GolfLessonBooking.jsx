import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';

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

    toggleEditFormOff = () => {
        this.setState({
        isEditGolfLessonBookingFormDisplayed: false
        });
    };

    render() {
        if (this.state.redirectToHome) {
        return (
            <Redirect
            to={`/golfcourses/${this.state.golf_lesson_booking.course}/`}
            />
        );
        }
        return (
        <div>
            {this.state.isEditGolfLessonBookingFormDisplayed ? (
            <div>
                <IconButton onClick={this.toggleEditFormOff} aria-label="back">
                <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>

                <h3>Golf Lesson</h3>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField
                    name="name"
                    type="text"
                    id="golf-lesson-name"
                    label="name"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.golf_lesson_booking.name}
                    />
                </div>
                <div>
                <TextField
                    name="time"
                    id="golf-lesson-time"
                    type="datetime-local"
                    // helperText="Please select a time."
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.golf_lesson_booking.time}
                />
                </div>
                <div className="dropdown">
                <FormControl variant="outlined">
                    <InputLabel id="golf-lesson-pro-label">
                        pro
                    </InputLabel>
                <Select
                    name="pro"
                    id="golf-lesson-pro"
                    onChange={this.handleInputChange}
                    value={this.state.golf_lesson_booking.pro}
                    >
                        <MenuItem value="Paul">Paul</MenuItem>
                        <MenuItem value="Joe">Joe</MenuItem>
                        <MenuItem value="Roger">Roger</MenuItem>
                        <MenuItem value="Samantha">Samantha</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <Button size="large" type="submit" color="primary">
                    Update Golf Lesson
                </Button>
                </form>
            </div>
            ) : (
            <div>
                <Link to={`/golfcourses/${this.state.golf_lesson_booking.course}/`}>
                <IconButton aria-label="back">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>
                </Link>
                <h3>Golf Lesson</h3>
                <h5>Name: {this.state.golf_lesson_booking.name}</h5>
                <h5>Time: {this.state.golf_lesson_booking.time}</h5>
                <h5>Pro: {this.state.golf_lesson_booking.pro}</h5>

                <Button
                color="primary"
                onClick={this.toggleEditGolfLessonBookingForm}
                >
                Edit Golf Lesson
                </Button>
                <Button
                color="secondary"
                onClick={this.handleDeleteGolfLessonBooking}
                >
                Delete Golf Lesson
                </Button>
            </div>
            )}
        </div>
        );
    }
}
