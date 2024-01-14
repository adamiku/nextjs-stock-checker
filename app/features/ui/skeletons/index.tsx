export function CurrentPriceSkeleton() {
  return <div className="h-6 w-16 rounded bg-gray-100"></div>;
}

export function HLOCSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-5 w-36 rounded bg-gray-100"></div>
      <div className="h-5 w-36 rounded bg-gray-100"></div>
      <div className="h-5 w-36 rounded bg-gray-100"></div>
      <div className="h-5 w-36 rounded bg-gray-100"></div>
    </div>
  );
}

export function StockSkeleton() {
  return (
    <div className="flex justify-between gap-2 bg-white p-3 rounded-3xl">
      <div className="flex flex-col gap-2">
        <CurrentPriceSkeleton />
        <CurrentPriceSkeleton />
        <CurrentPriceSkeleton />
      </div>
      <HLOCSkeleton />
    </div>
  );
}

export function RecommendationSkeleton() {
  return (
    <div className="flex gap-3">
      <div className="h-10 w-20 rounded-lg bg-gray-100"></div>
      <div className="h-10 w-20 rounded-lg bg-gray-100"></div>
      <div className="h-10 w-20 rounded-lg bg-gray-100"></div>
      <div className="h-10 w-20 rounded-lg bg-gray-100"></div>
    </div>
  );
}

export function StockResultSkeleton() {
  return (
    <div className="flex">
      <div className="flex flex-col gap-5">
        <StockSkeleton />
        <RecommendationSkeleton />
      </div>
      <div></div>
    </div>
  );
}
