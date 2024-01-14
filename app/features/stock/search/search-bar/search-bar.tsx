'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Props = {
  query: string;
};

function SearchBar({ query }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchQuery = () => {
    if (!inputRef.current?.value) return;
    router.push(`${pathName}?query=${inputRef.current?.value}`);
  };

  useEffect(() => {
    if (inputRef.current && query !== inputRef.current.value && query) {
      inputRef.current.value = query;
    }
  }, [query]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        searchQuery();
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div>
      <label htmlFor="searchInput">Enter Ticker Symbol</label>
      <br />
      <div className="flex justify-between gap-5 md:justify-normal">
        <input
          placeholder="US stock ticker"
          defaultValue={query}
          id="searchInput"
          name="search"
          className="text-black p-1 pl-3 rounded-lg flex-1 md:flex-grow-0"
          ref={inputRef}
        />
        <button
          onClick={(event) => searchQuery()}
          className="searchBtn self-end"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
