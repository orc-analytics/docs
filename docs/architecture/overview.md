---
sidebar_position: 1
id: overview
title: Overview
description: Understand why Orca exists and how it works. Learn about time-based windowing strategies, tradeoffs between availability and accuracy, and Orca's approach to orchestrating real-time analytics at scale.
keywords: [orca architecture, time series processing, windowing patterns, real-time analytics, dataflow model, window orchestration, analytics framework, stream processing, data pipeline architecture]
---

Welcome to **Orca** - the orchestration framework for running analytics on realtime
data, at scale.

Orca was built to solve a problem that the team at [Predixus](https://www.predixus.com)
have seen companies repeatedly struggle with:

> How do you process timeseries data at scale?

The common solution is to build a custom processing framework. But as data throughput increases and the business evolves,
these systems often begin to creak under pressure. That's why we built Orca - to eliminate the engineering burden of
building and maintaining production-grade timeseries analysis pipelines, so teams can focus on what actually creates
value - **the analysis**.

## The Timeseries Pattern

Most data generated from the physical world has two core properties: it evolves over **state**, and it flows **through
time**. Time introduces unique challenges when processing this data at scale. The primary issue is simple but profound:

> Real-world data just keeps arriving.

It’s endless and continuous. So any processing must be both **reliable** and **ongoing**.

A common way to handle this is to define **time windows** - bounded regions over which to run analyses. Each window is
processed independently. This strategy was formalized by Google in the [Dataflow model](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43864.pdf).
However, it introduces tradeoffs between **availability**, **consistency**, and **accuracy**.

Let’s look at two different ways to approach this.

### Low-Frequency Windowing

Imagine a window that triggers only once an event completes. This top-level window (Window Type A) encompasses the full
duration of the event. Once triggered, it identifies subregions of interest (Window Type B), which may then trigger
further dependent windows (Window Type C).

![Low Frequency Window](/img/low-freq-window.png 'Low Frequency Window')

In this setup, the results from Window Types B and C are only available **after** Window A has been triggered and its
processing completed. But here's the problem: the data required for B and C might already **exist** - it just hasn’t
been processed yet. This introduces **unnecessary latency**.

However, there's a tradeoff:

![Low Frequency Tradeoff](/img/low-freq-tradeoff.png 'Low Frequency Window Tradeoff')

- **Cost efficiency** is high - we process everything in one go.
- **Accuracy** is high - waiting ensures more data is available.
- **Availability** is low - results are delayed until Window A completes.

### High-Frequency Windowing

Now consider a different scheme: Windows are triggered on a fixed schedule (e.g. using CRON), checking frequently
if conditions for downstream windows (Type B and C) are met.

![High Frequency Windows](/img/high-freq-window.png 'High Frequency Windows')

Under this strategy, results are produced as soon as possible - often before the full event has concluded.

![High Frequency Tradeoff](/img/high-freq-tradeoff.png 'High Frequency Window Tradeoff')

- **Availability** is high - results are produced quickly.
- **Accuracy** may be lower - not all necessary data may have arrived.
- **Cost efficiency** is lower - constant polling and frequent computation are expensive.

---

Both approaches are valid and should be chosen based on your business requirements. The key insight is this:

> The way you structure window triggering allows you to **tune** the tradeoff between Availability, Cost, and Accuracy.

Your framework should make this configuration seamless. **That’s exactly what Orca is designed to do.**

## Orca's Approach

To support this flexibility, Orca takes an opinionated but practical stance:

- A **separate orchestrator** to manage window triggering
- Full **user control** over how windows are defined and what algorithms run on them
- Transparent **dependency management** between different analytics layers

### Separate Orchestrator

Orca decouples the orchestration logic from your analytics code. This separation allows for consistent scheduling,
triggering, and coordination of window-based processing - regardless of the underlying business logic or data model.

### User Control

You define the window types. You decide how and when they are triggered. And you specify which algorithms depend
on them. Orca provides a simple yet powerful API to make this process intuitive and repeatable.

### Dependency Management

Analytics often depend on the results of prior computations. Orca lets you declare dependencies between windows and
their outputs, so you can build rich, layered analytical pipelines - without manually wiring together processing
stages or managing execution order.

---

Orca exists to bring order to the chaos of real-world data streams - by giving you control over how, when, and
in what order your analytics run.

## Get Started

Orca is built to empower teams to move fast with confidence.

If you're ready to dive in, check out the [Quickstart Guide](/docs/quickstart) to see how to define your first windows,
configure dependencies, and run your first analytics pipeline.
