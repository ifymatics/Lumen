import classes from "./Categories-filter.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const CategoriesFilter = () => {
  return (
    <div className={classes.filter}>
      <div className={classes.left}>
        <h1>All Products</h1>
        <span>
          <span>
            360
            <span
              style={{
                fontSize: "15px",
                position: "absolute",
                top: "3px",
                fontWeight: "500",
              }}
            >
              0
            </span>
          </span>
          <span style={{ marginLeft: "5px", fontSize: "1.6rem" }}>
            <span> </span>
            Look at Lumin
          </span>
          {/* </p> */}
        </span>
      </div>
      <div className={classes.right}>
        <div>
          <h4 style={{ fontSize: "1.2rem" }}>Filter by</h4>
          <ArrowDropDownIcon style={{ cursor: "pointer", fontSize: "3rem" }} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesFilter;
