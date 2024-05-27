import { Link } from "react-router-dom";
import SearchOrder from "../featuers/order/SearchOrder";
import UserName from "../featuers/user/UserName";

const Header = () => {
  return (
    <header className="flex justify-between items-center   bg-red-600 px-4 py-3 uppercase border-b-2 border-stone-200 ">
      <Link to={"/"}> Fast react pizz co.</Link>
      <SearchOrder />
      <UserName/>
    </header>
  );
};

export default Header;
