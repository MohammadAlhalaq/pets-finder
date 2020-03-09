import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";

import { navigate } from "@reach/router";

class Details extends React.Component {
  state = {
    loading: true,
    theme: "",
    counter: 0,
    colors: ["red", "green", "blue", "yellow"],
    showModal: false
  };
  adopt = () => navigate(this.state.url);
  toggleModal = () => this.setState(prev => ({ showModal: !prev.showModal }));
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
          <ThemeContext.Consumer>
            {([theme, setTheme]) => {
              return (
                <button
                  style={{ backgroundColor: theme }}
                  onClick={() => this.toggleModal(setTheme, theme)}
                >
                  Adopt {name}
                </button>
              );
            }}
          </ThemeContext.Consumer>
          {this.state.showModal ? (
            <ThemeContext.Consumer>
              {([theme, setTheme]) => (
                <Modal>
                  <h1>would you like to adopt ${name}</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>yes</button>
                    <button onClick={() => this.toggleModal(setTheme, theme)}>
                      no
                    </button>
                  </div>
                </Modal>
              )}
            </ThemeContext.Consumer>
          ) : null}
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
