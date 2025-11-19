import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function FeatureLabeling(): ReactNode {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <span className={styles.tag}>FEATURES</span>
        <h2 className={styles.title}>Build Labels and Train AI Faster</h2>
        <p className={styles.description}>
          High-quality, domain-specific AI models are built on a deep understanding of the data. 
          This requires a sufficient volume of decision-grade metrics and expertly informed labels.
        </p>
        <p className={styles.description}>
          The Orca UI makes obtaining this easy. It provides a single, integrated environment where 
          your teams can analyse metrics, seamlessly label data based on real-world events, and use 
          that accumulated insight to fine-tune AI models - transforming your raw business data into 
          a source of truly sovereign AI.
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
