import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "src/api";

const useSignup = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const api = useApi();
  const navigate = useNavigate();

  const signUpHandler = (data) => {
    api
      .createUser(data)
      .then(() => {
        navigate("/login", { replace: true });
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
    signUpHandler,
  };
};

export default useSignup;
