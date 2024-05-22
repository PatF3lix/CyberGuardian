import Link from "next/link";
import styles from "./cybertoolCard.module.css";
// import Image from "next/image";

type CybertoolCardProps = {
  key: string;
  name: string;
  //   logo: string;
};

export default function CybertoolCard({ key, name }: CybertoolCardProps) {
  return (
    <div key={key} className={styles.cardContainer}>
      {/* <Image className={styles.logo} src={logo} alt={name} /> */}
      <Link href={`/Cybertool/${name}`}>
        <h2 className={styles.toolName}>{name}</h2>
      </Link>
    </div>
  );
}
