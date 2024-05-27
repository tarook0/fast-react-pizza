import React from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import {
    decreaseItemquantity,
    increaseItemquantity,
} from './cartSlice';
function UpdatItemQuantity({ pizzaId ,currentQuantity}) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3 ">
      <Button
        type="round"
        onClick={() => dispatch(increaseItemquantity(pizzaId))}
      >
        +
      </Button>
      <span>
      {currentQuantity}
      </span>
      <Button type="round" onClick={() => dispatch(decreaseItemquantity(pizzaId))}>
        -
      </Button>
    </div>
  );
}

export default UpdatItemQuantity;
