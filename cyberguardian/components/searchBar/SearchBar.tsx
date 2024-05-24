import Btn from "../reusable/Btn/btn";
import styles from "./searchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search..." />
      <Btn primary={true} type="submit">
        Search
      </Btn>
    </div>
  );
}
