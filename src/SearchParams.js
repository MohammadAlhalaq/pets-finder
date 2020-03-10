import React, { useState, useEffect } from "react";
import Pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./DropDown";
import { connect } from "react-redux";
import changeLocation from "./actionCreator/changeLocation";
import changeTheme from "./actionCreator/changeTheme";

import Results from "./Results";

const Search = props => {
  const [Animal, animal] = useDropdown("animal", "dog", ANIMALS);
  const [breeds, setBreeds] = useState([]);
  const [Pets, setPets] = useState([]);

  const [Breed, breed, setBreed] = useDropdown("Breed", "", breeds);
  async function requestPets() {
    const { animals } = await Pet.animals({
      location: props.location,
      breed,
      type: animal
    });
    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    Pet.breeds(animal).then(({ breeds }) => {
      const breedsName = breeds.map(({ name }) => name);
      setBreeds(breedsName);
      // eslint-disable-next-line no-console
    }, console.error);
  }, [animal, setBreeds, setBreed]);
  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            value={props.location}
            onChange={({ target: { value } }) => props.setLocation(value)}
            placeholder="Location"
            id="location"
          />
          <Animal />
          <Breed />
          <label htmlFor="theme">
            Theme
            <select
              id="theme"
              name="theme"
              onChange={({ target: { value } }) => {
                props.setTheme(value);
              }}
              onBlur={({ target: { value } }) => {
                props.setTheme(value);
              }}
              value={props.theme}
            >
              <option value="red">Red</option>
              <option value="green">green</option>
              <option value="blue">blue</option>
              <option value="yellow">yellow</option>
            </select>
          </label>
        </label>
        <button style={{ backgroundColor: props.theme }} type="submit">
          Submit
        </button>
      </form>
      <Results pets={Pets} />
    </div>
  );
};
const mapStateToProps = ({ location, theme }) => ({ theme, location });
const mapDispatchToProps = dispatch => ({
  setLocation: location => {
    dispatch(changeLocation(location));
  },
  setTheme: theme => {
    dispatch(changeTheme(theme));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);
