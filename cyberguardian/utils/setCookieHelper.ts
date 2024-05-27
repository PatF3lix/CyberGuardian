import { cookies } from "next/headers";
import { type FormValuesSignIn } from "@/pages/SignIn";
import { type FormValuesSignUp } from "@/pages/SignUp";

export async function setCookie(
  values: FormValuesSignIn | FormValuesSignUp,
  url: string
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (res.ok) {
    const data = await res.json();
    const { token } = data;
    cookies().set("token", token, {
      path: "/",
      maxAge: 60 * 60,
    });
  } else {
    console.error("Failed to sign in:", res.statusText);
  }
}
