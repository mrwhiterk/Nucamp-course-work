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
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { Link } from "react-router-dom";

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
// now we need campsite to get the id of the current campsite and we need postComment to pass down to our form on line 48
function RenderComments({ comments, postComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          console.log(comment.date);
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
        <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  } else return <div />;
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(+val);

class CommentForm extends React.Component {
  state = {
    isModalOpen: false,
    rating: 0,
    text: "",
    author: "",
    touched: {
      author: false,
    },
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleSubmit = (values) => {
    this.toggleModal();
    this.props.postComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
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
              validators={{
                required,
                minLength: minLength(2),
                maxLength: maxLength(15),
              }}
            />
            <Errors
              className="text-danger"
              model=".author"
              show="touched"
              component="div"
              messages={{
                required: "Required",
                minLength: "Must be at least 2 characters",
                maxLength: "Must be 15 characters or less",
              }}
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
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg" />
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

//I destructure postComment as well from props. In render comments im passing down campsite and postComment to be used by function
function CampsiteInfo({
  campsite,
  comments,
  postComment,
  campsitesLoading,
  campsitesErrMess,
}) {
  if (campsitesLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (campsitesErrMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{campsitesErrMess}</h4>
          </div>
        </div>
      </div>
    );
  }

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
          <RenderComments
            postComment={postComment}
            comments={comments}
            campsiteId={campsite.id}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default CampsiteInfo;
