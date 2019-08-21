import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

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
                <div>
                
                <ButtonBase focusRipple key={golf_course.name} className='image' id={golf_course.name}>
                    {/* <span className='imageSrc'/> */}
                    <img src={golf_course.photo_url} alt={golf_course.name}/>
                    {/* <span className='imageBackdrop'/> */}
                    <span className='imageButton'>
                    <Link to={`/golfcourses/${golf_course.id}`}>
                        <Typography
                            component='span'
                            // variant='subtitle1'
                            // color='white'
                            className='imageTitle'
                            >{golf_course.name}
                            {/* <span className='imageMarked' /> */}
                            </Typography>
                            </Link>
                            </span>
                </ButtonBase>
                <p>{golf_course.description}</p>
                
                <hr />
                </div>
            )
        })
        return (
            <div className='golf-course-list'>
                <Button href="#The Preserve" className='course-link'>The Preserve</Button>
                <Button href="#The Oconee" className='course-link'>The Oconee</Button>
                <Button href="#Great Waters" className='course-link'>Great Waters</Button>
                <Button href="#The National" className='course-link'>The National</Button>
                <Button href="#The Creek Club" className='course-link'> The Creek Club</Button>
                <Button href="#The Landing" className='course-link'>The Landing</Button>

                {golfCourseList}
                <Link to={'/golfcourses/create'}>Add Golf Course</Link>
            </div>
        )
    }
}
