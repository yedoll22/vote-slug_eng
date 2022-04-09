import { useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAccessToken } from "../slice/accessTokenSlice";
import { loginHandler } from "../slice/isLoginSlice";

const Token = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.value);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.newAccessToken) {
          dispatch(getAccessToken(res.data.newAccessToken));
          dispatch(loginHandler());
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          history.push("/login");
        } else if (err.response.status === 500) console.log(err);
      });
  }, [location]);

  return null;
};

export default Token;
