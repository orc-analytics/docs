import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function CallToAction(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Join Tier-1 teams using Orca to build domain specific AI on their telemetry data.
        </h2>
        <p className={styles.subtitle}>Start your journey now.</p>
        <a href="#" className={styles.ctaButton}>
          Get Started Free
        </a>
      </div>
    </section>
  );
}
