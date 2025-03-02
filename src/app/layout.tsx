import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Goclands - Trouvez le pied à terre idéal',
  description: 'Rejoignez notre communauté de voyageurs nomades',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
          rel="stylesheet"
        />

      </head>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}