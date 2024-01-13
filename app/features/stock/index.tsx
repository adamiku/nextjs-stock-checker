import Recommendation from './recommendation/recommendation';
import SeachResult from './search/seach-result/search-result';
import SearchBar from './search/search-bar/search-bar';

function Stock() {
  return (
    <>
      <SearchBar />
      <SeachResult />
      <Recommendation />
    </>
  );
}

export default Stock;
