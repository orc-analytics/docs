---
sidebar_position: 1
title: Quickstart Guide
description: Get started developing with Orca. 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will walk you through setting up Orca locally so you can start
building and running custom algorithms on realtime data.

---

## 1 - Check docker is installed

Before installing the Orca CLI we need to check whether docker is installed, as the CLI uses it to spin up supporting services:

```bash
docker --version
```

If you don't have docker - install it following [these instructions](https://docs.docker.com/engine/install/).

## 2 - Install the Orca CLI

Run the following install script:

```bash
curl -fsSL https://raw.githubusercontent.com/orc-analytics/cli/main/install-cli.sh | bash
```

The orca CLI used to provision Orca when developing locally and manage the
Orca lifecyle. All major platforms are supported however the this install
script will only work on Linux, MacOS and Windows via WSL.

Verify the installation with `orca --version`

## 2 - Start the Orca stack

With the CLI installed, launch the Orca stack:

```bash
orca start
```

This command will install necessary docker containers to get Orca running locally.

Verify the Orca systems are running:

```bash
orca status
```

If Orca is not running, try destroying the stack and restarting it:
```bash
orca destroy
orca start
```

## 3 - Initialise a processor 

Once the orca stack is running, you're ready to register your first algorithm
using one of the [SDKs](/docs/category/sdks):

- [Python](/docs/sdks/python)
- [Go](/docs/sdks/go)
- [TS/JS](/docs/sdks/ts)
- [Rust](/docs/sdks/rust)


For this example we will use python, but the pattern is similar language to
language.

Start by creating a new directory:

```bash
mkdir myOrcaProcessor && cd myOrcaProcessor
```

And, within this directory run:

```bash
orca init
```
This will initialise the directory with an `orca.json` configuration file. This
configuration file contains the connection details that the processor needs to connect
to Orca (and vice versa).

Now we're going to initialise a Python project and install the Orca SDK:

<Tabs groupId="package-manager">
  <TabItem value="pip" label="pip" default>
```bash
python -m venv .venv 
source ./.venv/bin/activate
python -m pip install orca-python
touch main.py
```
  </TabItem>
  <TabItem value="poetry" label="Poetry">
```bash
poetry init
poetry add orca-python@latest
touch main.py
```
  </TabItem>
  <TabItem value="uv" label="uv">
```bash
uv venv
source .venv/bin/activate
uv pip install orca-python
touch main.py
```
  </TabItem>
</Tabs>

## 3 - Register a processor

Within the main.py file, define the processor:

```python
from orca_python import (
    Processor,
    WindowType,
    StructResult,
    MetadataField,
    ExecutionParams,
)

# create a processor like this - we're going to give it a name
# that is descriptive of what this processor does
proc = Processor("ml")

asset_id = MetadataField(name="asset_id", description="The unique ID of the asset.")

# this window type is triggered every 30 seconds, and is carries with it
# metadata about an asset (the asset ID)
Every30Second = WindowType(
    name="Every30Second",
    version="1.0.0",
    description="Triggers every 30 seconds",
    metadataFields=[asset_id],
)


# now define the algorithm
@proc.algorithm(name="LinearRegression", version="1.0.0", window_type=Every30Second)
def linear_regression(params: ExecutionParams) -> StructResult:
    """
    A simple function that gets some data, performs a linear
    regression on it, and returns the fit parameters
    """
    # retrieve the asset ID from the triggering window
    asset_id = params.window.metadata.get("asset_id", None)
    _ = asset_id

    # get some data, then perform a fit - we will just stub it out,
    # but it could look something like this:
    #   asset_data_for_window = my_data_func(
    #       params.window.time_from,
    #       params.window.time_to,
    #       asset_id
    #   )
    #   fit_data = perform_fit(asset_data_for_window)

    return StructResult({"m": 10, "c": -1})

if __name__ == "__main__":
    proc.Register()
    proc.Start()
```

The `proc.Register` in the main tag of the file will contact Orca and provide
details of this processor.

The `proc.Start` function will then start serving this processor.

Let's now run this processor:
<Tabs groupId="run-processor">
  <TabItem value="pip" label="pip" default>
```bash
python main.py
```
  </TabItem>
  <TabItem value="poetry" label="Poetry">
```bash
poetry run python main.py
```
  </TabItem>
  <TabItem value="uv" label="uv">
```bash
uv run main.py
```
  </TabItem>
</Tabs>

## 4 - Emit a Window

Now, whilst the processor runs in the background let's create a window emitter
file. Let's create it in the same directory as our processor so that it picks
up the connection details from `orca.json`:

```bash
touch window.py
```

We will also need the `schedule` package to emit the window on a regular cadence:

<Tabs groupId="install-schedule">
  <TabItem value="pip" label="pip" default>
```bash
python -m pip install schedule
```
  </TabItem>
  <TabItem value="poetry" label="Poetry">
```bash
poetry add schedule@latest
```
  </TabItem>
  <TabItem value="uv" label="uv">
