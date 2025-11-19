import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function Hero(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Build Analytics on Telemetry Data, <span className={styles.highlight}>Fast</span>
        </h1>
        <p className={styles.subtitle}>
          Data to AI in Days, not Months
        </p>
        <div className={styles.cta}>
          <a href="#pricing" className={styles.primaryButton}>
            Get Started
          </a>
          <a href="#features" className={styles.secondaryButton}>
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
