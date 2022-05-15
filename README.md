# Appointedd TypeScript Programming Challenge

Hi there! 👋

This challenge is designed to allow you to showcase your TypeScript programming skills. There are no requirements apart from the fact that you must use TypeScript. You are welcome to use any libraries you see fit and any online or offline materials to help you program a solution.

Don’t worry if you can’t create a perfect solution. If you write down any shortcomings of your code or if you describe how you would approach the problem we’ll take that into consideration!

## Submission

Please submit your solution via email with either a link to your forked GitHub repository containing your solution or a zip file containing your repository.

Any supplemental notes can be included in your email, the `README.md` file of your repository, or as comments in your code.

## Getting Started

### System Requirements

In order to work on this programming challenge you'll need [Node.js](https://nodejs.org/en/) installed. I recommend at least the latest LTS version which at the time of writing is **14.18.1 LTS**.

### Installation

As with all JavaScript/TypeScript projects the you'll want to install the npm packages after cloning this repository which you can do so by running following in your terminal:

```shell
npm install
```

### Alternative: GitHub Codespaces

If you'd prefer to not install anything on your machine, you can try out [GitHub Codespaces](https://github.com/features/codespaces) which will spin up a development environment along with a browser based version of VSCode in the cloud. You can do this by selecting the green **Code** button and choosing the **Codespaces** tab, then choosing **New codespace** on either this code repository or your own fork of this code repository.

![Screen Recording 2021-10-23 at 21 33 11](https://user-images.githubusercontent.com/21124794/138570852-1f2450d1-02a3-4ebc-a129-de153fd76d72.gif)

### Solving the challenge

In the [src/index.ts](./src/index.ts) file you'll find 3 skeleton functions, one for each of the questions in this challenge, which you'll need to modify to return correct values. Please **do not** change the name of these functions or the input/output types as the solution checkers rely on this being unmodified. You are free to add additional code to this file or create new code files as part of your solution.

This challenge uses a suite of [Jest](https://jestjs.io/) tests to check against input data and verify that the challenge's question functions return the
expected output values. To run these tests and verify your solution you can simply run the following in your terminal:

```shell
npm test
```

Please **do not** remove or modify the existing tests, but you're more than welcome to add additional tests or create new tests files. Any file with that ends with `.test.ts` in the **src** folder will be run by the test command when you run Jest.

You'll find the input files used by the verification tests in the **assets** folder.

## Challenge

This challenge involves answering questions about a dataset that contains data about when one or more workers are available.

### Input Format

Each solver function is given a path to an input file as an argument which you will need to use to read the input data from.

The input data contains each worker and the intervals of time that they are available separated by newlines with the following format:

```
<WORKER_ID>@[<INTERVAL_0>,<INTERVAL_1>,...,<INTERVAL_N>]
```

The `<WORKER_ID>` is a unique non-negative integer that identifies the worker and `<INTERVAL_X>` is an interval where that worker is free. A worker will always have at least one interval, and the intervals will be guaranteed to be continuous, meaning that for each worker none of the intervals that they are available will overlap. Intervals follow the [ISO8601 specification](https://en.wikipedia.org/wiki/ISO_8601).

Here's an example of an input file containing 3 workers, each with a single interval where they are free.

```
1@[2020-01-01T12:00:00.000Z/2020-01-02T12:00:00.000Z]
0@[2020-01-01T18:00:00.000Z/2020-01-01T19:00:00.000Z]
2@[2020-01-02T09:00:00.000Z/2020-01-02T10:00:00.000Z]
```

### Question 1

What is the starting date and time (in UTC) of the earliest interval where any of the workers are free?

### Question 2

What is the ending date and time (in UTC) of the latest interval where any of the workers are free?

### Question 3

What are the intervals of date and times (in UTC) where there are at least 2 workers free? Order your results in ascending order starting from the interval with the earliest start date and time and ensure your results are continuous, merging any overlapping intervals into a single interval where required.
