import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid,Transition } from "semantic-ui-react";

import {AuthContext} from '../context/auth'
import PostCard from "../components/PostCard";
import PostForm from '../components/PostForm';
import { FETCH_POST_QUERY } from "../util/graphql";

export default function Home() {

  const {user} = useContext(AuthContext)
  const {loading, data } = useQuery(FETCH_POST_QUERY);

  if (loading) return "Loading...";

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm></PostForm>
          </Grid.Column>
        )}

        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
            <Transition.Group>
               {data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}


