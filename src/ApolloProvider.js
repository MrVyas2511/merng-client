import React from 'react'
import App from './App'
 import {createHttpLink} from '@apollo/client'
 import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
   
  } from "@apollo/client";
import {setContext} from 'apollo-link-context'

  const httpLink = createHttpLink({
      uri : 'https://rocky-retreat-01477.herokuapp.com/'
  })
  
  const authLink = setContext(() => {
      const token = localStorage.getItem('jwtToken');
      return {
          headers: {
              Authorization:token?`Bearer ${token}`:""
          }
      }
  })
  const client = new ApolloClient({
      link:authLink.concat(httpLink),
      cache:new InMemoryCache()
  })


  export default(
      <ApolloProvider client={client}>
          <App/>
      </ApolloProvider>

  )