import { notFound } from 'next/navigation';
import { propertiesData } from './demo-data';
import { DemoPropertyClient } from './demo-client';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [
    { slug: 'seaside-guesthouse' },
    { slug: 'lakeside-wine-estate' },
    { slug: 'city-apartments' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = propertiesData[slug];
  if (!property) {
    return { title: 'Concept Demo Not Found | WUUS Hospitality' };
  }

  return {
    title: `${property.name} - Live Boutique Hospitality Concept | WUUS`,
    description: `Interactive live demo of ${property.name} in ${property.location}. Direct booking engine, WhatsApp inquiry, 24/7 AI guest concierge, and 0% OTA commission architecture designed by WUUS.`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params;
  const property = propertiesData[slug];

  if (!property) {
    notFound();
  }

  return <DemoPropertyClient property={property} slug={slug} />;
}
