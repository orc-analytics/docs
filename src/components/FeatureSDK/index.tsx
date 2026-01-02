import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function FeatureSDK(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.tag}>FEATURES</span>
        <h2 className={styles.title}>Telemetry Metrics Made Easy</h2>
        <p className={styles.description}>
          Orca provides a suite of developer first SDKs to deploy custom business
          logic on realtime data. Orca connects to these SDKs to the condition of
          cross platform DAG at compile time - speeding up algorithm development
          and decreasing the engineering effort to take analytics to market.
        </p>
        
        <div className={styles.languages}>
          <a href={"/docs/sdks/python"} className={styles.noDecoration}><span className={styles.langBadge}>Python</span></a>
          <a href={"/docs/sdks/go"} className={styles.noDecoration}><span className={styles.langBadge}>Go!</span></a>
          <a href={"/docs/sdks/typescript"} className={styles.noDecoration}><span className={styles.langBadge}>Typescript</span></a>
          <a href={"/docs/sdks/rust"} className={styles.noDecoration}><span className={styles.langBadge}>Rust</span></a>
        </div>
      </div>
    </section>
  );
}
