import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import React from 'react'

const Character = ({character}: any) => {
    const router = useRouter();
    const { id } = router.query;
  return (
    <div>Id of character: {character.id}</div>
  )
}


export async function getStaticPaths() {
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql/",
        cache: new InMemoryCache(),
      });
    
      const { data } = await client.query({
        query: gql`
       query {
          characters{
            results {
              id
            }
          }
        }`,
      });
      const paths = data.characters.results.map((character: any) => ({
          
          params: { id: character.id.toString() }
      }));

      console.log(paths);
      

      return{
          paths,
          fallback: true
      }
}

export async function getStaticProps({params}: any) {
    const client = new ApolloClient({
      uri: "https://rickandmortyapi.com/graphql/",
      cache: new InMemoryCache(),
    });
  
    const { data } = await client.query({
      query: gql`
        query {
          characters(id: ${parseInt(params.id)}) {
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
  
    return {
      props: {
        character: data.characters.results,
      },
    };
  }

export default Character