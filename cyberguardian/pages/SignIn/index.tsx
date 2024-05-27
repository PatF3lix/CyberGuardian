import { FormikHelpers } from "formik";
import SignForm from "../../components/signForm/SignForm";
import { setCookie } from "@/utils/setCookieHelper";

import { useRouter } from "next/router";
// import styles from "./signin.module.css";

export type FormValuesSignIn = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();

  async function handleSubmit(
    values: FormValuesSignIn,
    { resetForm }: FormikHelpers<FormValuesSignIn>
  ) {
    try {
      const res = await setCookie(values, process.env.SIGN_IN_URL!);
      if (res.ok) {
        router.push("/HomePage");
        resetForm();
      } else {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return <SignForm type="SignIn" handleSubmit={handleSubmit} />;
}
