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

export const ME_ONLYNAME = gql`
  query me {
    me {
      username
    }
  }
`;

export const SEE_NOTIFICATION = gql`
  query seeNotification($username: String!) {
    seeNotification(username: $username) {
      id
      createdAt
      from {
        id
        avatar
        username
        isFollowing
      }
      to {
        id
        avatar
        username
      }
      type
      post {
        id
        files {
          id
          url
        }
      }
    }
  }
`;
