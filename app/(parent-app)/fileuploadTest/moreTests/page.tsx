
import UserUpload from "./UserUpload";

interface UserData {
  firstName: string;
  lastName: string;
  dob: string;
  townAddress: string;
  emailAddress: string;
}

export default function page() {
    return(
      <UserUpload/>
    )
}