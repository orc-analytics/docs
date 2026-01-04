---
title: Product Roadmap
description: Our product development timeline and upcoming features
---

# Product Roadmap

Our roadmap outlines planned features and improvements. Timelines are estimates and may change based on feedback and priorities.

:::info
**Last Updated:** January 2026

Have a feature request? [Open an issue here](https://github.com/orc-analytics/core), in the correct repository:
- The core orchestrator: https://github.com/orc-analytics/core
- The CLI: https://github.com/orc-analytics/cli
- Python SDK: https://github.com/orc-analytics/python-sdk
:::

---

## Recently Shipped

### Q1 2026
- **Cross processor dependencies** - Algorithms can now depend on the result of
algorithms in other processors, where the processors are hosted entirely separately
(or even in a different programming language).

  To aid the DX an `init` and `sync` command has been included in the CLI which will
  initialise an Orca project and then create stubbed versions of the algorithms &
  windows types already stored within Orca. These stubbed algorithms and window types
  can be used as usual when defining new algorithms.

  The `init` command is used to initialise an Orca directory, with an `orca.json`
  configuration file. This file is referenced by the CLI to ensure that when using the
  `sync` command algorithms and window types defined by this processor are not duplicated
  locally.

### 

---

## In Progress (Q1 2026)

### Core Features
- **Processing Backlog** - Kafka esque processing reliability (Due: January)


---

## 📋 Planned

### Q2 2026 (April - June)

**Integration & Automation**
- 📅 **Third-Party Integrations** (April)
  - Slack integration
  - Jira sync
  - Google Workspace connector
  - Zapier support

---

## Future / Under Consideration

These items are being researched but not yet scheduled:

- **Data Caching**:

---


## Our Priorities

1. **Performance** - Every release should be better than the last on our load parameters
2. **Developer Experience** - Every release should enhance the DX and make it easier to build
and deploy custom analytics

---

## FAQs

**Q: Are these dates guaranteed?**  
A: No, this roadmap represents our current plans but dates may shift based on complexity, feedback, and priorities.

**Q: How do you decide what to build?**  
A: We prioritise based on user feedback, business value, technical dependencies, and strategic goals with our design partners.

**Q: Can I request a feature?**  
A: Absolutely! Submit requests directly in [Github](https://github.com/orc-analytics.

---

:::tip
**Stay Updated**  
Subscribe to our newsletter for real-time updates.
:::
