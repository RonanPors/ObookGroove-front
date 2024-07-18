import {
  ApolloClient,
  createHttpLink,
  concat,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client';

// création de la base url pour les requêtes graphql
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
  credentials: 'include',
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
