import { uiSliceActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reduxproject-3fcae-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("오류");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiSliceActions.shownotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.shownotification({
        status: "pending",
        title: "sending..",
        message: "sending cart data!",
      })
    );

    const sendReqest = async () => {
      const response = await fetch(
        "https://reduxproject-3fcae-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("오류");
      }
    };

    try {
      await sendReqest();

      dispatch(
        uiSliceActions.shownotification({
          status: "success",
          title: "Success",
          message: "sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiSliceActions.shownotification({
          status: "error",
          title: "Error!",
          message: "sending cart data failed!",
        })
      );
    }
  };
};
