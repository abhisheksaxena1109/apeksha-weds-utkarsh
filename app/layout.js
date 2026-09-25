import './globals.css';

export const metadata = {
  title: 'Apeksha & Utkarsh | Wedding RSVP',
  description: 'Elegant floral wedding website with RSVP management.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}
