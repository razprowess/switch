import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($user: LoginInput) {
    loginUser(user: $user) {
      email
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($userInput: RegisterUserInput) {
    registerUser(user: $userInput) {
      profession
      token
    }
  }
`;

export const GET_MENTOR_LIST = gql`
  query mentorList($speciality: String) {
    getMentors(speciality: $speciality) {
      info
      id
      account {
        firstname
        lastname
        id
        username
        imgurl
      }
      followers {
        status
      }
    }
  }
`;

export const REGISTER_FOLLOWER = gql`
  mutation RegisterFollower($mentorid: ID) {
    createFollower(mentorId: $mentorid) {
      status
      mentor_id
    }
  }
`;

export const REMOVE_FOLLOWER = gql`
  mutation RemoveFollower($mentorid: ID) {
    removeFollower(mentorId: $mentorid)
  }
`;

export const GET_PROFILE_DETAIL = gql`
  query GetProfileDetail($username: String) {
    getProfileInfo(username: $username) {
      firstname
      lastname
      username
      imgurl
      bio
      mentor {
        info
        speciality
        experienceinyears
      }
    }
  }
`;

export const GET_MENTOR_FOLLOWERS = gql`
  query GetMentorFollowers($username: String) {
    getFollowers(username: $username) {
      status
    }
  }
`;

export const GET_USER_FOLLOWING = gql`
  query GetFollwingData($username: String) {
    getFollowings(username: $username) {
      status
    }
  }
`;

export const REGISTER_FOLLOWER_BY_USERNAME = gql`
  mutation RegisterFollower($username: String) {
    createFollowerByUsername(username: $username) {
      status
      mentor_id
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile($user: UpdateProfileInput) {
    updateProfile(user: $user)
  }
`;
