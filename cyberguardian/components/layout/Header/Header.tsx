import Btn from "@/components/reusable/Btn/btn";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.navMenu}>
      <Link href={"/"}>
        <h3 className={styles.PageTitle}>CyberGuardian</h3>
      </Link>
      <div>
        <Btn type="button">
          <Link href={"/SignIn"}>Sign In</Link>
        </Btn>
        <Btn type="button">
          <Link href={"/SignUp"}>Sign Up</Link>
        </Btn>
      </div>
    </header>
  );
}
