import { api } from '@/app/lib/api';
import fsPromises from 'fs/promises';
import path from 'path';
import { StockModel } from './models';

const stocksFilePath = path.join(process.cwd(), 'json/stocks.json');

export async function verifyAndGetStock(symbol: string) {
  const data = await fsPromises.readFile(stocksFilePath);
  const stocks = JSON.parse(data);
  if (stocks) {
    return getStockBySymbol(symbol, stocks);
  }
  // TODO - OPTIMIZATION cache it locally as the response is more than 2MB so it cannot be cached by default, groupBy ticker so select will be O(1)
  const response = await api.get<StockModel[]>('/stock/symbol', 'exchange=US');

  if (!response) return null;

  return getStockBySymbol(symbol, response);
}

function getStockBySymbol(symbol: string, stocks: StockModel[]) {
  return stocks.find(
    (stock) => stock.displaySymbol.toLowerCase() === symbol.toLowerCase()
  );
}
