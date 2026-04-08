import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Make My OG | Free OG Image & Social Card Generator',
  description: 'Create stunning OG images and social cards instantly with our free visual generator. No design skills needed. Download PNG/JPEG, copy meta tags, and share on Twitter, Facebook, LinkedIn.',
  keywords: 'OG image generator, open graph image, social card generator, Twitter card, meta tags, social media preview, og:image, social sharing',
  metadataBase: new URL('https://makemyog.app'),
  alternates: {
    canonical: 'https://makemyog.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://makemyog.app',
    siteName: 'Make My OG',
    title: 'Make My OG | Free OG Image & Social Card Generator',
    description: 'Create stunning OG images and social cards instantly with our free visual generator.',
    images: [
      {
        url: 'https://makemyog.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Make My OG - OG Image Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@makemyog',
    title: 'Make My OG | Free OG Image & Social Card Generator',
    description: 'Create stunning OG images and social cards instantly with our free visual generator.',
    images: ['https://makemyog.app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="googleb445e36c7da0e542" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4N56LRGCZ5"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4N56LRGCZ5');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Make My OG',
              description: 'Free OG Image & Social Card Generator',
              url: 'https://makemyog.app',
              applicationCategory: 'DesignApplication',
              browserRequirements: 'HTML5 Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              image: 'https://makemyog.app/og-image.png',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
