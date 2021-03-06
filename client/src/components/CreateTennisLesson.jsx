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

export default class CreateTennisLesson extends Component {
    state = {
        new_tennis_lesson: {
        name: "",
        time: "",
        pro: "",
        tennis_complex: this.props.match.params.id
        },
        redirectToHome: false
    };

    handleInputChange = evt => {
        let copiedTennisLesson = { ...this.state.new_tennis_lesson };
        copiedTennisLesson[evt.target.name] = evt.target.value;
        this.setState({ new_tennis_lesson: copiedTennisLesson });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        axios
        .post("/api/v1/tennislessons/", this.state.new_tennis_lesson)
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
            <h3>Schedule Tennis Lesson</h3>
            <form onSubmit={this.handleSubmit}>
            <div>
                <div>
                <TextField
                    name="name"
                    type="text"
                    id="new-tennis-lesson-name"
                    label="name"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_tennis_lesson.name}
                />
                </div>
                <div>
                <TextField
                    name="time"
                    type="datetime-local"
                    id="new-tennis-lesson-time"
                    helperText="Please select a time."
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_tennis_lesson.time}
                />
                </div>
                <div className="dropdown">
                <FormControl variant="outlined">
                    <InputLabel id="new-tennis-lesson-pro-label">
                        pro
                    </InputLabel>
                <Select
                    name="pro"
                    id="new-tennis-lesson-pro"
                    onChange={this.handleInputChange}
                    value={this.state.new_tennis_lesson.pro}
                    >
                        <MenuItem value="Peter">Peter</MenuItem>
                        <MenuItem value="Kathy">Kathy</MenuItem>
                        <MenuItem value="John">John</MenuItem>
                        <MenuItem value="Kim">Kim</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <Button size="large" type="submit" color="primary">
                Schedule Tennis Lesson
                </Button>
            </div>
            </form>
        </div>
        );
    }
}
