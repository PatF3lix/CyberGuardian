import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./signin.module.css";
import Link from "next/link";

export default function SignIn() {
  async function handleSubmit(values, { resetForm }) {}
  return (
    <div className={styles.containerForm}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),
          password: Yup.string().required("Required"),
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
            <ErrorMessage name="email" component="div" />
            <Field
              className={styles.formField}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" />
            <Link className={styles.forgotPassword} href="#">
              Forgot Password?
            </Link>
            <button type="submit" disabled={isSubmitting}>
              Sign in
            </button>
          </Form>
        )}
      </Formik>
      <p className={styles.signUpLink}>
        New to cyberguardian? <Link href="/SignUp">Join now</Link>
      </p>
    </div>
  );
}
