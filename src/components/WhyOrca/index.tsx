import React, { type ReactNode } from 'react';
import { 
  Workflow, 
  Activity, 
  Code2, 
  Zap, 
  GitBranch, 
  ShieldCheck 
} from 'lucide-react';
import styles from './styles.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  // Change type to ReactNode to accept the component
  icon: ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps): ReactNode {
  return (
    <div className={styles.card}>
      {/* Uncommented and applied the icon component */}
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

export default function WhyOrca(): ReactNode {
  const features = [
    {
      icon: <Workflow size={32} strokeWidth={1.5} />,
      title: 'No More Juggling Workflows',
      description: 'Orca manages the entire analytics lifecycle freeing you to focus solely on algorithm development and insight generation.',
    },
    {
      icon: <Activity size={32} strokeWidth={1.5} />,
      title: 'Timeseries Support',
      description: 'Designed for Realtime data, Orca is a first-in-class tool for applying custom analysis on realtime data.',
    },
    {
      icon: <Code2 size={32} strokeWidth={1.5} />,
      title: 'Developer First',
      description: 'Lightweight and idiomatic SDKs connect your code in Python, Go, Javascript or Rust, to the control plane.',
    },
    {
      icon: <Zap size={32} strokeWidth={1.5} />,
      title: 'Never Miss an Event',
      description: 'Orca is triggered by your business events as they happen. Orca enforces data freshness guarantees.',
    },
    {
      icon: <GitBranch size={32} strokeWidth={1.5} />,
      title: 'Full Lineage and Audit Ready',
      description: 'Orca provides end-to-end lineage of your analytics and delivers clear cost attribution across all algorithms.',
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: 'Iterate with Confidence',
      description: 'Orca enforces stable, versioned interfaces for all metrics. This makes every change reviewable, reproducible, and safe.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Why Orca?</h2>
        <p className={styles.sectionSubtitle}>Build analytics that follow your intuition</p>
        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
