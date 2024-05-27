import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import {useSelector,useDispatch} from'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

/* eslint-disable no-unused-vars */
function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch=useDispatch();
if(!cart.length){
  return <EmptyCart/>
}
  return (
    <div className="px-4 py-3 ">
      <LinkButton to="/menu"> &larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-400  border-b-2 border-stone-400">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button type="primary" to="/order/new">
          Order pizzas{' '}
        </Button>
        <Button type={'secondary'} onClick={()=>dispatch(clearCart())}>Clear Cart </Button>
      </div>
    </div>
  );
}

export default Cart;
