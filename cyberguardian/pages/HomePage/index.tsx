import { Cybertools, useCybertoolsContext } from "@/store/useCybertools";
import React, { useEffect } from "react";
import styles from "./homePage.module.css";
import CybertoolCard from "@/components/cybertoolCard/CybertoolCard";
import SearchBar from "@/components/searchBar/SearchBar";

interface HomeProps {
  cybertools: Cybertools[];
}

export default function HomePage({ cybertools }: HomeProps) {
  const {
    cybertools: tools,
    setCybertoolsData,
    loadedData,
  } = useCybertoolsContext();

  useEffect(() => {
    if (!loadedData || tools.length !== cybertools.length) {
      setCybertoolsData(cybertools);
    }
  }, [cybertools, loadedData]);

  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.homePageTitle}>CyberGuardian Landing Page</h1>
      <SearchBar />
      <div className={styles.toolsContainer}>
        {!loadedData ? (
          tools.map((tool) => (
            <CybertoolCard key={tool.Name} name={tool.Name} />
          ))
        ) : (
          <p>Is Loading...</p>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("http://cyberserver:4001/api/cybertools");
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const data: Cybertools[] = await res.json();
    return {
      props: {
        cybertools: data,
      },
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      props: {
        cybertools: [],
      },
    };
  }
}
