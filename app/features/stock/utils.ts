import { api } from '@/app/lib/api';
import { groupBy } from 'lodash-es';
import { StockModel } from './models';

type StocksDictionary = Record<keyof StockModel, [StockModel]>;

type CachedStocks = undefined | StocksDictionary;

// cache it in e.g. S3 bucket and make it requestable by 'symbol', save it in a local DB and update it regularly
// endpoint to delete/invalidate cache

let cachedStocks: CachedStocks;

export async function getQueriedStock(
  symbol: string
): Promise<null | undefined | StockModel> {
  const selectedStock =
    cachedStocks?.[symbol.toUpperCase() as keyof StockModel];

  // TODO if the stock is not in the cache it will call the get symbol api again, it can be a valid scenario to refresh the response, maybe it was added since the last time, but it can lead to unnecessary calls as well
  if (selectedStock) {
    return selectedStock[0];
  }

  // TODO - OPTIMIZATION cache it locally as the response is more than 2MB so it cannot be cached by default on network level, groupBy symbol so lookup will be O(1)
  const response = await api.get<StockModel[]>('/stock/symbol', 'exchange=US');

  // handle api errors
  if (!response) return null;

  cachedStocks = groupByProperty<StockModel>(response, 'symbol');

  return cachedStocks[symbol.toUpperCase() as keyof StockModel]?.[0];
}

// TODO create a more generic version
function groupByProperty<T>(
  collection: T[],
  property: keyof T
): Record<keyof T, [T]> {
  return groupBy(collection, String(property).toLowerCase()) as Record<
    keyof T,
    [T]
  >;
}
