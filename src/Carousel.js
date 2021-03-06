import React from "react";
class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos };
  }
  handleIndexClick = ({
    target: {
      dataset: { index }
    }
  }) => {
    this.setState({ active: +index });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <div className="carousel">
          <img src={photos[active]} alt="animal" />
          <div className="carousel-smaller">
            {photos.map((photo, index) => {
              return (
                //eslint-disable-next-line
                <img
                  src={photo}
                  alt="animal thumbnail"
                  data-index={index}
                  onClick={this.handleIndexClick}
                  className={index === active ? "active" : ""}
                  key={photo}
                />
              );
            })}
          </div>
          ;
        </div>
      </div>
    );
  }
}

export default Carousel;
