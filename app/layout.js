import './globals.css';

export const metadata = {
  title: 'Apeksha & Utkarsh | Wedding RSVP',
  description: 'Elegant floral wedding website with RSVP management.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
