import { useQuery } from "@urql/preact";
import gql from "graphql-tag";
import styles from "./SearchCountry.module.css";

const COUNTRY_QUERY = gql`
  query CountryQuery($id: ID!) {
    country(id: $id) {
      name
    }
  }
`;

export default ({ countryId }) => {
  let [result] = useQuery({
    query: COUNTRY_QUERY,
    variables: { id: countryId },
  });

  const { data, fetching, error } = result;

  if (fetching) return <h1>Fetching</h1>;
  if (error) return <h1>Error</h1>;

  let {
    country: { name },
  } = data;

  return (
    <main class="container">
      <h1 class={styles.title}>{name}</h1>
    </main>
  );
};
