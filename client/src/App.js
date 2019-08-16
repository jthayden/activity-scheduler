import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import GolfCourseList from './components/GolfCourseList'
import TennisComplexList from './components/TennisComplexList'
import GolfCourse from './components/GolfCourse'
import CreateGolfCourse from './components/CreateGolfCourse'
import CreateTeeTime from './components/CreateTeeTime'
import TeeTimeBooking from './components/TeeTimeBooking'
import CreateGolfLesson from './components/CreateGolfLesson'
import GolfLessonBooking from './components/GolfLessonBooking'
import CreateTennisComplex from './components/CreateTennisComplex'
import TennisComplex from './components/TennisComplex'
import CreateCourtBooking from './components/CreateCourtBooking'
import CourtBooking from './components/CourtBooking'
import './App.css'

class App extends Component {
  render() {
    let HomePageComponent = () => {
      return (
        <div> 
          <h2>Golf Courses</h2>
          <GolfCourseList />
          <h2>Tennis Complexes</h2>
          <TennisComplexList />
        </div>
      )
    }


    return (
      <Router>
        <div className='navbar'>
          <Link className='navbar-link' to=''>Golf</Link>
          <Link className='navbar-link' to=''>Tennis</Link>  
          <Link className='navbar-link' to=''>Login</Link>
        </div>
        <div className='App'>
          <div>
            <h1>Reynolds Lake Oconee Golf and Tennis Scheduler</h1>
            <div>
              <div><Link to='/'>Home</Link></div>
            </div>
          </div>
          <Switch>
            <Route exact path='/' render={HomePageComponent}/>
            <Route exact path='/golfcourses/create' component={CreateGolfCourse} />
            <Route exact path='/golfcourses/:id/teetimes/new' component={CreateTeeTime} />
            <Route exact path='/golfcourses/:id' component={GolfCourse} />
            <Route exact path='/teetimes/:id' component={TeeTimeBooking} />
            <Route exact path='/golfcourses/:id/golflessons/new' component={CreateGolfLesson} />
            <Route exact path='/golflessons/:id' component={GolfLessonBooking} />
            <Route exact path='/tenniscomplexes/create' component={CreateTennisComplex} />
            <Route exact path='/tenniscomplexes/:id' component={TennisComplex} />
            <Route exact path='/tenniscomplexes/:id/courtbookings/new' component={CreateCourtBooking} />
            <Route exact path='/courtbookings/:id' component={CourtBooking}/>
          </Switch>
        </div>

      </Router>
    )
  }
}


export default App;
