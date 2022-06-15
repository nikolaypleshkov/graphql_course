/* eslint-disable import/no-anonymous-default-export */
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

export default async (req: any, res: any) => {
  const page: number = parseInt(req.body);
  try {
    const { data } = await client.query({
      query: gql`
        query {
          characters(page: ${page}) {
            info {
              count
              pages
            }
            results {
              name
              id
              location {
                id
                name
              }
              origin {
                id
                name
              }
              episode {
                id
                episode
                air_date
              }
              image
            }
          }
        }
      `,
    });
    res.status(200).json({ characters: data.characters.results, error: null });
    
  } catch (err: any) {
    if (err.message === "404 Not Found") {
      res.status(400).json({ characters: null, error: "No character found" });
    } else {
      res
        .status(500)
        .json({ characters: null, error: "Internal Error, please try again." });
    }
  }
};
