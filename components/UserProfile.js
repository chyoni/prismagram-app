import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const UserProfile = ({
  id,
  username,
  avatar,
  bio,
  isSelf,
  isFollowing,
  posts,
  following,
  followers
}) => {
  return null;
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  bio: PropTypes.string,
  isSelf: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  posts: PropTypes.array,
  following: PropTypes.array,
  followers: PropTypes.array
};

export default UserProfile;
