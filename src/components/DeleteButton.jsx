import React, { useState } from "react";

// GraphQL
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../util/graphql";

// Apollo client
import { useMutation } from "@apollo/client";

// Semantic ui
import { Button, Icon, Confirm } from "semantic-ui-react";
import MyPopup from "../util/MyPopup";

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        setConfirmOpen(false);
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        let newData = [...data.getPosts];
        newData = newData.filter((p) => p.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: {
              newData,
            },
          },
        });
      }

      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <MyPopup content={`Delete ${commentId ? "Comment" : "Post"}`}>
        <Button
          as="div"
          color="red"
          onClick={() => {
            setConfirmOpen(true);
          }}
          floated="right"
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
