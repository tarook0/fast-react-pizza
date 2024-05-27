import CreateUser from '../featuers/user/CreateUser';
import { useSelector } from 'react-redux';
import Button from './Button';
function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className=" my-10 text-center sm:my-16">
      <h1
        className=" mb-4 text-xl 
       font-semibold text-stone-700"
      >
        The best pizza.
        <br />
        <span className="text-3xl text-red-800">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to={'/menu'} type={'primary'}>
          Continue ordering{username}
        </Button>
      )}
    </div>
  );
}

export default Home;
