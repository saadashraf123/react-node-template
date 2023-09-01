import { useState } from "react";
import { useApi } from "src/api";

const useLogin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const api = useApi();

  const loginHandler = (data) => {
    api
      .login(data)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const meHandler = async () => {
    api
      .me()
      .then((response) => {
        setData(response.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return {
    data,
    loading,
    error,
    loginHandler,
    meHandler,
  };
};

export default useLogin;
