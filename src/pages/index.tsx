import React, { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Hero from '@site/src/components/Hero';
import WhyOrca from '@site/src/components/WhyOrca';
import FeatureLabeling from '@site/src/components/FeatureLabelling';
import FeatureSDK from '@site/src/components/FeatureSDK';
import FeatureReliability from '@site/src/components/FeatureReliability';
import CallToAction from '@site/src/components/CallToAction';

export default function Home(): ReactNode{
  return (
    <Layout
      title="Data to AI in Days, not Months"
      description="Build Analytics on Realtime Data, Fast, with Orca. Orca manages the entire analytics lifecycle from analysis scheduling to insight generation."
    >
      <Head>
        <meta property="og:title" content="Orca - Stream Data to AI in Days, not Months" />
        <meta property="og:description" content="Build Analytics on Realtime Data, Fast, with Orca. Open-source orchestration framework for running analytics on real-time timeseries data at scale." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orc-a.io/" />
        <meta property="og:image" content="https://orc-a.io/img/orca-social-card.jpeg" />
        <meta name="twitter:title" content="Orca - Stream Data to AI in Days, not Months" />
        <meta name="twitter:description" content="Build Analytics on Realtime Data, Fast, with Orca. Open-source orchestration framework for running analytics on real-time timeseries data at scale." />
        <meta name="twitter:image" content="https://orc-a.io/img/orca-social-card.jpeg" />
        <link rel="canonical" href="https://orc-a.io/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Orca',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Linux, macOS, Windows',
            description: 'Open-source orchestration framework for running analytics on real-time timeseries data at scale. Supports Python, Go, TypeScript, and Rust.',
            url: 'https://orc-a.io',
            author: {
              '@type': 'Organization',
              name: 'Orca',
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            screenshot: 'https://orc-a.io/img/orca-social-card.jpeg',
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://orc-a.io/',
              },
            ],
          })}
        </script>
      </Head>
      <main>
        <Hero />
        <WhyOrca />
        <FeatureLabeling />
        <FeatureSDK />
        <FeatureReliability />
        <CallToAction />
      </main>
    </Layout>
  );
}
