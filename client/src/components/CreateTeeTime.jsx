import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

export default class CreateTeeTime extends Component {
    state = {
        new_tee_time: {
            name:'',
            time:'',
            guests:'',
            carts:'',
            course:this.props.match.params.id
        },
        redirectToHome: false
    }

    handleInputChange = (evt) => {
        let copiedTeeTime = {...this.state.new_tee_time}
        copiedTeeTime[evt.target.name] = evt.target.value
        this.setState({ new_tee_time: copiedTeeTime})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/v1/teetimes/', this.state.new_tee_time)
            .then(() => {
                this.setState({
                    redirectToHome: true
                })
            })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to={`/golfcourses/${this.props.match.params.id}/`} />
        }
        return (
            <div>
                <h2>Book Tee Time</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                        <label htmlFor='new-tee-time-name'>Name</label>
                        <input 
                            type='text'
                            name='name'
                            id='new-tee-time-name'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.name}
                        />
                        </div>
                        <div>
                        <label htmlFor='new-tee-time-time'>Time</label>
                        <input 
                            type='text'
                            name='time'
                            id='new-tee-time-time'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.time}
                        />
                        </div>
                        <div>
                        <label htmlFor='new-tee-time-guests'>Guest(s)</label>
                        <input 
                            type='text'
                            name='guests'
                            id='new-tee-time-guests'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.guests}
                        />
                        </div>
                        <div>
                        <label htmlFor='new-tee-time-carts'>Cart(s)</label>
                        <input 
                            type='text'
                            name='carts'
                            id='new-tee-time-carts'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.carts}
                        />
                        </div>
                        <input 
                            type='submit'
                            value='Book Tee Time'
                        />
                    </div>
                </form>
            </div>
        )
    }
}
