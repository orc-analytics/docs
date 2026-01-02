import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function CallToAction(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Join Tier-1 teams using Orca to build domain specific AI on their realtime data.
        </h2>
        <p className={styles.subtitle}>Start building domain specific AI on realtime data</p>
        <a href="/docs/quickstart" className={styles.ctaButton}>
          Get Started
        </a>
      </div>
    </section>
  );
}
