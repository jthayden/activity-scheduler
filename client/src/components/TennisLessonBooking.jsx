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

export default class TennisLessonBooking extends Component {
    state = {
        tennis_lesson_booking: {},
        redirectToHome: false,
        isEditTennisLessonBookingFormDisplayed: false
    };

    componentDidMount() {
        axios
        .get(`/api/v1/tennislessons/${this.props.match.params.id}/`)
        .then(res => {
            this.setState({
            tennis_lesson_booking: res.data
            });
        });
    }

    handleDeleteTennisLessonBooking = () => {
        axios
        .delete(
            `/api/v1/tennislessons/${this.props.match.params.id}/`,
            this.state.tennis_lesson_booking
        )
        .then(() => {
            this.setState({
            redirectToHome: true
            });
        });
    };

    handleInputChange = evt => {
        let copiedTennisLessonBooking = { ...this.state.tennis_lesson_booking };
        copiedTennisLessonBooking[evt.target.name] = evt.target.value;
        this.setState({
        tennis_lesson_booking: copiedTennisLessonBooking
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        axios
        .put(
            `/api/v1/tennislessons/${this.state.tennis_lesson_booking.id}/`,
            this.state.tennis_lesson_booking
        )
        .then(() => {
            this.setState({
            isEditTennisLessonBookingFormDisplayed: false
            });
        });
    };

    toggleEditTennisLessonBookingForm = () => {
        this.setState({
        isEditTennisLessonBookingFormDisplayed: true
        });
    };

    toggleEditFormOff = () => {
        this.setState({
        isEditTennisLessonBookingFormDisplayed: false
        });
    };

    render() {
        if (this.state.redirectToHome) {
        return (
            <Redirect
            to={`/tenniscomplexes/${
                this.state.tennis_lesson_booking.tennis_complex
            }/`}
            />
        );
        }

        return (
        <div>
            {this.state.isEditTennisLessonBookingFormDisplayed ? (
            <div>
                <IconButton onClick={this.toggleEditFormOff} aria-label="back">
                <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>

                <h3>Tennis Lesson</h3>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField
                    name="name"
                    type="text"
                    id="tennis-lesson-name"
                    label="name"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.tennis_lesson_booking.name}
                    />
                </div>
                <div>
                <TextField
                    name="time"
                    type="datetime-local"
                    id="tennis-lesson-time"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.tennis_lesson_booking.time}
                />
                </div>
                <div className="dropdown">
                <FormControl variant="outlined">
                    <InputLabel id="tennis-lesson-pro-label">
                        pro
                    </InputLabel>
                <Select
                    name="pro"
                    id="tennis-lesson-pro"
                    onChange={this.handleInputChange}
                    value={this.state.tennis_lesson_booking.pro}
                    >
                        <MenuItem value="Peter">Peter</MenuItem>
                        <MenuItem value="Kathy">Kathy</MenuItem>
                        <MenuItem value="John">John</MenuItem>
                        <MenuItem value="Kim">Kim</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <Button size="large" type="submit" color="primary">
                    Update Tennis Lesson
                </Button>
                </form>
            </div>
            ) : (
            <div>
                <Link
                to={`/tenniscomplexes/${
                    this.state.tennis_lesson_booking.tennis_complex
                }/`}
                >
                <IconButton aria-label="back">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>
                </Link>
                <h3>Tennis Lesson</h3>
                <h5>Name: {this.state.tennis_lesson_booking.name}</h5>
                <h5>Time: {this.state.tennis_lesson_booking.time}</h5>
                <h5>Pro: {this.state.tennis_lesson_booking.pro}</h5>

                <Button
                color="primary"
                onClick={this.toggleEditTennisLessonBookingForm}
                >
                Edit Tennis Lesson
                </Button>
                <Button
                color="secondary"
                onClick={this.handleDeleteTennisLessonBooking}
                >
                Delete Tennis Lesson
                </Button>
            </div>
            )}
        </div>
        );
    }
}
