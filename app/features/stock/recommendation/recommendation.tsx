import { api } from '@/app/lib/api';
import { ApiRouter } from '@/app/lib/routes';
import Link from 'next/link';

type Props = {
  symbol: string;
};

async function Recommendation({ symbol }: Props) {
  const response = await api.get<string[]>(ApiRouter.PEERS, `symbol=${symbol}`);

  return (
    <article className="flex flex-wrap gap-3">
      {response
        ?.filter((peer) => peer.toLowerCase() !== symbol.toLowerCase())
        .map((peer) => (
          <Link
            key={peer}
            href={`?query=${peer}`}
            className="text-black bg-white p-2 rounded-lg min-w-20 text-center hover:bg-orange"
          >
            {peer}
          </Link>
        ))}
      {!response ||
        (response.length === 0 && (
          <div>There are no peer companies for {symbol}</div>
        ))}
    </article>
  );
}

export default Recommendation;
