import { useCybertoolsContext, type Cybertools } from "@/store/useCybertools";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./cybertoolPage.module.scss";

export default function Cybertool() {
  const { cybertools } = useCybertoolsContext();
  const router = useRouter();
  //extract tool name from url
  const { id } = router.query;

  //find tool
  const cybertool: Cybertools | undefined = cybertools.find(
    (tool) => tool.name === id
  );

  //verify if tool exists
  // could handle a state here, to throw an error if that object no longer exists
  if (cybertool === undefined) {
    console.log("no tool with that name was found.");
  } else {
    console.log(cybertool);
  }

  const { category, description, name } = cybertool!;

  return (
    <div className={styles.cybertoolPageContainer}>
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
    </div>
  );
}
