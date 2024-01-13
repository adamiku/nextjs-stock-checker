'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

type Props = {
  query: string;
};

function SearchBar({ query }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchQuery = () => {
    router.push(`${pathName}?query=${inputRef.current?.value}`);
  };

  return (
    <div>
      <label htmlFor="searchInput">Enter Ticker Symbol</label>
      <br />
      <div className="flex gap-5">
        <input
          placeholder="US stock ticker"
          defaultValue={query}
          id="searchInput"
          name="search"
          className="text-black p-1 pl-3 rounded-lg"
          ref={inputRef}
        />
        <button onClick={(event) => searchQuery()} className="searchBtn">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
