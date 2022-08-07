import {useSelector} from "react-redux";
import {selectUser} from "../store/slice/userSlice";

export function useAuth() {
  const {email, token, id} = useSelector(selectUser);

  return {
    isAuth: !!email,
    email,
    id,
    token,
  };
}
