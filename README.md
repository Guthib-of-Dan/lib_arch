# Basic architecture for creating typescript libraries 
## Source
You can write .ts (and index.ts as main) files in "src", build them with "bun run build".  
The support is for ESM and CJS.  
Don't delete the "dist" directory. it must contain esm/package.json with '"type": "module"'
## Testing
### Built source
You can write all tests in "tests/all.ts" or make it import other tests. Tests can be either usign "vitest" or "tsd" in the same file. Bear in mind, that exported (as default export) function runs 4 times (ESM, CJS, and look below)
### Bundled and minified source
ESBuild minifies and bundles ESM and CJS that you have built into local "tmp" directory. "esbuild.test.ts" tests those modules against "all.ts" (2 times). For it to work (currently) src/index.ts should import all other modules within src folder. Change it freely if you need several files separately built and tested.
## Github CI/CD
Each commit to the main branch triggers tests and each "new release" triggers publishing to npm. For this to work you should configure your repo according to "NPM trusted publishing"
