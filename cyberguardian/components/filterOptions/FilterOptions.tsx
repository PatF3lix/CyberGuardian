import Btn from "../reusable/Btn/btn";
import styles from "./filterOptions.module.scss";
import { FaStar } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";

export default function FilterOptions() {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersFeatures}>
        <Btn type="button" primary={true}>
          <FaStar />
          <span className={styles.filtersBtnText}>Popular</span>
        </Btn>
        <Btn type="button" primary={true}>
          <BsStars />
          <span className={styles.filtersBtnText}>New</span>
        </Btn>
        <Btn type="button" primary={true}>
          <IoFilterOutline />
          <span className={styles.filtersBtnText}>Filters</span>
        </Btn>
      </div>
    </div>
  );
}
