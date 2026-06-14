import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'Nível Olímpico', template: '%s | Nível Olímpico' },
  description: 'Preparação para olimpíadas de Física (OBF, IPhO) e exames ITA/IME. Livros, simulações interativas e cursos do Prof. Dr. Ivan Guilhon.',
  keywords: ['olimpíada de física', 'ITA', 'IME', 'OBF', 'ivan guilhon', 'física olímpica'],
  openGraph: {
    siteName: 'Nível Olímpico',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
