import { useRouter } from "next/router";
import Btn from "../../reusable/Btn/btn";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  function handleSignIn() {
    router.push("/SignIn");
  }

  function handleSignUp() {
    router.push("/SignUp");
  }

  return (
    <header className={styles.navMenu}>
      <Link className={styles.pageTitle} href={"/HomePage"}>
        <h3>CyberGuardian</h3>
      </Link>
      <div className={styles.navLinksContainer}>
        <Btn action={handleSignIn} type="button" primary={true}>
          <span className={styles.navLink}>Sign In</span>
        </Btn>
        <Btn action={handleSignUp} type="button" primary={true}>
          <span className={styles.navLink}>Sign Up</span>
        </Btn>
      </div>
    </header>
  );
}
