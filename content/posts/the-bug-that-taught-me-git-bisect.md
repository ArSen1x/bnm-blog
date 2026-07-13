---
title: "The bug that taught me git bisect"
summary: "A regression nobody could reproduce, a 200-commit haystack, and the tool that found the needle in four steps."
date: "2026-07-11"
tags: ["debugging", "git"]
cover: "/covers/first-bug.svg"
featured: false
---

A feature that worked last month suddenly didn't, and nobody knew which change broke it. There were about 200 commits in the window.

## Binary search, but for history

`git bisect` turns "which commit broke this" into a binary search. You mark a known-good commit and a known-bad one, and git checks out the midpoint for you to test.

```bash
git bisect start
git bisect bad                 # current commit is broken
git bisect good v1.4.0         # this release worked
# test, then mark each checkout:
git bisect good   # or: git bisect bad
```

Four checkouts later, it pointed at a one-line change to a date parser. The fix took five minutes. Finding it would have taken hours without this.

## What I'm taking away

Tools that feel "advanced" are often just a shortcut for something you'd do by hand anyway — slowly, and with more mistakes.
