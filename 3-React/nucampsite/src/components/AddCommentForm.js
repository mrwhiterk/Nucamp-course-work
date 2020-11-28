import React, { Component } from "react";

export default class AddCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", author: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let payload = {
      text: this.state.text,
      author: this.state.author,
      campsiteId: this.props.campsite.id,
    };
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
