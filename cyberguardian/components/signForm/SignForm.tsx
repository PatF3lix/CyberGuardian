import styles from "./signForm.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Btn from "../reusable/Btn/btn";

const signInInitialValues = {
  email: "",
  password: "",
};

const signUpInitialValues = {
  email: "",
  username: "",
  password: "",
};

const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
  username?: string;
};

type SignFormProps = {
  type: "SignIn" | "SignUp";
  handleSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void;
};

export default function SignForm({ type, handleSubmit }: SignFormProps) {
  return (
    <div className={styles.containerForm}>
      <Formik
        initialValues={
          type === "SignIn" ? signInInitialValues : signUpInitialValues
        }
        validationSchema={
          type === "SignIn" ? signInValidationSchema : signUpValidationSchema
        }
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <h2 className={styles.formIntro}>
              {type === "SignIn" ? "Sign in" : "Sign up"}
            </h2>
            {type === "SignUp" && (
              <>
                <Field
                  className={styles.formField}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <ErrorMessage
                  className={styles.fieldErrorMessage}
                  name="username"
                  component="div"
                />
              </>
            )}
            <Field
              className={styles.formField}
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage
              className={styles.fieldErrorMessage}
              name="email"
              component="div"
            />
            <Field
              className={styles.formField}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              className={styles.fieldErrorMessage}
              name="password"
              component="div"
            />
            {type === "SignIn" && (
              <Link className={styles.forgotPassword} href="#">
                Forgot Password?
              </Link>
            )}
            <Btn
              style="signInBtn"
              type="submit"
              primary={true}
              disabled={isSubmitting}
            >
              <p>{type === "SignIn" ? "Sign in" : "Sign up"}</p>
            </Btn>
          </Form>
        )}
      </Formik>
      {type === "SignIn" && (
        <p className={styles.signUpText}>
          New to CyberGuardian?{" "}
          <Link className={styles.signUpLink} href="/SignUp">
            Join now
          </Link>
        </p>
      )}
    </div>
  );
}
