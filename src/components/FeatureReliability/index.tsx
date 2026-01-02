import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function FeatureReliability(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.tag}>FEATURES</span>
        <h2 className={styles.title}>Production Metrics with Unshakeable Reliability</h2>
        <p className={styles.description}>
          Avoid cascading failures, poor backfills and stale data by handling brittle glue scripts.
        </p>
        <p className={styles.description}>
          Orca orchestrates your pipelines with data freshness guarantees, including backfills
          and retries. This ensures runtime health is enforced at compile time instead of errors
          being thrown after deployment just monitored after the fact.
        </p>
        
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Event-Driven at the Core</h3>
            <p className={styles.featureDesc}>
              Orca listens for your business events and triggers analysis in real-time, 
              eliminating the gaps and collisions of cron-based schedulers.
            </p>
          </div>
          
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Guaranteed Freshness</h3>
            <p className={styles.featureDesc}>
              Freshness is enforced at runtime to ensure your decisions are always based on current data.
            </p>
          </div>
          
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Automated Backfills & Retries</h3>
            <p className={styles.featureDesc}>
              Idempotent backfills and isolated retries prevent cascading failures and ensure 
              data consistency, even when issues occur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
