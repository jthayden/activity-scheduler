import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export default class GolfCourseList extends Component {
    state = {
        golf_courses: [],
        
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
                <Link to={`/golfcourses/${golf_course.id}`}>
                <div id={golf_course.name}>
                    <img src={golf_course.photo_url} alt={golf_course.name} />
                    <h2>{golf_course.name}</h2>
                    <p>{golf_course.description}</p>
                </div>
                </Link>
            )
        })
        return (
            <div>
                <Button href="#The Preserve" className=''>The Preserve</Button>
                <Button href="#The Oconee" className=''>The Oconee</Button>
                <Button href="#Great Waters" className=''>Great Waters</Button>
                <Button href="#The National" className=''>The National</Button>
                <Button href="#Creek Club" className=''> Creek Club</Button>
                <Button href="#The Landing" className=''>The Landing</Button>

                {golfCourseList}
                <Link to={'/golfcourses/create'}>Add Golf Course</Link>
            </div>
        )
    }
}
