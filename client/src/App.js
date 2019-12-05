import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import GolfCourseList from "./components/GolfCourseList";
import TennisComplexList from "./components/TennisComplexList";
import GolfCourse from "./components/GolfCourse";
import CreateGolfCourse from "./components/CreateGolfCourse";
import CreateTeeTime from "./components/CreateTeeTime";
import TeeTimeBooking from "./components/TeeTimeBooking";
import CreateGolfLesson from "./components/CreateGolfLesson";
import GolfLessonBooking from "./components/GolfLessonBooking";
import CreateTennisComplex from "./components/CreateTennisComplex";
import TennisComplex from "./components/TennisComplex";
import CreateCourtBooking from "./components/CreateCourtBooking";
import CourtBooking from "./components/CourtBooking";
import TennisLessonBooking from "./components/TennisLessonBooking";
import CreateTennisLesson from "./components/CreateTennisLesson";
import Navbar from "./components/Navbar";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";


class App extends Component {
  render() {
    let HomePageComponent = () => {
      return (
        <div>
          <h2 className="anchor">
            <a id="anchor-golf-courses">GOLF COURSES</a>
          </h2>
          <GolfCourseList />
          <h2 className="anchor">
            <a id="anchor-tennis-complexes">TENNIS CENTERS</a>
          </h2>
          <TennisComplexList />
        </div>
      );
    };

    return (
      <Router>
        <div className="navbar">
          <Navbar />
        </div>
        <Container maxWidth="md">
          <Typography component="div" style={{ height: "100vh" }}>
            <div className="App">
              <div>
                <a id="anchor-hero-image" />
                <img
                  className="hero-image"
                  src="https://i.imgur.com/IOACCpWh.png"
                  alt="Reynolds"
                />
                <h1 id="main-heading">Golf & Tennis Scheduler</h1>
              </div>
              <Switch>
                <Route exact path="/" render={HomePageComponent} />
                <Route
                  exact
                  path="/golfcourses/create"
                  component={CreateGolfCourse}
                />
                <Route
                  exact
                  path="/golfcourses/:id/teetimes/new"
                  component={CreateTeeTime}
                />
                <Route exact path="/golfcourses/:id" component={GolfCourse} />
                <Route exact path="/teetimes/:id" component={TeeTimeBooking} />
                <Route
                  exact
                  path="/golfcourses/:id/golflessons/new"
                  component={CreateGolfLesson}
                />
                <Route
                  exact
                  path="/golflessons/:id"
                  component={GolfLessonBooking}
                />
                <Route
                  exact
                  path="/tenniscomplexes/create"
                  component={CreateTennisComplex}
                />
                <Route
                  exact
                  path="/tenniscomplexes/:id"
                  component={TennisComplex}
                />
                <Route
                  exact
                  path="/tenniscomplexes/:id/courtbookings/new"
                  component={CreateCourtBooking}
                />
                <Route
                  exact
                  path="/courtbookings/:id"
                  component={CourtBooking}
                />
                <Route
                  exact
                  path="/tennislessons/:id"
                  component={TennisLessonBooking}
                />
                <Route
                  exact
                  path="/tenniscomplexes/:id/tennislessons/new"
                  component={CreateTennisLesson}
                />
                <Route exact path="/navbar/" component={Navbar} />
              </Switch>
            </div>
          </Typography>
        </Container>
      </Router>
    );
  }
}

export default App;
