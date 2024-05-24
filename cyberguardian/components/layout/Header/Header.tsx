import Btn from "../../reusable/Btn/btn";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.navMenu}>
      <Link className={styles.pageTitle} href={"/home"}>
        <h3>CyberGuardian</h3>
      </Link>
      <div className={styles.navLinksContainer}>
        <Btn type="button" primary={true}>
          <Link className={styles.navLink} href={"/SignIn"}>
            Sign In
          </Link>
        </Btn>
        <Btn type="button" primary={true}>
          <Link className={styles.navLink} href={"/SignUp"}>
            Sign Up
          </Link>
        </Btn>
      </div>
    </header>
  );
}
