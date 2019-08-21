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

export default class GolfCourse extends Component {
    state = {
        golf_course: {
        tee_time_bookings: [],
        golf_lesson_bookings: []
        },
        redirectToHome: false,
        isNewTeeTimeBookingFormDisplayed: false,
        newTeeTimeBooking: {
        name: "",
        time: "",
        guests: "",
        carts: "",
        course: this.props.match.params.id
        },
        isNewGolfLessonBookingFormDisplayed: false,
        newGolfLessonBooking: {
        name: "",
        time: "",
        pro: "",
        course: this.props.match.params.id
        }
    };

    componentDidMount() {
        axios
        .get(`/api/v1/golfcourses/${this.props.match.params.id}/`)
        .then(res => {
            this.setState({ golf_course: res.data });
        });
    }

    render() {
        let teeTimeBookingList = this.state.golf_course.tee_time_bookings.map(
        tee_time_booking => {
            return (
            <div>
                <div className="root">
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className="heading">
                        {tee_time_booking.time}
                    </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        Member: {tee_time_booking.name}
                        <br />
                        Guest(s): {tee_time_booking.guests}
                        <br />
                        Cart(s): {tee_time_booking.carts}
                        <br />
                        <Link to={`/teetimes/${tee_time_booking.id}/`}>
                        <Button
                            color="primary"
                            className="info-button"
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
            </div>
            );
        }
        );

        let golfLessonBookingList = this.state.golf_course.golf_lesson_bookings.map(
        golf_lesson_booking => {
            return (
            <div className="root">
                <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className="heading">
                    {golf_lesson_booking.time}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    Member: {golf_lesson_booking.name}
                    <br />
                    Pro: {golf_lesson_booking.pro}
                    <br />
                    <Link to={`/golflessons/${golf_lesson_booking.id}/`}>
                        <Button className="info-button" size="medium">
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
            <img src={this.state.golf_course.photo_url} />
            <h2>{this.state.golf_course.name}</h2>
            <p>{this.state.golf_course.description}</p>

            <h3>Tee Time Bookings</h3>
            <Link to={`/golfcourses/${this.props.match.params.id}/teetimes/new`}>
                <Button size="medium" color="primary">
                Book a Tee Time
                </Button>
            </Link>
            <div className="booking-list">{teeTimeBookingList}</div>

            <h3>Golf Lessons</h3>
            <Link
                to={`/golfcourses/${this.props.match.params.id}/golflessons/new`}
            >
                <Button size="medium" color="primary">
                Schedule a Golf Lesson
                </Button>
            </Link>
            <div className="booking-list">{golfLessonBookingList}</div>
            </div>
        </div>
        );
    }
}
