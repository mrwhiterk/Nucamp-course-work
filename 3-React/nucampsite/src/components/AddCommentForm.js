import React, { Component } from "react";

export default class AddCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", author: "" };
  }

  //set whatever name of input as the key and value attribute as value. Note: we need the [] do interpreter knows to evaluate whole expression before setting key.
  handleChange = (e) => {
    console.log(this);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (event) => {
    //stop page from reloading
    event.preventDefault();

    let payload = {
      text: this.state.text,
      author: this.state.author,
      campsiteId: this.props.campsite.id,
    };
    //call the function passed from mainComponent
    this.props.addComment(payload);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Text:
          <input
            type="text"
            name="text"
            text={this.state.text}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
