import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import DeleteItem from './DeleteButton';
import UpdatItemQuantity from './UpdatItemQuantity';
import {useSelector} from 'react-redux';
import { getCurrentQuantityById } from './cartSlice';
/* eslint-disable no-unused-vars */
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  const currentQuantity=useSelector(getCurrentQuantityById(pizzaId))

  return (
    <li className="sm: items-center py-3 sm:flex sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdatItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
