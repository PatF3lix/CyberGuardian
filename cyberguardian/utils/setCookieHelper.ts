import { type FormValuesSignIn } from "@/pages/SignIn";
import { type FormValuesSignUp } from "@/pages/SignUp";

interface ApiResponse {
  ok: boolean;
  statusText: string;
  json: () => Promise<{ token: string }>;
}

export async function setCookie(
  values: FormValuesSignIn | FormValuesSignUp,
  url: string
): Promise<ApiResponse> {
  try {
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

      // Set cookie using document.cookie
      document.cookie = `token=${token}; path=/; max-age=${60 * 60}`;
    } else {
      console.error("Failed to sign in:", res.statusText);
    }

    return res;
  } catch (error) {
    console.error("An error occurred:", error);
    return {
      ok: false,
      statusText: "Error",
      json: async () => ({ token: "" }),
    };
  }
}
