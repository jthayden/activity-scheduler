import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../index.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class TennisComplex extends Component {
    state = {
        tennis_complex:{
            court_bookings:[],
            tennis_lesson_bookings:[]
        },
        redirectToHome: false,
        isNewCourtBookingFormDisplayed: false,
        newCourtBooking: {
            name:'',
            time:'',
            court_type:'',
            guests:'',
            tennis_complex: this.props.match.params.id
        },
        isNewTennisLessonBookingFormDisplayed: false,
        newTennisLessonBooking: {
            name:'',
            time:'',
            pro:'',
            tennis_complex: this.props.match.params.id
        }
    }

    componentDidMount() {
        axios.get(`/api/v1/tenniscomplexes/${this.props.match.params.id}/`).then(res => {
            this.setState({tennis_complex: res.data})
        })
    }

    render() {
        let courtBookingList = this.state.tennis_complex.court_bookings.map((court_booking) => {
            return (
                <div className='root'>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className='heading'>{court_booking.time}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        Member: {court_booking.name} 
                        <br/>
                        Guest(s): {court_booking.guests}
                        <br/>
                        Court Type: {court_booking.court_type}
                        <Link to={`/courtbookings/${court_booking.id}/`}><Button className='info-button' size="small"> Details</Button></Link>
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
                
                // <Link to={`/courtbookings/${court_booking.id}/`}>
                //     <p>{court_booking.name}{court_booking.time}{court_booking.pro}{court_booking.guests}{court_booking.court_type}{court_booking.tennis_complex}</p>
                // </Link>
            )
        })

        let tennisLessonBookingList = this.state.tennis_complex.tennis_lesson_bookings.map((tennis_lesson_booking) => {
            return (
                <div className='root'>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className='heading'>{tennis_lesson_booking.time}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        Member: {tennis_lesson_booking.name} 
                        <br/>
                        Pro: {tennis_lesson_booking.pro}
                        <Link to={`/tennislessons/${tennis_lesson_booking.id}/`}><Button className='info-button' size="small"> Details</Button></Link>
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>


                // <Link to={`/tennislessons/${tennis_lesson_booking.id}/`}>
                //     <p>{tennis_lesson_booking.name}{tennis_lesson_booking.time}{tennis_lesson_booking.pro}{tennis_lesson_booking.tennis_complex}</p>
                // </Link>
            )
        })

        return (
            <div>
                <div>
                    <img src={this.state.tennis_complex.photo_url} />
                    <h2>{this.state.tennis_complex.name}</h2>
                    <p>{this.state.tennis_complex.description}</p>

                    <h4>Reserved Courts</h4>
                    <Link to={`/tenniscomplexes/${this.props.match.params.id}/courtbookings/new`}>Reserve a Court</Link>
                    <div>{courtBookingList}</div>

                    <h4>Tennis Lessons</h4>
                    <Link to={`/tenniscomplexes/${this.props.match.params.id}/tennislessons/new`}>Schedule a Tennis Lesson</Link>
                    <div>{tennisLessonBookingList}</div>
                </div>
                
            </div>
        )
    }
}
