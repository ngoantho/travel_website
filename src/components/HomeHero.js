import styles from "./HomeHero.module.css";
import Modal from "./Modal";
import SearchBox from "./SearchBox";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import { useQuery } from "@urql/preact";
import gql from "graphql-tag";

const PLACE_QUERY = gql`
  query PlaceQuery($id: ID!) {
    place(id: $id) {
      city
    }
  }
`;
const COUNTRY_QUERY = gql`
  query CountryQuery($id: ID!) {
    country(id: $id) {
      name
    }
  }
`;

const ParseInput = ({ onClick, countryId, placeId }) => {
  if (!countryId && !placeId) {
    return (
      <input
        type="text"
        placeholder="Search your destination"
        class={styles.search_box}
        onClick={onClick}
        readonly
      />
    );
  }

  let query;
  if (placeId) {
    query = useQuery({
      query: PLACE_QUERY,
      variables: { id: placeId },
    });
  } else if (countryId) {
    query = useQuery({
      query: COUNTRY_QUERY,
      variables: { id: countryId },
    });
  }

  const [result] = query;
  const { data, fetching, error } = result;

  if (fetching) return <p>Fetching</p>;
  if (error) return <p>Error</p>;

  let text = "";
  if (placeId) {
    text = data.place.city;
  } else if (countryId) {
    text = data.country.name;
  }

  return (
    <input
      type="text"
      value={text}
      onClick={onClick}
      class={styles.search_box}
      readonly
    />
  );
};

const MainInput = ({ popState }) => {
  const [open, setOpen] = useState(false);
  const [popInput, setPopupInput] = popState;

  useEffect(() => {
    if (Object.keys(popInput).length === 0) return;

    setOpen(false);
  }, [popInput]);

  let onClick = () => {
    setOpen(true);
  };

  let { placeId, countryId } = popInput;
  return (
    <>
      {<ParseInput placeId={placeId} countryId={countryId} onClick={onClick} />}
      {open ? (
        <Modal
          selector="#modal"
          style={{
            left: "25%",
            right: "25%",
            padding: 0,
          }}
          render={() => (
            <SearchBox
              onClose={() => setOpen(false)}
              onSelect={(args) => setPopupInput(args)}
            />
          )}
        />
      ) : null}
    </>
  );
};

export default ({ text }) => {
  const [popInput, setPopupInput] = useState({});
  let handleGoClick = () => {
    let { countryId, placeId } = popInput;

    route(`/s/${countryId ?? ""}/${placeId ?? ""}`, true);
  };

  return (
    <div class={styles.wrapper}>
      <div class={styles.bg}></div>
      <div class={[styles.overlay, "container"].join(" ")}>
        <div class={[styles.row_title, "row"].join(" ")}>
          <h1>{text}</h1>
        </div>
        <div class={[styles.row_search, "row"].join(" ")}>
          <div class="column">
            <MainInput popState={[popInput, setPopupInput]} />
          </div>
          <div class={["column", styles.fit_content]}>
            <input
              type="submit"
              value="Go"
              class="button-outline"
              onClick={handleGoClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
