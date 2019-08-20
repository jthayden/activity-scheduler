import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class CreateGolfLesson extends Component {
    state = {
        new_golf_lesson: {
            name:'',
            time:'',
            pro:'',
            course: this.props.match.params.id
        },
        redirectToHome: false
    }

    handleInputChange = (evt) => {
        let copiedGolfLesson = {...this.state.new_golf_lesson}
        copiedGolfLesson[evt.target.name] = evt.target.value
        this.setState({ new_golf_lesson: copiedGolfLesson})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/v1/golflessons/', this.state.new_golf_lesson).then(() => {
            this.setState({
                redirectToHome:true
            })
        })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to={`/golfcourses/${this.props.match.params.id}/`} />
        }

        return (
            <div>
                <h2>Schedule Golf Lesson</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                        <label htmlFor='new-golf-lesson-name'>Name</label>
                        <input 
                            type='text'
                            name='name'
                            id='new-golf-lesson-name'
                            onChange={this.handleInputChange}
                            value={this.state.new_golf_lesson.name.name}
                        />
                        </div>
                        <div>
                        <label htmlFor='new-golf-lesson-time'>Time</label>
                        <input 
                            type='text'
                            name='time'
                            id='new-golf-lesson-time'
                            onChange={this.handleInputChange}
                            value={this.state.new_golf_lesson.time}
                        />
                        </div>
                        <div>
                        <label htmlFor='new-golf-lesson-pro'>Pro</label>
                        <input 
                            type='text'
                            name='pro'
                            id='new-golf-lesson-pro'
                            onChange={this.handleInputChange}
                            value={this.state.new_golf_lesson.pro}
                        />
                        </div>
                        <input 
                            type='submit'
                            value='Schedule Golf Lesson'
                        />
                    </div>
                </form>
            </div>
        )
    }
}
