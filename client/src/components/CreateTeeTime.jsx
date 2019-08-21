import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                <Link to={`/golfcourses/${this.props.match.params.id}/`}><IconButton aria-label='back' ><FontAwesomeIcon icon={faChevronLeft} /></IconButton></Link>
                <h3>Book Tee Time</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                        {/* <label htmlFor='new-tee-time-name'>Name</label> */}
                        <TextField
                            name='name'
                            type='text'
                            id='new-tee-time-name'
                            label='name'
                            margin='normal'
                            variant='outlined'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.name}
                        />
                        {/* <input 
                            type='text'
                            name='name'
                            id='new-tee-time-name'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.name}
                        /> */}
                        </div>
                        <div>
                        {/* <label htmlFor='new-tee-time-time'>Time</label> */}
                        <TextField
                            name='time'
                            type='text'
                            id='new-tee-time-time'
                            label='time'
                            margin='normal'
                            variant='outlined'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.time}
                        />
                        {/* <input 
                            type='text'
                            name='time'
                            id='new-tee-time-time'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.time}
                        /> */}
                        </div>
                        <div>
                        {/* <label htmlFor='new-tee-time-guests'>Guest(s)</label> */}
                        <TextField
                            name='guests'
                            type='text'
                            id='new-tee-time-guests'
                            label='guest(s)'
                            margin='normal'
                            variant='outlined'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.guests}
                        />
                        {/* <input 
                            type='text'
                            name='guests'
                            id='new-tee-time-guests'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.guests}
                        /> */}
                        </div>
                        <div>
                        {/* <label htmlFor='new-tee-time-carts'>Cart(s)</label> */}
                        <TextField
                            name='carts'
                            type='text'
                            id='new-tee-time-carts'
                            label='cart(s)'
                            margin='normal'
                            variant='outlined'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.carts}
                        />
                        {/* <input 
                            type='text'
                            name='carts'
                            id='new-tee-time-carts'
                            onChange={this.handleInputChange}
                            value={this.state.new_tee_time.carts}
                        /> */}
                        </div>
                        <Button color="primary"   size='large'  className=''type='submit'>Book Tee Time
                        </Button>
                        
                       
                    </div>
                </form>
            </div>
        )
    }
}
