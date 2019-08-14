import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class CreateGolfCourse extends Component {
    state = {
        new_golf_course: {},
        redirectToHome: false
    }

    componentDidMount() {
        this.getAllGolfCourses()
    }

    getAllGolfCourses = () => {
        axios.get('/api/v1/golfcourses/').then(res => {
            this.setState({golf_courses: res.data})
        })
    }

    handleInputChange = (evt) => {
        let copiedGolfCourse = {...this.state.new_golf_course}
        copiedGolfCourse[evt.target.name] = evt.target.value
        this.setState({ new_golf_course: copiedGolfCourse})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/v1/golfcourses/', this.state.new_golf_course).then(() => {
            this.setState({ redirectToHome: true })
            this.getAllGolfCourses()
        })
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='new-golf-course-name'>Golf Course Name</label>
                    <input
                        type='text'
                        name='name'
                        id='new-golf-course-name'
                        onChange={this.handleInputChange}
                        value={this.state.new_golf_course.name}
                    />
                    <label htmlFor='new-golf-course-description'>Golf Course Description</label>
                    <input 
                        type='text'
                        name='description'
                        id='new-golf-course-description'
                        onChange={this.handleInputChange}
                        value={this.state.new_golf_course.description}
                    />
                    <label htmlFor='new-golf-course-photo-url'>Golf Course Photo</label>
                    <input 
                        type='text'
                        name='photo_url'
                        id='new-golf-course-photo-url'
                        onChange={this.handleInputChange}
                        value={this.state.new_golf_course.photo_url}
                    />
                    <input 
                        type='submit'
                        value='Add New Golf Course'
                    />
                </form>
            </div>
        )
    }
}
