import React, { useContext } from "react";

// Apollo client
import { useQuery } from "@apollo/client";

// GraphQL
import { FETCH_POSTS_QUERY } from "../util/graphql";

// Semantic ui
import { Grid, Transition } from "semantic-ui-react";

// Components
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

// Context
import { AuthContext } from "../context/auth";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  let posts = null;
  const { userData } = useContext(AuthContext);

  if (data) posts = data.getPosts;

  return (
    <Grid columns={2}>
      <Grid.Row className="page-title">
        <h1>Recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {userData && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
