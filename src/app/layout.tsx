import type { Metadata } from 'next';
import './globals.css';
import { SimulationProvider } from '../lib/context/SimulationContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TechDrawer from '../components/TechDrawer';
import DemoModal from '../components/DemoModal';

export const metadata: Metadata = {
  title: 'FARMPATH — Intelligent Farm-to-Market Supply-Chain Optimization (SIH 2026)',
  description: 'Smart India Hackathon 2026 (SIH26033) — Team 2brain Cells — Find the route that earns the farmer more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col antialiased overflow-x-hidden w-full">
        <SimulationProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <TechDrawer />
          <DemoModal />
        </SimulationProvider>
      </body>
    </html>
  );
}
