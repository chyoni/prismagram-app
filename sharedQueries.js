import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    location
    caption
    user {
      id
      avatar
      username
    }
    files {
      id
      url
    }
    likeCount
    isLiked
    comments {
      id
      text
      createdAt
      user {
        id
        avatar
        username
      }
    }
    likes {
      id
      user {
        id
        avatar
        username
      }
    }
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    user {
      id
      avatar
      username
      bio
      isSelf
      isFollowing
      following {
        id
        isSelf
        username
        bio
        isFollowing
        avatar
      }
      followers {
        id
        isSelf
        username
        bio
        isFollowing
        avatar
      }
    }
    posts {
      id
      likeCount
      commentCount
      files {
        url
      }
    }
  }
`;
