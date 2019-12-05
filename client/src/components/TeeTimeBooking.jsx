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

export default class TeeTimeBooking extends Component {
    state = {
        tee_time_booking: {},
        redirectToHome: false,
        isEditTeeTimeBookingFormDisplayed: false
    };

    componentDidMount() {
        axios.get(`/api/v1/teetimes/${this.props.match.params.id}/`).then(res => {
        this.setState({
            tee_time_booking: res.data
        });
        });
    }

    handleDeleteTeeTimeBooking = () => {
        axios
        .delete(
            `/api/v1/teetimes/${this.props.match.params.id}/`,
            this.state.tee_time_booking
        )
        .then(() => {
            this.setState({
            redirectToHome: true
            });
        });
    };

    handleInputChange = evt => {
        let copiedTeeTimeBooking = { ...this.state.tee_time_booking };

        copiedTeeTimeBooking[evt.target.name] = evt.target.value;
        this.setState({
        tee_time_booking: copiedTeeTimeBooking
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();

        axios
        .put(
            `/api/v1/teetimes/${this.state.tee_time_booking.id}/`,
            this.state.tee_time_booking
        )
        .then(() => {
            this.setState({
            isEditTeeTimeBookingFormDisplayed: false
            });
        });
    };

    toggleEditTeeTimeBookingForm = () => {
        this.setState({
        isEditTeeTimeBookingFormDisplayed: true
        });
    };

    toggleEditFormOff = () => {
        this.setState({
        isEditTeeTimeBookingFormDisplayed: false
        });
    };

    render() {
        if (this.state.redirectToHome) {
        return (
            <Redirect to={`/golfcourses/${this.state.tee_time_booking.course}/`} />
        );
        }

        return (
        <div>
            {this.state.isEditTeeTimeBookingFormDisplayed ? (
            <div>
                <IconButton onClick={this.toggleEditFormOff} aria-label="back">
                <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>
                <h3>Tee Time</h3>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField
                    name="name"
                    type="text"
                    id="tee-time-name"
                    label="name"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.tee_time_booking.name}
                    />
                </div>
                <div>
                <TextField
                    name="time"
                    id="tee-time-time"
                    type="datetime-local"
                    // helperText="Please select a time."
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.tee_time_booking.time}
                />
                </div>
                <div className="dropdown">
                <FormControl variant="outlined">
                    <InputLabel id="tee-time-guests-label">
                        guest(s)
                    </InputLabel>
                <Select
                    name="guests"
                    id="tee-time-guests"
                    onChange={this.handleInputChange}
                    value={this.state.tee_time_booking.guests}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <div className="dropdown">
                <FormControl variant="outlined">
                    <InputLabel id="tee-time-carts-label">
                        cart(s)
                    </InputLabel>
                <Select
                    name="carts"
                    id="tee-time-carts"
                    onChange={this.handleInputChange}
                    value={this.state.tee_time_booking.carts}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                
                
                
                {/* <div>
                    <TextField
                    name="time"
                    type="text"
                    id="tee-time-time"
                    label="time"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.tee_time_booking.time}
                    />
                </div>
                <div>
                    <TextField
                    name="guests"
                    type="text"
                    id="tee-time-guests"
                    label="guest(s)"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.tee_time_booking.guests}
                    />
                </div>
                <div>
                    <TextField
                    name="carts"
                    type="text"
                    id="tee-time-carts"
                    label="cart(s)"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.tee_time_booking.carts}
                    />
                </div> */}
                <Button type="submit" size="large" color="primary">
                    Update Tee Time
                </Button>
                </form>
            </div>
            ) : (
            <div>
                <Link to={`/golfcourses/${this.state.tee_time_booking.course}/`}>
                <IconButton aria-label="back">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>
                </Link>
                <h3>Tee Time</h3>
                <h5>Name: {this.state.tee_time_booking.name}</h5>
                <h5>Time: {this.state.tee_time_booking.time}</h5>
                <h5>Guests: {this.state.tee_time_booking.guests}</h5>
                <h5>Carts: {this.state.tee_time_booking.carts}</h5>

                <Button onClick={this.toggleEditTeeTimeBookingForm} color="primary">
                Edit Tee Time
                </Button>
                <Button color="secondary" onClick={this.handleDeleteTeeTimeBooking}>
                Delete Tee Time
                </Button>
            </div>
            )}
        </div>
        );
    }
}
