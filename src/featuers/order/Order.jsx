// Test ID: IIDSAT

import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useFetcher, useLoaderData } from 'react-router-dom';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import UpdatOrder from './UpdatOrder';

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  /* eslint-disable no-unused-vars */
  const order = useLoaderData();
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6 ">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold ">Order # {id} Status</h2>
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-600  px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50 ">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600  px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50 ">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y divide-stone-300 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ??
              []
            }
            isLoadingIngredients={fetcher.state === 'loading'}
          />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-300 px-6 py-5 ">
        <p className="text-sm font-medium text-stone-700">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-700">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className=" font-bold ">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority &&<UpdatOrder />}
    </div>
  );
}
export function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}
export default Order;
