import Link from "next/link";
import styles from "./cybertoolCard.module.css";
import { Cybertools } from "@/store/useCybertools";

type CybertoolCardProps = {
  tool: Cybertools;
};

export default function CybertoolCard({ tool }: CybertoolCardProps) {
  const { name, description, category, logo } = tool;
  return (
    <div className={styles.cardContainer}>
      <Link href={`/Cybertool/${name}`}>
        <h1 className={styles.toolName}>{name}</h1>
      </Link>
      <h2>Category:{category}</h2>
      <p>Description: {description}</p>
      {/* <Link href={url}>Visit: {url}</Link> */}
      <p>logo: {logo}</p>
    </div>
  );
}
