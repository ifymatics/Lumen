import classes from "./Card.module.scss";

const Card = (props) => {
  const classNames = [props.className, classes.card];

  return <div className={classNames.join(" ")}>{props.children}</div>;
};

export default Card;
