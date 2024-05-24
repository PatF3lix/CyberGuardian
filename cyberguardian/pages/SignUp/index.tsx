import { FormikHelpers } from "formik";
import SignForm from "../../components/signForm/SignForm";
// import styles from "./signUp.module.css";

type FormValues = {
  email: string;
  password: string;
  username?: string;
};

export default function SignUp() {
  async function handleSubmit(
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) {
    console.log(values);
    resetForm();
  }

  return <SignForm type="SignUp" handleSubmit={handleSubmit} />;
}
