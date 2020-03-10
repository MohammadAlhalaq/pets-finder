import React from "react";
import { connect } from "react-redux";

import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import { navigate } from "@reach/router";
class Details extends React.Component {
  state = {
    loading: true,
    counter: 0,
    colors: ["red", "green", "blue", "yellow"],
    showModal: false
  };
  adopt = () => navigate(this.state.url);
  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };
  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
        url: animal.url
      });
    });
  }
  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }
    const { animal, breed, location, description, name, media } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button
            style={{ backgroundColor: this.props.theme }}
            onClick={() => this.toggleModal()}
          >
            Adopt {name}
          </button>

          {this.state.showModal ? (
            <Modal>
              <h1>would you like to adopt ${name}</h1>
              <div className="buttons">
                <button onClick={this.adopt}>yes</button>
                <button onClick={() => this.toggleModal()}>no</button>
              </div>
            </Modal>
          ) : null}
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const WrapperComponent = connect(({ theme }) => ({
  theme
}))(Details);
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <WrapperComponent {...props} />
    </ErrorBoundary>
  );
}
