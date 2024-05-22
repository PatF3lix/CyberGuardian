import { Cybertools, useCybertoolsContext } from "@/store/useCybertools";
import React, { useEffect } from "react";

interface HomeProps {
  cybertools: Cybertools[];
}

function HomePage({ cybertools }: HomeProps) {
  const {
    cybertools: tools,
    setCybertoolsData,
    loadedData,
  } = useCybertoolsContext();

  useEffect(() => {
    if (!loadedData || tools.length !== cybertools.length) {
      setCybertoolsData(cybertools);
    }
  });

  return (
    <div>
      <h1>CyberGuardian Landing Page</h1>
      <ul>
        {loadedData ? (
          tools.map((tool) => (
            <li key={tool.Name}>
              <p>{tool.Name}</p>
            </li>
          ))
        ) : (
          <p>Is Loading...</p>
        )}
      </ul>
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

export default HomePage;
