import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class CreateTennisLesson extends Component {
    state = {
        new_tennis_lesson: {
            name:'',
            time:'',
            pro:'',
            tennis_complex: this.props.match.params.id
        },
        redirectToHome: false
    }

    handleInputChange = (evt) => {
        let copiedTennisLesson = {...this.state.new_tennis_lesson}
        copiedTennisLesson[evt.target.name] = evt.target.value
        this.setState({ new_tennis_lesson: copiedTennisLesson})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/v1/tennislessons/', this.state.new_tennis_lesson).then(() => {
            this.setState({
                redirectToHome:true
            })
        })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h2>Schedule Tennis Lesson</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="new-tennis-lesson-name">Name</label>
                        <input 
                            type="text"
                            name='name'
                            id='new-tennis-lesson-name'
                            onChange={this.handleInputChange}
                            value={this.state.new_tennis_lesson.name}
                        />
                        <label htmlFor="new-tennis-lesson-time">Time</label>
                        <input 
                            type="text"
                            name='time'
                            id='new-tennis-lesson-time'
                            onChange={this.handleInputChange}
                            value={this.state.new_tennis_lesson.time}
                        />
                        <label htmlFor="new-tennis-lesson-pro">Pro</label>
                        <input 
                            type="text"
                            name='pro'
                            id='new-tennis-lesson-pro'
                            onChange={this.handleInputChange}
                            value={this.state.new_tennis_lesson.pro}
                        />
                        <input 
                            type="submit"
                            value='Schedule Tennis Lesson'
                        />
                    </div>
                </form>
            </div>
        )
    }
}
