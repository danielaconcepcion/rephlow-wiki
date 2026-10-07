#!/usr/bin/env python3
"""Thin entry point so the build runs from the repo root.

See genetic_engineering_figures/__main__.py for what it does.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from genetic_engineering_figures.__main__ import main  # noqa: E402

raise SystemExit(main())