```bash
uv add schedule
```
  </TabItem>
</Tabs>

In this file we will construct an instance of our `Every30Second` window an
emit it to Orca:

```python
import time
import datetime as dt

import schedule

from orca_python import Window, EmitWindow

def emitWindow() -> None:
    now = dt.datetime.now()
    window = Window(
        time_from=now - dt.timedelta(seconds=30),
        time_to=now,
        name="Every30Second",
        version="1.0.0",
        origin="Example",
        metadata={"asset_id": 1}, # A dummy ID for now
    )
    EmitWindow(window)

schedule.every(30).seconds.do(emitWindow)

if __name__ == "__main__":
    emitWindow()
    while True:
        schedule.run_pending()
        time.sleep(1)
```

Then let's run it to start emitting some windows:

<Tabs groupId="run-window-emitter">
  <TabItem value="pip" label="pip" default>
```bash
python window.py
```
  </TabItem>
  <TabItem value="poetry" label="Poetry">
```bash
poetry run python window.py
```
  </TabItem>
  <TabItem value="uv" label="uv">
```bash
uv run window.py
```
  </TabItem>
</Tabs>

And let's inspect our emitter and processor logs:

-- Window Emitter
```bash
$ poetry run python window.py
2026-01-03 22:43:04,099 - orca_python.main - INFO - Emitting window: Window(time_from=datetime.datetime(2026, 1, 3, 22, 42, 34, 99232), time_to=datetime.datetime(2026, 1, 3, 22, 43, 4, 99232), name='Every30Second', version='1.0.0', origin='Example', metadata={'asset_id': 1})
2026-01-03 22:43:04,121 - orca_python.main - INFO - Window emitted: status: PROCESSING_TRIGGERED

2026-01-03 22:43:34,130 - orca_python.main - INFO - Emitting window: Window(time_from=datetime.datetime(2026, 1, 3, 22, 43, 4, 130135), time_to=datetime.datetime(2026, 1, 3, 22, 43, 34, 130135), name='Every30Second', version='1.0.0', origin='Example', metadata={'asset_id': 1})
2026-01-03 22:43:34,150 - orca_python.main - INFO - Window emitted: status: PROCESSING_TRIGGERED

2026-01-03 22:44:04,160 - orca_python.main - INFO - Emitting window: Window(time_from=datetime.datetime(2026, 1, 3, 22, 43, 34, 160129), time_to=datetime.datetime(2026, 1, 3, 22, 44, 4, 160129), name='Every30Second', version='1.0.0', origin='Example', metadata={'asset_id': 1})
2026-01-03 22:44:04,178 - orca_python.main - INFO - Window emitted: status: PROCESSING_TRIGGERED
```

Great, we can see windows being emitted to Orca.

-- Processor

```bash
2026-01-03 22:42:57,515 - orca_python.main - INFO - Starting Orca Processor 'ml' with Python 3.13.1 (main, Feb 15 2025, 16:27:20) [GCC 13.3.0]
2026-01-03 22:42:57,515 - orca_python.main - INFO - Initialising gRPC server with 10 workers
2026-01-03 22:42:57,520 - orca_python.main - INFO - Server listening on address 0.0.0.0:5377
2026-01-03 22:42:57,521 - orca_python.main - INFO - Server started successfully
2026-01-03 22:42:57,521 - orca_python.main - INFO - Server is ready for requests
2026-01-03 22:43:04,133 - orca_python.main - INFO - Received DAG execution request with 1 algorithms and ExecId: 1770c55a7f444055b5c94815219ec472
2026-01-03 22:43:04,133 - orca_python.main - INFO - Running algorithm LinearRegression_1.0.0
2026-01-03 22:43:04,134 - orca_python.main - INFO - Completed algorithm: LinearRegression
2026-01-03 22:43:34,164 - orca_python.main - INFO - Received DAG execution request with 1 algorithms and ExecId: 173d4796523e4276bec0815cd0840459
2026-01-03 22:43:34,164 - orca_python.main - INFO - Running algorithm LinearRegression_1.0.0
2026-01-03 22:43:34,164 - orca_python.main - INFO - Completed algorithm: LinearRegression
2026-01-03 22:44:04,196 - orca_python.main - INFO - Received DAG execution request with 1 algorithms and ExecId: 4c0bfa6f11a947119ab34675f57be2fd
2026-01-03 22:44:04,196 - orca_python.main - INFO - Running algorithm LinearRegression_1.0.0
2026-01-03 22:44:04,196 - orca_python.main - INFO - Completed algorithm: LinearRegression
```
And we can see our processor is running the execution request. Congratulations, you've just
built a production ready analytics scheduling engine 🥳.

This simple example demonstrates the baseline capability of Orca to schedule analytics
based off of simple time based triggers. But Orca can do a lot more. 

Check these examples for more complex scenarios:

- Algorithm dependency management
- Multiple processors in the same workspace
- Multiple cross platform processors, with dependencies between them
