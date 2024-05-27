/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigation, Form, redirect, useActionData } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { clearCart, getCart, getTotlaCartPrice } from '../cart/cartSlice';
import store from '../../store';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
/* eslint-disable no-unused-vars */

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: adressStatus,
    position,
    address,
    error: errorAdress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = adressStatus === 'loading';
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotlaCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();
  if (!cart.length) {
    return <EmptyCart />;
  }
  return (
    <div className="px-4 py-6 ">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />

            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
              className="input w-full
            "
            />
            {adressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 text-red-700">
                {errorAdress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="md:top[5px] absolute right-[3px] top-[3px] z-50 md:right-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-red-400  focus:ring focus:ring-red-500  focus:ring-offset-2 "
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude} ${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'placing order ....'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData);
  console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'pleas give us your correct phone number';
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const newOrder = await createOrder(order);

  console.log(newOrder);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
