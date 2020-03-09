import React from "react";
import { Photo } from "@frontendmasters/pet";

interface IProps {
  media: Photo[];
}
interface IState {
  active: number;
  photos: string[];
}

class Carousel extends React.Component<IProps, IState> {
  state = {
    photos: [],
    active: 0
  };
  public static getDerivedStateFromProps({ media }: IProps) {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos };
  }
  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.dataset.index) {
      this.setState({ active: +event.target.dataset.index });
    }
  };
  public render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <div className="carousel">
          <img src={photos[active]} alt="animal" />
          <div className="carousel-smaller">
            {photos.map((photo, index) => {
              return (
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
