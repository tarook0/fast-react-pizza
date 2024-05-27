import { Link } from 'react-router-dom';
import { getTotlaCartPrice, getTotlaCartQuantity } from './cartSlice';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totlaCartQuantity = useSelector(getTotlaCartQuantity);
  const totlaCartPrice = useSelector(getTotlaCartPrice);
  if(!totlaCartQuantity) return null;
  return (
    <div className=" flex items-center justify-between bg-stone-800 p-4 text-stone-300">
      <p className="space-x-4 font-semibold text-stone-400">
        <span>{totlaCartQuantity}</span>
        <span>{formatCurrency(totlaCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
