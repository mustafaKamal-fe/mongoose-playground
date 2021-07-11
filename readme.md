# Monogoose Playground For All?

## How to use?

See project branches.

## How to build node-TS project ASAP?

- Run `npm init` with proper fields naming.
- Now to use `Typescript` we need to install it:

  - `yarn add typescript --dev`
  - Now go ahead and generate a typescript configuration file with basic possible options with `./node_modules/.bin/tsc --init`
  - Uncomment options that seam to be reanoable for your project needs
  - Now install `ts-node` as it will be needed with `nodemon` package later `yarn add ts-node --dev`
  - At this step, we need to extend basic `tsconfig` file that suites my `nodejs` version : `yarn add --dev @tsconfig/node12`. See this repo [https://github.com/tsconfig/bases/] for more options

  - For instant reaoding i use `nodemon` package `yarn add nodemon --dev`
  - Next add `nodemon` configuration file `touch nodemon.json` with below options:
    `{ "watch": ["src"], "ext": "ts", "ignore": ["*.test.ts"], "delay": "3", "execMap": { "ts": "ts-node" } }`

  - Add your dependencies `yarn add mongoose express` & `yarn add @types/mongoose && yarn add @types/express`
  - Finally, Add command script to work with both `TS` and hot reloading using `nodemon`: `"dev": "nodemon ./src/app.ts"`

## Resources

Links: [https://github.com/tsconfig/bases/] [https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript] [https://www.digitalocean.com/community/tutorials/workflow-nodemon]
