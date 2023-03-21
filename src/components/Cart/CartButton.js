import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../../store/ui-slice";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const dispacth = useDispatch();
  const amount = useSelector((state) => state.cart.totalQuantity);

  const showUiHandler = () => {
    dispacth(uiSliceActions.toggle());
  };

  return (
    <button className={classes.button} onClick={showUiHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{amount}</span>
    </button>
  );
};

export default CartButton;
