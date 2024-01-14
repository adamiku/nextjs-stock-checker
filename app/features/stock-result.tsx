import { Suspense } from 'react';
import Chart from './chart';
import StockDetails from './stock';
import Recommendation from './stock/recommendation/recommendation';
import SeachResult from './stock/search/seach-result/search-result';
import { getQueriedStock } from './stock/utils';
import { RecommendationSkeleton, StockSkeleton } from './ui/skeletons';

type Props = {
  query: string;
};

async function StockResult({ query }: Props) {
  if (!query) return null;

  const stock = await getQueriedStock(query);

  return (
    <section className="flex flex-col lg:flex-row">
      {stock && (
        <>
          <article className="flex-1 flex flex-col gap-5">
            <StockDetails>
              <Suspense key={query + 'result'} fallback={<StockSkeleton />}>
                <SeachResult stock={stock} />
              </Suspense>
              <p>Recommended peer companies:</p>
              <Suspense
                key={query + 'recommendation'}
                fallback={<RecommendationSkeleton />}
              >
                <Recommendation symbol={query} />
              </Suspense>
            </StockDetails>
          </article>
          <article className="flex-1">
            <Chart symbol={stock.symbol} />
          </article>
        </>
      )}

      {stock === undefined && (
        <div>
          No stock belongs to the provided ticker:{' '}
          <span className="border border-solid border-red-800 p-2">
            {query}
          </span>
        </div>
      )}

      {stock === null && (
        <div>
          Something went wrong, server could not fetch tickers, please try again
        </div>
      )}
    </section>
  );
}

export default StockResult;
