import Products from "./../products/Products";
import Filter from "./../categories-filter/Categories-filter";
import classes from "./Home.module.scss";

const Home = ({ setShow }) => {
  return (
    <div className={classes.home}>
      <Filter />

      <Products setShow={setShow} />
    </div>
  );
};

// <div className={classes.home}>
//   <div className={classes.filter}>
//     <Filter />
//   </div>

//   <div className={classes.container}>
//     <div className={classes.products}>
//       <Products />
//     </div>
//   </div>
// </div>;
export default Home;
