import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';

export default class CreateTeeTime extends Component {
    state = {
        new_tee_time: {
        name: "",
        time: "",
        guests: "",
        carts: "",
        course: this.props.match.params.id
        },
        redirectToHome: false
    };

    handleInputChange = evt => {
        let copiedTeeTime = { ...this.state.new_tee_time };
        copiedTeeTime[evt.target.name] = evt.target.value;
        this.setState({ new_tee_time: copiedTeeTime });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        axios.post("/api/v1/teetimes/", this.state.new_tee_time).then(() => {
        this.setState({
            redirectToHome: true
        });
        });
    };

    render() {
        if (this.state.redirectToHome) {
        return <Redirect to={`/golfcourses/${this.props.match.params.id}/`} />;
        }
        return (
        <div>
            <Link to={`/golfcourses/${this.props.match.params.id}/`}>
            <IconButton aria-label="back">
                <FontAwesomeIcon icon={faChevronLeft} />
            </IconButton>
            </Link>
            <h3>Book Tee Time</h3>
            <form onSubmit={this.handleSubmit}>
            <div>
                <div>
                <TextField
                    label="name"
                    name="name"
                    type="text"
                    id="new-tee-time-name"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_tee_time.name}
                />
                </div>
                <div>
                <TextField
                    name="time"
                    id="new-tee-time-time"
                    type="datetime-local"
                    helperText="Please select a time."
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_tee_time.time}
                />
                </div>
                <div className="dropdown">
                <FormControl variant="outlined">
                    <InputLabel id="new-tee-time-guests-label">
                        guest(s)
                    </InputLabel>
                <Select
                    name="guests"
                    id="new-tee-time-guests"
                    onChange={this.handleInputChange}
                    value={this.state.new_tee_time.guests}
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
                    <InputLabel id="new-tee-time-carts-label">
                        cart(s)
                    </InputLabel>
                <Select
                    name="carts"
                    id="new-tee-time-carts"
                    onChange={this.handleInputChange}
                    value={this.state.new_tee_time.carts}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <Button color="primary" size="large" className="" type="submit">
                Book Tee Time
                </Button>
            </div>
            </form>
        </div>
        );
    }
}
