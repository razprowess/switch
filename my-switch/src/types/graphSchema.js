import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation LoginUser($user: LoginInput){
loginUser(user: $user){
email
token
}
}
`