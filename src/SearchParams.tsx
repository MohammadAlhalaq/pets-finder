import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent
} from "react";
import { RouteComponentProps } from "@reach/router";
import Pet, { ANIMALS, Animal } from "@frontendmasters/pet";
import useDropdown from "./DropDown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const Search: FunctionComponent<RouteComponentProps> = () => {
  const [location, setLocation] = useState("");
  const [Animal, animal] = useDropdown("animal", "dog", ANIMALS);
  const [breeds, setBreeds] = useState([] as string[]);
  const [Pets, setPets] = useState([] as Animal[]);

  const [theme, setTheme] = useContext(ThemeContext);

  const [Breed, breed, setBreed] = useDropdown("Breed", "", breeds);
  async function requestPets() {
    const { animals } = await Pet.animals({
      location,
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
            value={location}
            onChange={({ target: { value } }) => setLocation(value)}
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
                setTheme(value);
              }}
              onBlur={({ target: { value } }) => {
                setTheme(value);
              }}
              value={theme}
            >
              <option value="red">Red</option>
              <option value="green">green</option>
              <option value="blue">blue</option>
              <option value="yellow">yellow</option>
            </select>
          </label>
        </label>
        <button style={{ backgroundColor: theme }} type="submit">
          Submit
        </button>
      </form>
      <Results pets={Pets} />
    </div>
  );
};
export default Search;
