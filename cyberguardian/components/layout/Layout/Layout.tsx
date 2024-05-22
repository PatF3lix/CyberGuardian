import type { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.rootContainer}>
      <Header />
      <main className={styles.containerMain}>{children}</main>
      <Footer />
    </div>
  );
}
