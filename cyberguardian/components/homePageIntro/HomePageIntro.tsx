import styles from "./homePageIntro.module.css";

export default function HomePageIntro() {
  return (
    <>
      <h1 className={styles.homePageTitle}>CyberGuardian</h1>
      <h2 className={styles.homePageIntro}>
        Welcome to CyberGuardian, your trusted guide in the realm of digital
        security.
      </h2>
    </>
  );
}
