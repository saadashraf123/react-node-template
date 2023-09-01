import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import useLogin from "src/hooks/useLogin";
import { useStateContext } from "src/Context/stateContext";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useStateContext();
  const { data, error, loading, loginHandler } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data?.token);
      setUser(data?.user);
      navigate("/dashboard");
    }
  }, [data?.token]);

  const handleClick = (data) => {
    loginHandler(data);
  };

  return (
    <>
      <Stack spacing={3} component="form" onSubmit={handleSubmit(handleClick)}>
        <TextField
          margin="normal"
          // required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          {...register("email", { required: true })}
          autoFocus
        />
        {errors.email?.type === "required" && (
          <span role="alert" style={{ color: "red" }}>
            *Email Address is required
          </span>
        )}
        <TextField
          name="password"
          label="Password"
          id="password"
          {...register("password", { required: true })}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errors.password?.type === "required" && (
          <span role="alert" style={{ color: "red" }}>
            *Password is required
          </span>
        )}
        {error && (
          <span role="alert" style={{ color: "red" }}>
            {error?.response.data.message}
          </span>
        )}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </Stack>
    </>
  );
}
