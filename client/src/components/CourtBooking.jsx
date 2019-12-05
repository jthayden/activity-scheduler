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

export default class CourtBooking extends Component {
    state = {
        court_booking: {},
        redirectToHome: false,
        isEditCourtBookingFormDisplayed: false
    };

    componentDidMount() {
        axios
        .get(`/api/v1/courtbookings/${this.props.match.params.id}/`)
        .then(res => {
            this.setState({
            court_booking: res.data
            });
        });
    }

    handleDeleteCourtBooking = () => {
        axios
        .delete(
            `/api/v1/courtbookings/${this.props.match.params.id}/`,
            this.state.court_booking
        )
        .then(() => {
            this.setState({
            redirectToHome: true
            });
        });
    };

    handleInputChange = evt => {
        let copiedCourtBooking = { ...this.state.court_booking };
        copiedCourtBooking[evt.target.name] = evt.target.value;
        this.setState({
        court_booking: copiedCourtBooking
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        axios
        .put(
            `/api/v1/courtbookings/${this.state.court_booking.id}/`,
            this.state.court_booking
        )
        .then(() => {
            this.setState({
            isEditCourtBookingFormDisplayed: false
            });
        });
    };

    toggleEditCourtBookingForm = () => {
        this.setState({
        isEditCourtBookingFormDisplayed: true
        });
    };

    toggleEditFormOff = () => {
        this.setState({
        isEditCourtBookingFormDisplayed: false
        });
    };

    render() {
        if (this.state.redirectToHome) {
        return (
            <Redirect
            to={`/tenniscomplexes/${this.state.court_booking.tennis_complex}/`}
            />
        );
        }

        return (
        <div>
            {this.state.isEditCourtBookingFormDisplayed ? (
            <div>
                <IconButton onClick={this.toggleEditFormOff} aria-label="back">
                <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>
                <h3>Court Reservation</h3>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField
                    name="name"
                    type="text"
                    id="court-booking-name"
                    label="name"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.court_booking.name}
                    />
                </div>
                <div>
                <TextField
                    name="time"
                    type="datetime-local"
                    id="court-booking-time"
                    // helperText="Please select a time."
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.court_booking.time}
                />
                </div>
                <div className="dropdown">
                <FormControl variant="outlined">
                    <InputLabel id="court-booking-court-type-label">
                        court type
                    </InputLabel>
                <Select
                    name="court_type"
                    id="court-booking-court-type"
                    onChange={this.handleInputChange}
                    value={this.state.court_booking.court_type}
                    >
                        <MenuItem value='clay'>clay</MenuItem>
                        <MenuItem value="hard">hard</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <div className="dropdown">
                <FormControl variant="outlined">
                    <InputLabel id="court-booking-guests-label">
                        guest(s)
                    </InputLabel>
                <Select
                    name="guests"
                    id="court-booking-guests"
                    onChange={this.handleInputChange}
                    value={this.state.court_booking.guests}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <Button size="large" type="submit" color="primary">
                    Update Court Reservation
                </Button>
                </form>
            </div>
            ) : (
            <div>
                <Link
                to={`/tenniscomplexes/${
                    this.state.court_booking.tennis_complex
                }/`}
                >
                <IconButton aria-label="back">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>
                </Link>
                <h3>Court Reservation</h3>
                <h5>Name: {this.state.court_booking.name}</h5>
                <h5>Time: {this.state.court_booking.time}</h5>
                <h5>Court Type: {this.state.court_booking.court_type}</h5>
                <h5>Guests: {this.state.court_booking.guests}</h5>

                <Button color="primary" onClick={this.toggleEditCourtBookingForm}>
                Edit Court Reservation
                </Button>
                <Button color="secondary" onClick={this.handleDeleteCourtBooking}>
                Delete Court Reservation
                </Button>
            </div>
            )}
        </div>
        );
    }
}
