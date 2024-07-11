import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useMutation, UseMutationResult } from "react-query";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { login } from "../../state/authSlice";
import { mockAuthAPI } from "../../API/MockAuthAPI";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import ValeoLogo from "../../assets/ValeoLogo";

interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginResponse {
  success: boolean;
  user: { email: string; password: string } | null;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState<string | null>(null);

  const mutation: UseMutationResult<LoginResponse, Error, LoginData> =
    useMutation(
      ({ email, password }: LoginData) => mockAuthAPI.login(email, password),
      {
        onSuccess: (data) => {
          if (data.success && data.user) {
            dispatch(login(data.user));
            navigate("/dashboard");
          } else {
            setError("Invalid email or password");
          }
        },
        onError: () => {
          setError("An error occurred. Please try again.");
        },
      }
    );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values: LoginData) => {
      setError(null);
      mutation.mutate(values);
    },
  });

  return (
    <Container className={styles.loginContainer}>
      <Grid item xs={12} md={6} className={styles.logoDiv}>
        <Grid className={styles.logoText}>
          <ValeoLogo />
          <Typography
            variant="subtitle1"
            className={styles.logoText}
            sx={{ marginLeft: 20, position: "relative", top: -60 }}
          >
            <strong>DV Data</strong>Visualization
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} className={styles.loginDiv}>
        <div style={{ textAlign: "center", width: "80%" }}>
          <form onSubmit={formik.handleSubmit}>
            <Typography className={styles.inputLabel}>Login</Typography>
            <TextField
              className={styles.input}
              margin="normal"
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#cccccc",
                  },
                },
              }}
            />
            <Typography className={styles.inputLabel}>Password</Typography>
            <TextField
              className={styles.input}
              margin="normal"
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#cccccc",
                  },
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                />
              }
              label="Remember password?"
              sx={{ paddingRight: "48%" }}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              fullWidth
              disabled={mutation.isLoading}
              className={styles.submitBottom}
            >
              {mutation.isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </form>
        </div>
      </Grid>
    </Container>
  );
};

export default Login;
