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
      linkedin
      twitter
      profession
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
      menteeid
      account {
        firstname
        lastname
        username
        id
      }
    }
  }
`;

export const GET_USER_FOLLOWING = gql`
  query GetFollwingData($username: String) {
    getFollowings(username: $username) {
      status
      mentorAccount {
        firstname
        lastname
        username
        imgurl
        id
      }
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

export const UPDATE_FOLLOWER = gql`
  mutation UpdateFollower($menteeid: ID) {
    updateFollower(menteeId: $menteeid)
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($recieverid: ID) {
    createChat(recieverid: $recieverid){
      senderUserId
      recieverUserId
      chatId
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($message: String, $chatId: ID) {
    createMessage(message: $message, chatId: $chatId)
  }
`;

export const GET_CHAT = gql`
  query GetChat {
    getChat {
      chatId
      recieverAccount {
        firstname
        lastname
        username
      }
      conversation{
      content
      createdAt
      }     
    }
  }
`;

export const GET_MESSAGES = gql`
query GetMessages($chatid: ID) {
getMessages(chatid: $chatid){
    content
    createdAt
    sender
  }
}
`;
