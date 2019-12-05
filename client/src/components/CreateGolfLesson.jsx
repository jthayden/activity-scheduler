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

export default class CreateGolfLesson extends Component {
    state = {
        new_golf_lesson: {
        name: "",
        time: "",
        pro: "",
        course: this.props.match.params.id
        },
        redirectToHome: false
    };

    handleInputChange = evt => {
        let copiedGolfLesson = { ...this.state.new_golf_lesson };
        copiedGolfLesson[evt.target.name] = evt.target.value;
        this.setState({ new_golf_lesson: copiedGolfLesson });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        axios.post("/api/v1/golflessons/", this.state.new_golf_lesson).then(() => {
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
            <h3>Schedule Golf Lesson</h3>
            <form onSubmit={this.handleSubmit}>
            <div>
                <div>
                <TextField
                    name="name"
                    type="text"
                    id="new-golf-lesson-name"
                    label="name"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_golf_lesson.name}
                />
                </div>
                <div>
                <TextField
                    name="time"
                    id="new-golf-lesson-time"
                    type="datetime-local"
                    helperText="Please select a time."
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    value={this.state.new_golf_lesson.time}
                />
                </div>
                <div className="dropdown">
                <FormControl variant="outlined">
                    <InputLabel id="new-golf-lesson-pro-label">
                        pro
                    </InputLabel>
                <Select
                    name="pro"
                    id="new-golf-lesson-pro"
                    onChange={this.handleInputChange}
                    value={this.state.new_golf_lesson.pro}
                    >
                        <MenuItem value="Paul">Paul</MenuItem>
                        <MenuItem value="Joe">Joe</MenuItem>
                        <MenuItem value="Roger">Roger</MenuItem>
                        <MenuItem value="Samantha">Samantha</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <Button size="large" type="submit" color="primary">
                Schedule Golf Lesson
                </Button>
            </div>
            </form>
        </div>
        );
    }
}
