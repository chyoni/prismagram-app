import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../../sharedQueries";

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
      id
      username
      avatar
      isSelf
      isFollowing
      bio
      posts {
        id
        files {
          url
        }
      }
      following {
        id
        username
        isSelf
        isFollowing
        avatar
        bio
      }
      followers {
        id
        username
        isSelf
        isFollowing
        avatar
        bio
      }
    }
  }
`;
