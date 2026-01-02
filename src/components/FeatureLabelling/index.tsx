import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function FeatureLabeling(): ReactNode {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <span className={styles.tag}>FEATURES</span>
        <h2 className={styles.title}>Build Labels and Train AI <span className={styles.highlight}>Faster</span></h2>
        <p className={styles.description}>
          The Orca Console is the easiest way to build labelled datasets on realtime data. It provides a
          single integrated environment where teams can analyse metrics, label data based on real-world
          events, and leverage those labels to fine-tune AI models.
        </p>
        <p className={styles.description}>
          This transforms your raw data into a source of truly <span className={styles.highlight}>sovereign AI</span>.
        </p>
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Seamless Data Labelling</h3>
            <p className={styles.featureDesc}>
              Capture the nuance of human intuition by annotating data directly within the same 
              environment you use to view and analyse metrics.
            </p>
          </div>
          
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Generate Trustworthy Training Data</h3>
            <p className={styles.featureDesc}>
              Because Orca's iterations are consistent and reproducible, you can build a high-volume, 
              high-quality set of features and labels to train better models.
            </p>
          </div>
          
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Shorten AI Iteration Cycles</h3>
            <p className={styles.featureDesc}>
              The integrated feedback loop allows you to move faster from metric generation to 
              label creation to model fine-tuning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
