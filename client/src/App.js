import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import GolfCourseList from './components/GolfCourseList'
import TennisComplexList from './components/TennisComplexList'
import './App.css'

class App extends Component {
  render() {
    let HomePageComponent = () => {
      return (
        <div> 
          <GolfCourseList />
          <TennisComplexList />
        </div>
      )
    }


    return (
      <Router>
        <div className='App'>
          <div>
            <h1>Reynolds Lake Oconee Golf and Tennis Scheduler</h1>
            <div>
              <div><Link to='/'>Home</Link></div>
            </div>
          </div>
          <Switch>
            <Route exact path='/' component={HomePageComponent}/>
            {/* <Route path='/golfcourses/:id' component={GolfCourse} /> */}
          </Switch>
        </div>

      </Router>
    )
  }
}


export default App;
