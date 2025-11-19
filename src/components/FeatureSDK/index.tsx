import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function FeatureSDK(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.tag}>FEATURES</span>
        <h2 className={styles.title}>Telemetry Metrics Made Easy</h2>
        <p className={styles.description}>
          Orca provides a suite of developer first SDKs to make it easy to wrap business logic 
          defining metrics on telemetry in the code needed to connect it to the Orca control plane.
        </p>
        <p className={styles.description}>
          Once connected, Orca will check the condition of the DAG cross platform at compile time - 
          speeding up algorithm development and decreasing the engineering effort to take analytics to market.
        </p>
        
        <div className={styles.languages}>
          <span className={styles.langBadge}>Python</span>
          <span className={styles.langBadge}>Go</span>
          <span className={styles.langBadge}>TypeScript</span>
          <span className={styles.langBadge}>Rust</span>
        </div>
      </div>
    </section>
  );
}
