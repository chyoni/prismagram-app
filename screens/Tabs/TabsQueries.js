import { gql } from "apollo-boost";
import { POST_FRAGMENT, USER_FRAGMENT } from "../../sharedQueries";

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const ME = gql`
  query me {
    me {
      username
    }
  }
`;

export const GET_PROFILE = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;
