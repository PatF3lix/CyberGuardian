import React from "react";

interface Cybertools {
  Category: string;
  Name: string;
  Description: string;
  Url: string;
  Logo?: string;
  Image?: string;
}

interface Props {
  cybertools: Cybertools[];
}

const Home: React.FC<Props> = ({ cybertools }) => {
  return (
    <div>
      <h1>CyberGuardian Landing Page</h1>
      <ul>
        {cybertools.map((tool) => (
          <li key={tool.Name}>
            <p>{tool.Name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

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

export default Home;
