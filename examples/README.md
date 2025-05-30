<p align="center">
  <a href="https://www.immutable.com">
    <img src="https://cdn.dribbble.com/users/1299339/screenshots/7133657/media/837237d447d36581ebd59ec36d30daea.gif" width="280"/>
  </a>

  <h2 align="center">Immutable Code Examples</h3>

  <p align="center">
    Immutable's code examples as used for the code snippets in the Immutable Docs
    <br />
    <a href="https://docs.immutable.com"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</p>
<hr />

**Table of Contents**

- [Introduction](#introduction)
- [Running examples locally](#running-examples-locally)
- [Contribution guidelines](#contribution-guidelines)
- [Adding examples](#adding-examples)
- [End to end testing](#end-to-end-testing)
- [Generating examples apps using Cursor](#generating-example-apps-using-cursor)
- [Using code examples in the docs site](#using-code-examples-in-the-docs-site)
- [Generating Tutorials and Metadata with cursor](#generating-tutorials-and-metadata-with-cursor)

<hr />

# Introduction

The example apps in this examples directory are compiled and tested as part of our CI CD pipeline. The goal of this is to ensure the examples found here are always able to run against the latest version of the Immutable Typescript SDK. 

Selected portions of code from these example apps are then displayed as code snippets in our docs site, which means our code snippets in the docs are inherently always accurate as well. How to include the code from here in the docs site is explained below.

These example apps can also be used directly as a reference and run locally to test and develop with.

# Running examples locally

First you need to clone or fork the `ts-immutable-sdk` repo. The examples are a part of the root workspace and running `pnpm install` from anywhere in the workspace will install the node modules required by the examples to the root `node_modules` directory. By default, the examples pull the latest sdk version from NPM instead of building the SDK locally. 

If you want to run the examples against your local build of the SDK instead, from the project root run;

```bash
# Install node modules
pnpm install

# Build the SDK
pnpm build

# Prepare the built SDK
pnpm prepare:sdk

# Prepare the examples
pnpm prepare:examples

# Update the node modules after preparing the sdk and examples
pnpm install
```

and it will build the SDK first then use that build instead of what is on NPM. This is what our CI CD pipeline does to ensure it's compiling and testing the examples against the latest changes rather than what's already on NPM.

Take a look at the README.md file of the example you want to run e.g. the [Checkout SDK Connect Readme](examples/checkout/sdk-connect-with-nextjs/README.md)

This should include the steps required to run the example. Generally you will need to;

1. Copy the `.env.example` file to `.env` and populate it with the environment variables as per the readme.
1. Then `pnpm install` and `pnpm dev` in the example app directory to run the example.

And the app should be served on https://localhost:3000 unless otherwise stated in the example app.

# Contribution guidelines

This section explains some of the core concepts for how we want to structure the examples so they can be more easily digested in the docs and by our partners.

The goal is to have easy to read, well commented examples that focus on showing how to use a singular feature without being overly long or complicated. They should not include overly opinionated framework implementations as it can make it unclear to the reader what is required and what is optional. They should be compilable and tested with e2e tests as much as is practical.

In the long run we want these apps to run in a code blitz frame inside the docs site much like on the [Checkout Connect Widget](https://docs.immutable.com/products/zkEVM/checkout/widgets/connect#sample-code) docs page. So aim to create an example which can be runnable like this.

We also want to eventually index these examples and serve them in a searchable and filterable page on the docs site, so feel free to add more examples here which are not necessarily used as code snippets in the docs site.

## Examples scope

When creating an example app it should contain only examples about one particular feature to prevent overloading the example. If there are multiple ways to use the feature then it is okay to include those in one example app.

For example, the  [Checkout SDK Connect](/examples/checkout/sdk-connect-with-nextjs) app shows how to connect checkout in the NextJS framework. 

It contains a default route that has links to each of the examples. Inside there is just one route, showing how to connect with Metamask. If we wanted to show how to connect with Passport or Wallet Connect we would make new routes in this example app for each. These are okay to be part of one example app since they show how to use one feature but using 3 different libraries.

If you want to show a different feature e.g switching networks, you should create a new example app. Even though it also requires checkout to connect you should not add the switching example to the connect example app to prevent overloading.

## Folder structure

Each product should have its own folder inside examples, and the examples for that product should be flatly arranged inside that folder, do not nest the examples deeper than this.

Each example app folder inside the product folder be named as `<feature>-with-<framework>`

Then if your example has multiple routes because there are multiple ways to use that feature e.g. you need to show how to use the feature using multiple libraries, then you should name your routes `<feature>-with<library>`.

eg.

```
examples
├── passport
│   ├── wallets-connect-with-nextjs
│   │   └── src
│   │       └── app
│   │           ├── page.tsx
│   │           ├── connect-with-eip1193
│   │           ├── connect-with-etherjs
│   │           └── connect-with-wagmi
│   └── wallets-signing-with-nextjs
│   │   └── src
│   │       └── app
│   │           ├── page.tsx
│   │           ├── sign-with-eip712
│   │           └── sign-with-erc191
│   └── ...
├── checkout
│   ├── sdk-connect-with-nextjs
│   │   └── src
│   │       └── app
│   │           ├── page.tsx
│   │           └── connect-with-metamask
│   └── ...
└── ...
```

# Adding examples

Depending on the scope of the example you're trying to add, you may be able to add it to an existing example app, or you might have to create a new example app. If you're not sure, read the [Examples Scope](#examples-scope) section above to help you decide.

If you need to add a new example or add to an existing example, please follow the [Folder Structure](#folder-structure) guidelines above.

## Add to an existing example app

The process may differ depending on how the example app is setup, but the recommendations we have made around creating a new example should follow the same structure as we've implemented for the [Checkout SDK Connect](/examples/checkout/sdk-connect-with-nextjs) example.

So if you need to add a new example to an existing example app you should create a branch in `ts-immutable-sdk` to add your example to and follow these steps;

### Setup example in existing app

1. Create new route folder inside the example app and add the `page.tsx` file.
1. Add the new route you created to the app's home page
1. Add any packages you require
1. Add any environment variables your example requires to the `.env.example` file
1. Add instructions in the `README.md` file about how to populate the `.env` file and any other build instructions.

### Add your example

Once you've done this you can go ahead and write your example code in the `page.tsx` file.

You can run the example locally to test your code by following the steps in the [Running examples locally](#running-examples-locally) section.

You will also need to create e2e tests for your example as covered in the [End to end testing](#end-to-end-testing) section.

Creating code snippets in the docs site using your example code is covered in the [Using code examples in the docs site](#using-code-examples-in-the-docs-site) section.

If your code example is going to be used as code snippets in the docs site, before merging your branch to main in `ts-immutable-sdk` you should follow the steps in [Using code examples in the docs site](#using-code-examples-in-the-docs-site). These steps help you to test the code snippets in the docs site before you merge your PR which avoids double handling and multiple pull requests across both repos.

## Creating a new example app

The process may differ if you're using a different Javascript Framework, but this assumes you will be creating a new example app using NextJS. These steps which were implemented to create the [Checkout SDK Connect](/examples/checkout/sdk-connect-with-nextjs) example. It is a good reference point in terms of route structure and page layouts. If you need to copy code from there to help with your layouts then please go ahead.

### Setup example app

If you want to make a new NextJS app from scratch this is the process;

Create a branch in `ts-immutable-sdk` to add your example to.

In the console navigate to the product directory where your example will live (or create one if it doesn't exist). Then use `pnpm dlx` to create the app.
```bash
cd examples/<product>
pnpm dlx create-next-app@latest
```

use the default options, except don't use Tailwind CSS;
```bash
✔ What is your project named? @examples/<product>/<feature>-with-<framework> e.g. @examples/checkout/sdk-connect-with-nextjs
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … No
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? No
```

Note that the newly created example will be a part of the root pnpm workspace. This will ensure that the example will correctly be built, linted and tested as part of the CI CD pipeline to verify it is always working with the latest SDK version.

Install `@imtbl/sdk` and any other dependencies your example needs e.g.

```bash
pnpm add @imtbl/sdk
pnpm add @biom3/react
pnpm add ethers@^6.13.4
```

You should use `@biom3/react` to style your app so it matches the immutable branding. A good example of how to use Biome can be found in the [Checkout SDK Connect](/examples/checkout/sdk-connect-with-nextjs) example.

The main things to remember is to create an [App Wrapper component](examples/checkout/sdk-connect-with-nextjs/src/app/utils/wrapper.tsx) which adds the Biome Providers. Then make sure you wrap your app in the wrapper component in the [Layout component](examples/checkout/sdk-connect-with-nextjs/src/app/layout.tsx). You can simply copy the same setup linked above then you should be able to access and display all the Biome components you want in your pages.

Create a `.env.example` file in the root of the example. This will be committed to git so don't fill in the values

Add a template for any environment variables you need to the `.env.example` file e.g.

```js
NEXT_PUBLIC_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLIENT_ID=
```

Copy the `.env.example` file to `.env` in the root of the example (the `.env` file should be automatically ignored by git). Then populate any API keys and secrets you need to use in your application into the `.env` file.

Note: variables must be prefixed with `NEXT_PUBLIC_` to be piped into the browser env.

Update the readme with any instructions required to run the app, and include what required env variables there are with any instructions on what to populate there e.g.

```md
## Required Environment Variables

- NEXT_PUBLIC_PUBLISHABLE_KEY // replace with your publishable API key from Hub
- NEXT_PUBLIC_CLIENT_ID // replace with your client ID from Hub
```

Delete the any unused imports in `app/page.tsx`

Delete the contents of the return statement in `app/page.tsx` and replace with `<h1>My Example<h1/>` or whatever you like, just render something to the screen so you can tell its working when you run the app.

Start the project with hot reloading by running;

```bash
pnpm dev
```

Check `http://localhost:3000/` in the browser to confirm it compiled and ran

Update the title and description in `app/layout.tsx` to match the examples in your app e.g.

```ts
export const metadata: Metadata = {
  title: "Checkout SDK - Connect",
  description: "Examples of how to connect using the Checkout SDK with NextJS",
};
```

Create a home page for your example app with links to all the examples in `src/app/page.tsx` e.g. [Checkout SDK Connect Home](/examples/checkout/sdk-connect-with-nextjs/src/app/page.tsx)

Create a route for each example using the naming convention `<feature>-with-<library>` e.g. `wallets-with-etherjs`

### Add your example

Once you've done this you can go ahead and write your example code in the `page.tsx` file in your examples route.

You can run the example locally to test your code by following the steps in the [Running examples locally](#running-examples-locally) section.

You will also need to create e2e tests for your example as covered in the [End to end testing](#end-to-end-testing) section.

Creating code snippets in the docs site using your example code is covered in the [Using code examples in the docs site](#using-code-examples-in-the-docs-site) section.

If your code example is going to be used as code snippets in the docs site, before merging your branch to main in `ts-immutable-sdk` you should follow the steps in [Using code examples in the docs site](#using-code-examples-in-the-docs-site). These steps help you to test the code snippets in the docs site before you merge your PR which avoids double handling and multiple pull requests across both repos.

# End to end testing

All examples should be covered by basic e2e tests to ensure they at least render the examples. Ideally they would also have e2e tests that prove the functionality that you're trying to show works. Depending on what you're doing in the examples, it may be difficult to e2e test certain things e.g. logging in with Passport or connecting with Metamask. For this reason, testing of functionality with e2e testing is recommended if practical, but not required.

Install `@playwright/test@^1.45.3` as a dev dependency for the e2e tests.

```bash
pnpm add -D @playwright/test@^1.45.3
```

Create a `playwright.config.ts` file in the root of the example app and add this configuration;

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: "80%",
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },

    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
  ],

  webServer: {
    command: "pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

Make sure you update the localhost urls `http://localhost:3000` in the above example to be the correct port for your local environment.

Create a `tests` directory in the root of the example app and start adding tests.

Example of the base level of testing required can be found in the [Checkout SDK Connect e2e Tests](/examples/checkout/sdk-connect-with-nextjs/tests/base.spec.ts) spec file.

Add the test runner to the scripts in your package.json

```json
"test": "playwright test"
```

Install the playwright browsers

```bash
pnpm playwright install   
```

Run your tests

```bash
pnpm test
```

# Generating example apps using cursor

1) Open the product folder under /examples/{product}/_prompts

2) Under the {product}/_prompts directory, open the example-app-2-add-feature.txt file.

3) Copy all of the content in the example-app-2-add-feature.txt file.

4) Paste it on to Cursor. Make sure that you're using Agent mode and the model to be used is Claude 3.7 (Thinking)

5) After pasting the prompt, in the chat window you can type: 
app name: <app name(if exists)>
feature name: <name of the feature>
and cursor will generate the feature page in the given app.

6) To update an existing feature, the prompt will identify if the given <feature name> exists in the <app name> directory. If it does, it will check if 
the <feature name> has the manually-edited field value as true in the feature.json file.

7) If the flag above exists, it will ask for a confirmation, otherwise, it will use best practices to update the existing feature page.

8) Once the feature page is completed, under the same directory as example-app-2-add-feature.txt, open example-app-3-fix-ui.txt and copy all of its contents.

9) Paste it on to a new Cursor window and in the chat window you can type: 

feature name: <name of the feature>

Here, cursor will check and fix pages with styling issues to ensure that it looks consistent with other example apps.

10) Once the styling changes have been made, under the same directory as example-app-2-add-feature.txt, open example-app-4-testing.txt and copy all of its contents.

11) Paste it on to a new Cursor window and in the chat window you can type: 
app name: <app name(if exists)>
feature name: <name of the feature>

12) Cursor will then run tests and build until everything passes and renders properly.

13) When the prompt is done running, make sure to double check if the tests are comprehensive enough and also check if the feature page was built properly using best practices.

14) Run `pnpm dev` and check every page's styling. If something looks off, you can manually fix it.

## If an App Doesn't Exist Yet

You must create the app first by going to the example-app-1-create-app-template.txt file and paste it on to Cursor's chat window and use Agent Mode + Claude 3.7 Sonnet Thinking.

In the chat window, type in:
feature name: <name>

Then Cursor will build out the example app's setup, etc.
IF Cursor doesn't run build at the end, manually type on the chat window 'run build'.

IMPORTANT: For any prompts, if cursor is not done with its operations but it has reached 25 tool calls, you will need to manually type "continue" on the chat window for cursor to continue building.

## Understanding the Prompt Files

The example generation process uses three different prompt files, each with a specific purpose:

### example-app-1-create-app-template.txt
- **Purpose**: Creates the initial app structure and boilerplate
- **When to use**: Only when you need to create a completely new example app
- **What it does**: Sets up the project structure, configuration files, basic components, and placeholder pages
- **Output**: A functioning but minimal app with no implemented features

### example-app-2-add-feature.txt
- **Purpose**: Implements or updates a specific feature within an existing app
- **When to use**: After creating an app with example-app-1-create-app-template.txt, or when adding/updating features
- **What it does**: Creates or modifies the feature implementation with proper error handling, UI states, and best practices
- **Output**: A fully implemented feature page within the app structure

### example-app-3-fix-ui.txt
- **Purpose**: Apply styling changes to the given example app if possible to ensure styling consistency with other example apps
- **When to use**: After running example-app-2-add-feature.txt to implement a feature
- **What it does**: Modifies the example app's UI/UX to ensure that the app looks consistent with other example apps
- **Output**: A fully implemented feature page within the app structure with consistent UI/UX looks.

### example-app-4-testing.txt
- **Purpose**: Tests, validates, and fixes issues in the implementation
- **When to use**: After running example-app-2-add-feature.txt to implement a feature
- **What it does**: Runs tests, checks coverage, builds the app, and fixes any detected issues
- **Output**: A tested, validated feature ready for use

**Typical Workflow:**
1. Use example-app-1-create-app-template.txt to create a new app (only once per app)
2. Use example-app-2-add-feature.txt to implement each feature in the app
3. Use example-app-3-fix-ui.txt to fix the app's UI/UX styling and make it look consistent to other example apps.
4. Use example-app-4-testing.txt after each feature implementation to test and validate
5. Once you've generated the example app or feature, you should manually review the implementation and the UI. It's likely you will need to make some manual adjustments to get the app to function and look like our other example apps because the cursor can not reliably get it 100% correct. 
6. Once you're happy with your example app or feature, you need to [re-run the tutorial generation prompt](#generating-tutorials-and-metadata-with-cursor) for your example app before creating your PR so the new example app or feature is piped into the docs site with it's corresponding tutorial.

# Using code examples in the docs site

Creating and using code snippets is relatively straight forward. You can pull in a whole file or by adding some comments you can pull in just a particular few lines of a file as necessary.

To streamline the PR process, you should create a branch in the `docs` repo to add your code snippets before your branch for the code example in `ts-immutable-sdk` is merged to main. This way we can point the docs site to your branch for the code snippets and you can see your code example in situ and make any changes required to your code example before going through the PR process.

## Update import code branch

In your `docs` branch modify the file `/src/remark/import-code.mjs` and update the `BRANCH` constant from `main` to the name of your branch on `ts-immutable-sdk` e.g.

```ts
const BRANCH = 'DVR-173-checkout-sdk-example';
```

Now your `docs` branch will be pulling the code examples from your branch in `ts-immutable-sdk` and you can use them locally in your `docs` branch to make sure they make sense in the page.

⚠️ ⚠️ ⚠️ **IMPORTANT** ⚠️ ⚠️ ⚠️

Make sure to change the branch back to `main` before merging your `docs` branch or it will **BREAK** the docs site.

## Creating code snippets

In your code examples in `ts-immutable-sdk` find the parts of the code you want to use as code snippets and wrap them in the `#doc` and `#enddoc` comments while providing a label.

Labels have to be unique within a file so you should use a simple naming convention to avoid clashes within the file e.g.

```ts
// #doc connect-metamask-provider
// Get the current network information
const connectRes = await checkoutSDK.connect({
  provider: providerRes.provider
});
// #enddoc connect-metamask-provider
```

Make sure to commit and push the labels to your `ts-immutable-sdk` branch on GitHub so they can be pulled down into your `docs` local build from there.

## Using code snippets

It's very simple to use the code snippet in the docs site, you just add a code block with the reference to the file and the `#` of the label you want to display e.g.

````md
```tsx reference=examples/checkout/sdk-connect-with-nextjs/src/app/connect-with-metamask/page.tsx#get-wallet-allow-list title="Get the wallet allow list"
```
````
Or if you want to display the whole file just don't include a `#` label at the end of the file reference e.g.

````md
```tsx reference=examples/checkout/sdk-connect-with-nextjs/src/app/utils/setupDefault.ts title="Default setup"
```
````

Just like regular code snippets, you can set language for syntax highlighting by adding it's alias directly after the opening backticks. In the above example we are setting the syntax highlighting to be for `tsx`. For more information on syntax highlighting, visit the [GitHub Documentation](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks).

Some popular syntaxes you are likely to want to use syntax highlighting for are;

| Language   | Alias | 
|------------|-------------|
| Javascript | js |
| Typescript | ts |
| Typescript with JSX | tsx
| Solidity | solidity |
| C# | csharp |
| C++ | cpp |

For the full list of supported syntaxes and their aliases [Linguist's languages YAML file](https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml).


The other available parameters are;

| parameter  | type    | description |
|------------|---------|-------------|
| reference  | string  | the location of the code example file in the `ts-immutable-sdk` with optional `#` label of the snippet |
| title      | string  | the title that will appear above the code snippet block in the docs website |
| githubLink | boolean | true by default, set to false to hide the link to file on GitHub in the header |

Make sure the language and parameters are all set on the first line of the code snippet otherwise it will display the text as a regular inline code snippet.

## Finishing up

Once you're happy with your code examples on `ts-immutable-sdk` and you've tried them locally in the `docs` site from your branch on Github. Create a PR for your code examples branch in `ts-immutable-sdk` and get it merged to main. 

Now in your `docs` branch change the `BRANCH` constant in the `/src/remark/import-code.mjs` file from your branch name, back to `main`. 

You can now double check the code snippets in your `docs` branch are all pulling through correctly from main on `ts-immutable-sdk` and create the PR for your `docs` branch.

Once your `docs` PR is merged, Netlify should automatically build and deploy the docs site. If your updates are not reflected on the docs site within 10 minutes of the PR being merged, it's likely the build has failed in Netlify. Because we are now pulling in content dynamically for the code snippets, the GET requests to fetch the code examples can sometimes randomly timeout which fails the build. 

If this happens you will need to log into the Netlify site, check the error and retry the build. Usually this will fix the deployment issue, otherwise follow up on the error message shown by Netlify.

# Generating tutorials and metadata with cursor

Whenever you add a new example app, or update an existing example app, you can use the prompts in the `tutorial-generation-generic.txt` OR `tutorial-generation-{product}.txt` files in each `examples/product/_prompts` folder to generate the tutorials and metadata for the example apps using Cursor AI.

These AI generated tutorials and metadata files are then piped through to the docs site in the CI/CD pipeline, where they are used to display the example apps and their code walkthroughs. If you don't follow these steps, your example app will not be displayed on the docs site.

There is a single prompt for each product as we expect the examples to follow a similar structure and format, therefore the prompt to generate the tutorials and metadata is the same for each product. You can specify which example app you want the prompt to generate the tutorials and metadata for by adding the app name to the prompt as shown below.

These prompts are designed to be used with Cursor IDE Composer Agent mode.

Follow these steps to generate the tutorials and metadata for the example apps:

1. Delete the existing tutorial.md and metadata.json files in the example app you are wanting to generate the tutorials and metadata for.
2. Open the Composer window in Cursor IDE (Claude 3.7-sonnet-thinking).
3. Press the `+` button clear the context of the composer window.
4. Open the `tutorial-generation-generic.txt` OR `tutorial-generation-{product}.txt` file in the examples/product/_prompts folder you are wanting to generate the tutorials and metadata for e.g. `examples/passport/_prompts/tutorial-generation-generic.txt`.
5. Copy and pate the prompt into the composer window, or attach it as a file.
6. After adding the prompt, in the composer window, type `app name: <name of the example app>` e.g. `app name: login-with-nextjs` where the app name is the folder name of the example app in the examples/product folder you are wanting to generate the tutorials and metadata for.
7. Press enter and let the AI generate the tutorials and metadata.
8. Review the generated tutorials and metadata.
9. If you're happy with the generated tutorials and metadata, you can commit and push the changes to your branch in the `ts-immutable-sdk` repo.

Once you have merged your branch into main, the tutorials and metadata will be automatically piped to the docs site and displayed in the example apps section.