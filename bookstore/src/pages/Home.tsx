import Header from '../components/common/Header';
import { formatNumber } from '../utils/format';

const COUNT = 10000;
const Home = () => {
  return (
    <>
      <Header />
      <div>Home</div>
      <div>count : {formatNumber(COUNT)}</div>
    </>
  );
};

export default Home;
