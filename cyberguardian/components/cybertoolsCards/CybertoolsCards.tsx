import { useEffect, useState } from "react";
import styles from "./cybertools.module.css";
import { Cybertools, useCybertoolsContext } from "../../store/useCybertools";
import CybertoolCard from "../cybertoolCard/CybertoolCard";
import Btn from "../reusable/Btn/btn";

type CybertoolsProps = {
  cybertools: Cybertools[];
};

export default function CybertoolsCards({ cybertools }: CybertoolsProps) {
  const [displayedTools, setDisplayedTools] = useState(15);

  const loadMoreTools = () => {
    setDisplayedTools((prevTools) => prevTools + 15);
  };

  const {
    cybertools: tools,
    setCybertoolsData,
    loadedData,
  } = useCybertoolsContext();

  useEffect(() => {
    if (!loadedData || tools.length !== cybertools.length) {
      setCybertoolsData(cybertools);
    }
  }, [loadedData, setCybertoolsData, cybertools, tools.length]);

  return (
    <>
      <div className={styles.toolsContainer}>
        {loadedData ? (
          <>
            {tools.slice(0, displayedTools).map((tool) => (
              <CybertoolCard key={tool.name} tool={tool} />
            ))}
          </>
        ) : (
          <p>Is Loading...</p>
        )}
      </div>
      <Btn style={"loadMoreBtn"} primary={true} action={loadMoreTools}>
        Load More
      </Btn>
    </>
  );
}
