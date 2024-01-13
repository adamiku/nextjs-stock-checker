import Chart from './features/chart';
import Stock from './features/stock';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-5 p-24 md:flex-row">
      <section className="flex-1">
        <Stock />
      </section>
      <section className="flex-1">
        <Chart />
      </section>
    </main>
  );
}
