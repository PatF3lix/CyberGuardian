import { FormikHelpers } from "formik";
import SignForm from "../../components/signForm/SignForm";
import { setCookie } from "@/utils/setCookieHelper";
import { useRouter } from "next/router";
// import styles from "./signUp.module.css";

export type FormValuesSignUp = {
  email: string;
  password: string;
  username?: string;
};

export default function SignUp() {
  const router = useRouter();
  async function handleSubmit(
    values: FormValuesSignUp,
    { resetForm }: FormikHelpers<FormValuesSignUp>
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

  return <SignForm type="SignUp" handleSubmit={handleSubmit} />;
}
