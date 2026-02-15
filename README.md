# Basic architecture for creating typescript libraries 
You can fork it as a base for your library or borrow some techniques.  
## Source
You can write .ts (and index.ts as main) files in "src", build them with "bun run build" to dist/esm, dist/cjs, dist/types. package.json is configured so that only "dist" directory is published, so src/tests/tsconfigs.
The support is for ESM and CJS. But to build cjs, you have to build esm first.
## Testing
New update brought a change to how testing is initialized. "tests/abstraction.ts" gives you a function, which lets you easily configure all files you need to test in 4 ways (ESM, CJS, Minified ESM and CJS). In this repo write init at tests/index.test.ts (look at code which is there already).
### Built source
You can write all tests in "tests/all.ts" or make it import other tests.  
You should not export tests with default export.  
Tests can be either usign "vitest" or "tsd" in the same file.  
Exported functions run 4 times overall (dist/esm, dist/cjs and 2 explained below).  
If you want to import your package with the name you used in package.json then you have to trick tsd. Literally. Just run "bun run trick-tsd" and you are good to go (plus if you use "exports" field you need to use "typeVersions" field as well in package.json. Look at current repo's code there)
### Bundled and minified source
ESBuild minifies and bundles ESM and CJS that you have built into local "tmp" directory. It is automated and configured within "tests/abstraction.ts". Whatever your module exports preserves names so tests can be run against "all.ts" (again, this is automated)
## Github CI/CD
Each commit to the main branch triggers tests and each "new release" triggers publishing to npm. For this to work you should configure your repo according to "NPM trusted publishing"
