import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  Button,
  Label,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  BreadcrumbItem,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

import { Link } from "react-router-dom";

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
// now we need campsite to get the id of the current campsite and we need addComment to pass down to our form on line 48
function RenderComments({ comments, campsite }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="mb-1">
              {comment.text}
              <figcaption className="figure-caption">
                --{comment.author}{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}{" "}
              </figcaption>
            </div>
          );
        })}
        <CommentForm />
      </div>
    );
  } else return <div />;
}

class CommentForm extends React.Component {
  state = {
    isModalOpen: false,
    rating: 0,
    text: "",
    author: "",
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleSubmit = (values) => {
    let { rating, author, text } = values;
    console.log(`Current State is: ${JSON.stringify(values)}`);
    alert(`Current State is: ${JSON.stringify(values)}`);
    this.toggleModal();
  };

  renderReduxForm = () => {
    return (
      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
        <Label htmlFor="rating">Rating</Label>
        <Row className="form-group">
          <Col>
            <Control.select
              model=".rating"
              id="rating"
              name="rating"
              placeholder="rating"
              className="form-control"
            >
              <option value="">Choose rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Control.select>
          </Col>
        </Row>
        <Label htmlFor="author">Author</Label>
        <Row className="form-group">
          <Col>
            <Control.text
              model=".author"
              id="author"
              name="author"
              placeholder="author"
              className="form-control"
            />
          </Col>
        </Row>
        <Label htmlFor="text">Text</Label>
        <Row className="form-group">
          <Col>
            <Control.textarea
              model=".text"
              id="text"
              name="text"
              rows="6"
              className="form-control"
            />
          </Col>
        </Row>
        <Button type="submit" value="submit" color="primary">
          Login
        </Button>
      </LocalForm>
    );
  };

  render() {
    return (
      <>
        <Button outline className="fa fa-lg" onClick={this.toggleModal}>
          <i className="fa fa-pencil" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>{this.renderReduxForm()}</ModalBody>
        </Modal>
      </>
    );
  }
}

//I destructure addComment as well from props. In render comments im passing down campsite and addComment to be used by function
function CampsiteInfo({ campsite, comments }) {
  if (campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                {" "}
                <Link to="/directory">Directory</Link>{" "}
              </BreadcrumbItem>
              <BreadcrumbItem active>{campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={campsite} />
          <RenderComments campsite={campsite} comments={comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default CampsiteInfo;
