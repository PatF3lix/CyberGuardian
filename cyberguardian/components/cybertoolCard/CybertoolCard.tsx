import Link from "next/link";
import styles from "./cybertoolCard.module.css";
// import Image from "next/image";

type CybertoolCardProps = {
  name: string;
  //   logo: string;
};

export default function CybertoolCard({ name }: CybertoolCardProps) {
  return (
    <div className={styles.cardContainer}>
      {/* <Image className={styles.logo} src={logo} alt={name} /> */}
      <Link href={`/Cybertool/${name}`}>
        <h2 className={styles.toolName}>{name}</h2>
      </Link>
    </div>
  );
}
