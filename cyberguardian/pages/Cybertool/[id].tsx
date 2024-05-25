import { GetStaticPaths, GetStaticProps } from "next";
import { type Cybertools } from "@/store/useCybertools";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./cybertoolPage.module.scss";

interface CybertoolPageProps {
  cybertool: Cybertools | null;
}

export default function Cybertool({ cybertool }: CybertoolPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!cybertool) {
    return (
      <div className={styles.cybertoolPageContainer}>
        <h2>No tool found</h2>
        <p>We could not find the tool you were looking for.</p>
      </div>
    );
  }

  const { category, description, name } = cybertool;

  return (
    <div className={styles.cybertoolPageContainer}>
      <div className={styles.logoName}>
        <Image
          className={styles.logo}
          src="/images/mocklogo.jpg"
          alt={`${name}-logo`}
          width={200}
          height={100}
        />
        <Link href={`/Cybertool/${name}`}>
          <h2 className={styles.toolName}>{name}</h2>
        </Link>
      </div>
      <h2 className={styles.category}>Category: {category}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://cyberserver:4001/api/cybertools");
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  }
  const data: Cybertools[] = await res.json();

  const paths = data.map((tool: Cybertools) => ({
    params: { id: tool.name },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch("http://cyberserver:4001/api/cybertools");
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  }
  const data: Cybertools[] = await res.json();
  const cybertool = data.find((tool: Cybertools) => tool.name === id) || null;

  return {
    props: { cybertool },
  };
};
