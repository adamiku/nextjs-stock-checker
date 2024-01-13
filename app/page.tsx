import { Suspense } from 'react';
import Chart from './features/chart';
import Stock from './features/stock';
import Recommendation from './features/stock/recommendation/recommendation';
import SeachResult from './features/stock/search/seach-result/search-result';
import SearchBar from './features/stock/search/search-bar/search-bar';
import { StockSkeleton } from './features/ui/skeletons';

type Props = {
  searchParams: {
    query: string;
  };
};

export default function Home({ searchParams: { query } }: Props) {
  return (
    <main className="flex min-h-screen flex-col gap-5 p-24 md:flex-row">
      <section className="flex-1">
        <Stock>
          <SearchBar query={query} />
          <Suspense key={query} fallback={<StockSkeleton />}>
            <SeachResult query={query} />
          </Suspense>
          <Recommendation />
        </Stock>
      </section>
      <section className="flex-1">
        <Chart />
      </section>
    </main>
  );
}
