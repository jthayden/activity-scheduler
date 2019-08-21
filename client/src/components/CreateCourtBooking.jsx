import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@material-ui/core/TextField";

export default class CreateCourtBooking extends Component {
    state = {
        new_court_booking: {
        name: "",
        time: "",
        court_type: "",
        guests: "",
        tennis_complex: this.props.match.params.id
        },
        redirectToHome: false
    };

    handleInputChange = evt => {
        let copiedCourtBooking = { ...this.state.new_court_booking };
        copiedCourtBooking[evt.target.name] = evt.target.value;
        this.setState({ new_court_booking: copiedCourtBooking });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        axios
        .post("/api/v1/courtbookings/", this.state.new_court_booking)
        .then(() => {
            this.setState({
            redirectToHome: true
            });
        });
    };

    render() {
        if (this.state.redirectToHome) {
        return (
            <Redirect to={`/tenniscomplexes/${this.props.match.params.id}/`} />
        );
        }

        return (
        <div>
            <Link to={`/tenniscomplexes/${this.props.match.params.id}/`}>
            <IconButton aria-label="back">
                <FontAwesomeIcon icon={faChevronLeft} />
            </IconButton>
            </Link>
            <h3>Reserve Court</h3>
            <form onSubmit={this.handleSubmit}>
            <div>
                <div>
                <TextField
                    name="name"
                    type="text"
                    id="new-court-booking-name"
                    label="name"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_court_booking.name}
                />
                </div>
                <div>
                <TextField
                    name="time"
                    type="text"
                    id="new-court-booking-time"
                    label="time"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_court_booking.time}
                />
                </div>
                <div>
                <TextField
                    name="court_type"
                    type="text"
                    id="new-court-booking-court-type"
                    label="court type"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_court_booking.court_type}
                />
                </div>
                <div>
                <TextField
                    name="guests"
                    type="text"
                    id="new-court-booking-guests"
                    label="guest(s)"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_court_booking.guests}
                />
                </div>
                <Button size="large" type="submit" color="primary">
                Reserve Court
                </Button>
            </div>
            </form>
        </div>
        );
    }
}
