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
    <>
      <label htmlFor="searchInput">Enter Ticker Symbol</label>
      <br />
      <input
        placeholder="US stock ticker"
        defaultValue={query}
        id="searchInput"
        name="search"
        className="text-black"
        ref={inputRef}
      />
      <button onClick={(event) => searchQuery()}>Search</button>
    </>
  );
}

export default SearchBar;
