import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './featuers/menu/Menu';
import CreateOrder, {
  action as createOrderAction,
} from './featuers/order/CreateOrder';
import Cart from './featuers/cart/Cart';
import Order, { loader as loadOrder } from './featuers/order/Order';
import { action as updateOredrAction } from './featuers/order/UpdatOrder';
import Applayout from './ui/AppLayout';
import Error from './ui/Error';

const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/order/new',
        action: createOrderAction,
        element: <CreateOrder />,
      },
      {
        path: '/order/:orderId',
        errorElement: <Error />,
        element: <Order />,
        loader: loadOrder,
        action: updateOredrAction,
      },
      { path: '/cart', element: <Cart /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
