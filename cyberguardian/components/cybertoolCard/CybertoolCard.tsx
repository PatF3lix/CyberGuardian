import Link from "next/link";
import styles from "./cybertoolCard.module.css";
import { Cybertools } from "@/store/useCybertools";
import Image from "next/image";

type CybertoolCardProps = {
  tool: Cybertools;
};

export default function CybertoolCard({ tool }: CybertoolCardProps) {
  const { name, description, category } = tool;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.logoName}>
        <Image
          className={styles.logo}
          src="/images/mocklogo.jpg"
          alt="${name-logo}"
          width={200}
          height={100}
        />
        <Link href={`/Cybertool/${name}`}>
          <h2 className={styles.toolName}>{name}</h2>
        </Link>
      </div>
      <h2 className={styles.category}>Category: {category}</h2>
      <p className={styles.description}>{description}</p>
      <button className={styles.visitBtn} type="button">
        <p className={styles.visit}>Visit</p>
        <Image
          className={styles.externalLink}
          src={"/images/external-link.png"}
          height={200}
          width={200}
          alt="external-link icon"
        />
      </button>
    </div>
  );
}
