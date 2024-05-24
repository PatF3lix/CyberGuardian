import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./signin.module.css";
import Link from "next/link";
import Btn from "@/components/reusable/Btn/btn";

type FormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  async function handleSubmit(
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) {
    console.log(values);
    resetForm();
  }

  return (
    <div className={styles.containerForm}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <h2 className={styles.formIntro}>Sign in</h2>
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
            <Link className={styles.forgotPassword} href="#">
              Forgot Password?
            </Link>
            <Btn
              style="signInBtn"
              type="submit"
              primary={true}
              disabled={isSubmitting}
            >
              <p>Sign in</p>
            </Btn>
          </Form>
        )}
      </Formik>
      <p className={styles.signUpText}>
        New to CyberGuardian?{" "}
        <Link className={styles.signUpLink} href="/SignUp">
          Join now
        </Link>
      </p>
    </div>
  );
}
