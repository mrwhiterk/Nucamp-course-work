import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from "../shared/comments";
import { PARTNERS } from "../shared/partners";
import { PROMOTIONS } from "../shared/promotions";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  state = {
    campsites: CAMPSITES,
    promotions: PROMOTIONS,
    partners: PARTNERS,
    comments: COMMENTS,
  };

  //This function will add a campsite and be passed all the way to addCommentForm component
  //Note: this function needs to be a arrow function so we can inherit "this" from parent, so we can reach props. 
  //Normally "this" would be the addCommentForm that's actually calling this function.
  addComment = (commentData) => {
    let newComment = {
      //id will be 1 plus the last item index which only works cause index and ids match in our data.
      id: this.state.comments.length,
      campsiteId: commentData.campsiteId,
      rating: 0,
      text: commentData.text,
      author: commentData.author,
      date: new Date(),
    };
    // comments now equal the result of adding newComment to state comments (concat doesn't mutate this.state). Return a new copy and replaces
    this.setState({ comments: this.state.comments.concat(newComment) });
  };

  render() {
    const HomePage = () => {
      return (
        <Home
          campsite={
            this.state.campsites.filter((campsite) => campsite.featured)[0]
          }
          promotion={
            this.state.promotions.filter((promotion) => promotion.featured)[0]
          }
          partner={this.state.partners.filter((partner) => partner.featured)[0]}
        />
      );
    };

    //inject addComment function as prop
    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfo
          addComment={this.addComment}
          campsite={
            this.state.campsites.filter(
              (campsite) => campsite.id === +match.params.campsiteId
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.campsiteId === +match.params.campsiteId
          )}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/directory"
            render={() => <Directory campsites={this.state.campsites} />}
          />
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />
          <Route
            exact
            path="/aboutus"
            render={() => <About partners={this.state.partners} />}
          />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default Main;
