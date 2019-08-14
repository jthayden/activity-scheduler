import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class CreateTeeTime extends Component {
    state = {
        new_tee_time: {
            name:'',
            time:'',
            guests:'',
            carts:'',
            course: this.props.location.state,
        },
        redirectToHome: false
    }

    

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
