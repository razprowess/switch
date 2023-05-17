import { Account } from "../components/MessageHeader";

 const isMatch = (account: Account, input: string)=>{
    return account?.firstname.includes(input) || account?.lastname.includes(input)
} 

export default isMatch;