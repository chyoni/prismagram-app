import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../../sharedQueries";

export const FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const ME = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($text: String!, $postId: String!) {
    addComment(text: $text, postId: $postId) {
      text
    }
  }
`;
