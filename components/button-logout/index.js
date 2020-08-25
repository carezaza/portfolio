import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/user/slice";
import axios from "axios";
import { useRouter } from "next/router";

const Button = styled.button`
  position: fixed;
  bottom: 5px;
  right: 5px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 3px;
  padding: 5px 10px;
  color: #fff;
  outline: none;
  border: none;

  &:hover {
    filter: brightness(90%);
  }
`;

function ButtonLogout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.userReducer);

  const handleLogout = () => {
    axios
      .post("/api/user/logout")
      .then((res) => {
        dispatch(setUser(null));
        router.push("/");
      })
      .catch((err) => console.error(err));
  };

  if (!user) return null;
  return <Button onClick={handleLogout}>LOGOUT</Button>;
}

export default ButtonLogout;
