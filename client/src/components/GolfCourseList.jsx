import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class GolfCourseList extends Component {
    state = {
        golf_courses: []
    }

    componentDidMount() {
        this.getAllGolfCourses()
    }

    getAllGolfCourses = () => {
        axios.get('/api/v1/golfcourses/')
        .then(res => {
            this.setState({ golf_courses: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let golfCourseList = this.state.golf_courses.map((golf_course) => {
            return (
                // <Link to={`/golfcourses/${golf_course.id}`}>
                <div>
                    <img src={golf_course.photo_url} alt={golf_course.name} width='250px' />
                    <h2>{golf_course.name}</h2>
                    <p>{golf_course.description}</p>
                </div>
                // </Link>
            )
        })
        return (
            <div>
                {golfCourseList}
            </div>
        )
    }
}
