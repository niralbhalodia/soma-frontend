import toast from 'react-hot-toast';
import { setLocalStorage } from './localStorage';

export const totalPrice = (cart) => {
  return (
    cart &&
    cart.length > 0 &&
    cart
      .map((product) => Number(product.cartPrice))
      .reduce((prev, next) => prev + next, 0)
      .toFixed(2)
  );
};

export const handleLocalCart = async (item, carts = [], type) => {
  let exitsCart =
    carts && carts.length > 0 && carts.find((cart) => Number(cart.id) === Number(item.id));

  if (item?.hasCombination && item.hasCombination?.id) {
    exitsCart =
      carts &&
      carts.length > 0 &&
      carts.find((cart) => Number(cart?.hasCombination?.id) === Number(item.hasCombination?.id));
  }

  let result = [];
  if (carts) {
    // if there is already selected product within local card than it will update qty and cartPrice
    if (exitsCart) {
      const numberOfItems = type
        ? Number(exitsCart.numberOfItems) + item.qty
        : Number(exitsCart.numberOfItems) - item.qty;
      exitsCart.numberOfItems = numberOfItems;
      exitsCart.cartPrice = Number(numberOfItems) * Number(exitsCart.price);
      result = [...carts];
      setLocalStorage('cart', result);
      toast.remove();
      toast.success('Cart item updated');
    } else {
      //else adding new product to cart
      item.cartPrice = Number(item.price) * Number(item.qty);
      item.numberOfItems = item.qty;

      // adding new product
      result = [...carts, item];
      setLocalStorage('cart', result);
      toast.remove();
      toast.success('Product added to cart');
    }
  }
  return result;
};
