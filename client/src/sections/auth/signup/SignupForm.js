import { useNavigate } from "react-router-dom";
// @mui
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useStateContext } from "src/Context/stateContext";
import useSignup from "src/hooks/useSignup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function SignupForm() {
  const { setUser } = useStateContext();
  const { error, loading, signUpHandler } = useSignup();
  const [passValidation, setPassValidation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleClick = (data) => {
    if (data.password === data.confirmPassword) {
      signUpHandler(data);
    } else {
      setPassValidation(true);
    }
  };

  return (
    <>
      <Stack spacing={3} component="form" onSubmit={handleSubmit(handleClick)}>
        <TextField
          margin="normal"
          // required
          fullWidth
          id="username"
          name="username"
          label="Username"
          type="text"
          {...register("username", { required: true })}
          autoFocus
        />
        {errors.username?.type === "required" && (
          <span role="alert" style={{ color: "red" }}>
            *Username is required
          </span>
        )}
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <span role="alert" style={{ color: "red" }}>
            *Email Address is required
          </span>
        )}
        <TextField
          margin="normal"
          // required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <span role="alert" style={{ color: "red" }}>
            *password is required
          </span>
        )}
        <TextField
          margin="normal"
          // required
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword?.type === "required" && (
          <span role="alert" style={{ color: "red" }}>
            *Confirm Password is required
          </span>
        )}
        {error ? (
          <span role="alert" style={{ color: "red" }}>
            {error?.response.data.message}
          </span>
        ) : (
          passValidation && (
            <span role="alert" style={{ color: "red" }}>
              Password and Confirm Password Must be same
            </span>
          )
        )}
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          sx={{ mt: 2 }}
          variant="contained"
        >
          Create Account
        </LoadingButton>
      </Stack>
    </>
  );
}
