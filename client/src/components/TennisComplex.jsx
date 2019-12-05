import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../index.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default class TennisComplex extends Component {
    state = {
        tennis_complex: {
        court_bookings: [],
        tennis_lesson_bookings: []
        },
        redirectToHome: false,
        isNewCourtBookingFormDisplayed: false,
        newCourtBooking: {
        name: "",
        time: "",
        court_type: "",
        guests: "",
        tennis_complex: this.props.match.params.id
        },
        isNewTennisLessonBookingFormDisplayed: false,
        newTennisLessonBooking: {
        name: "",
        time: "",
        pro: "",
        tennis_complex: this.props.match.params.id
        }
    };

    componentDidMount() {
        axios
        .get(`/api/v1/tenniscomplexes/${this.props.match.params.id}/`)
        .then(res => {
            this.setState({ tennis_complex: res.data });
        });
    }

    render() {
        let courtBookingList = this.state.tennis_complex.court_bookings.map(
        court_booking => {
            return (
            <div className="root">
                <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className="heading">
                    Member: {court_booking.name}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    Time: {court_booking.time}
                    <br />
                    Guest(s): {court_booking.guests}
                    <br />
                    Court Type: {court_booking.court_type}
                    <br />
                    <Link to={`/courtbookings/${court_booking.id}/`}>
                        <Button
                        className="info-button"
                        size="medium"
                        color="primary"
                        >
                        {" "}
                        Details
                        </Button>
                    </Link>
                    </Typography>
                </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            );
        }
        );

        let tennisLessonBookingList = this.state.tennis_complex.tennis_lesson_bookings.map(
        tennis_lesson_booking => {
            return (
            <div className="root">
                <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className="heading">
                    Pro: {tennis_lesson_booking.pro}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    Member: {tennis_lesson_booking.name}
                    <br />
                    Time: {tennis_lesson_booking.time}
                    <br />
                    <Link to={`/tennislessons/${tennis_lesson_booking.id}/`}>
                        <Button
                        className="info-button"
                        color="primary"
                        size="medium"
                        >
                        {" "}
                        Details
                        </Button>
                    </Link>
                    </Typography>
                </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            );
        }
        );

        return (
        <div>
            <div>
            <img src={this.state.tennis_complex.photo_url} />
            <h2>{this.state.tennis_complex.name}</h2>
            <p>{this.state.tennis_complex.description}</p>

            <h4>Reserved Courts</h4>
            <Link
                to={`/tenniscomplexes/${
                this.props.match.params.id
                }/courtbookings/new`}
            >
                <Button size="medium" color="primary">
                Reserve a Court
                </Button>
            </Link>
            <div className="booking-list">{courtBookingList}</div>

            <h4>Tennis Lessons</h4>
            <Link
                to={`/tenniscomplexes/${
                this.props.match.params.id
                }/tennislessons/new`}
            >
                <Button size="medium" color="primary">
                Schedule a Tennis Lesson
                </Button>
            </Link>
            <div className="booking-list">{tennisLessonBookingList}</div>
            </div>
        </div>
        );
    }
}
