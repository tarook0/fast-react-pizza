import CartOverview from '../featuers/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';
import { useNavigation, Outlet } from 'react-router-dom';
function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default Applayout;
