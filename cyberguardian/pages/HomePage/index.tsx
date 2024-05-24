import { Cybertools } from "../../store/useCybertools";
import React from "react";
import styles from "./homePage.module.css";
import SearchBar from "../../components/searchBar/SearchBar";
import HomePageIntro from "../../components/homePageIntro/HomePageIntro";
import CybertoolsCards from "../../components/cybertoolsCards/CybertoolsCards";

interface HomeProps {
  cybertools: Cybertools[];
}

export default function HomePage({ cybertools }: HomeProps) {
  return (
    <div className={styles.homePageContainer}>
      <HomePageIntro />
      <SearchBar />
      <CybertoolsCards cybertools={cybertools} />
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
