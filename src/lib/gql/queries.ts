import {
  ApolloClient,
  createHttpLink,
  gql,
  concat,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client';

// création de la base url pour les requêtes graphql
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
});

// instance de classe qui va effectuer une action avant la requête
const authLink = new ApolloLink((operation, forward) => forward(operation));

// le client qui va effectuer ces actions avant chaque requête
export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});

// fragment pour une partie de la requête INFO USER
const userDetailsFragment = gql`
  fragment UserDetails on User {
    id
    pseudo
  }
`;
// la requête
export const userByIdQuery = gql`
  query UserById($id: Int!) {
    user(id: $id) {
      ...UserDetails
    }
  }
  # la requête attend des arguments :
  ${userDetailsFragment}
`;

// fragment pour une partie de la requête CURRENT BOOK
const userCurrentBooksFragment = gql`
  fragment UserCurrentBooks on User {
    id
    pseudo
    currentBooks(limit: $limit) {
      id
      isbn
      numberOfPages
      resume
      title
      year
      genre
      cover
      author
    }
  }
`;

// la requête
export const userCurrentBooksQuery = gql`
  query User($id: Int!, $limit: Int) {
    user(id: $id) {
      ...UserCurrentBooks
    }
  }
  # la requête attend des arguments :
  ${userCurrentBooksFragment}
`;
