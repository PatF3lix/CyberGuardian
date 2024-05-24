import { FormikHelpers } from "formik";
import SignForm from "../../components/signForm/SignForm";
// import styles from "./signin.module.css";

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

  return <SignForm type="SignIn" handleSubmit={handleSubmit} />;
}
