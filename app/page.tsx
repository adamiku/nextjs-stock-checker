import { Suspense } from 'react';
import StockResult from './features/stock-result';
import SearchBar from './features/stock/search/search-bar/search-bar';
import { StockResultSkeleton } from './features/ui/skeletons';

type Props = {
  searchParams: {
    query: string;
  };
};

export default async function Home({ searchParams: { query } }: Props) {
  return (
    <main className="flex min-h-screen flex-col gap-5 p-8 mt-10">
      <SearchBar query={query} />
      {/* empty string query could be handled separately */}
      {!query && <div>Use the search bar to receive stock information</div>}

      {query && (
        <Suspense fallback={<StockResultSkeleton />} key={query + 'blabl'}>
          <StockResult query={query} />
        </Suspense>
      )}
    </main>
  );
}
