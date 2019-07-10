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
