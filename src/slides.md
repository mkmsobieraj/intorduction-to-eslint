## ESLint

<aside class="notes">
  <code>ESLint</code>
  <ul>
    <li>uses Espree as JavaScript parser</li>
    <li>uses abstract syntax tree, same as <code>babel</code></li>
  </ul>
</aside>

---

## Installing ESLint


```javaScript
// install
npm i -D eslint

// initialize configuration
npm eslint --init

// run on directory
eslint src/
```

---

## Configuration


There are three ways to configure ESlint
  
- configuration file (configuration file need to be included in project or path has to be pass as an argument)
- configuration comments
- directly in `package.json` in a `eslintConfig` field

<aside class="notes">
We will focus mainly on the configuration file.
</aside>


`.eslintrc` configuration file supports following extensions 

- `js` 
- `yml`
- `json`


ESLint's configuration consists of the:

- Environments - target environment for the application (`node`/`browser` etc.)
- Globals - allowed to configure global variables, by using `globals` property in configuration file
- Parser - allow to specify the JavaScript options and parser
- Rules - allow to add/remove/override rules
- Plugins - npm packages that can add many extensions
- Settings - shared settings for all rules
- Processor - processors can extract JavaScript code from other types of files
- code ignoring (`"ignorePatterns"`, `.eslintignore` property)


## Priority


1. comments
2. `.eslintrc` file in the same directory
3. ...
4. top root `.eslintrc` file / `package.json` configuration

<aside class="notes">
<p>If there are .eslintrc  and package.json files on the same level, package.json will be ignored.</p>
<p>If one of .eslintrc file has "root": true property, the searching will be stop on this file.</p>
<p>All rules from founded .eslintrc are merged.</p>
</aside>


## Extending Configuration Files


- configuration file can be extended by using `extends` key word
- value of `extends` could be
  - path to the config file
  - name of sharable config
  - `eslint:recommended` - most common rules
  - `eslint:all` - all rules in the currently installed `ESLint` version
  - *array of above*, where later configuration extends the preceding one
- The `eslint-config-` prefix can be omitted from the configuration name
- The rules from preceding files can be added or override


```JavaScript
// npm i -D eslint-config-example

// .eslintrc
{
    "extends": "example"
}
```


## Sharable Configuration


- it is a npm package that exports configuration object
- when it is installed, we can include package by adding it in `extends` property


## Plugins

```JavaScript
// npm i -D eslint-plugin-react

{
    "plugins": [
        "react" // eslint-plugin can be omitted
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended" // plugin:[plugin-name]/[configuration-name]
    ],
    "rules": {
       "react/no-set-state": "off"
    }
}
```


## Configuration Based on Glob Patterns


Configuration can be overwritten based on glob pattern, by using  `overrides` key.


```JavaScript
{
  ...
  "overrides": [
    {
      "files": ["src/"],
      "excludedFiles": "*.spec.js",
      "rules": {
        ...
      }
    }
  ]
}
```

---

## Environments


- provides global variables
- there is possible to use many environments
- can be set via comment, CLI, configuration file
- it is possible to use environments from plugins 


```
{
    "env": {
        "browser": true,
        "jest": true
    }
}
```


## Parser


- by default ESLint supports `ES5` syntax
- we can set desired properties using `parserOptions` filed


```JavaScript
{
    // default is espree, we need to choose right parser when we want to use typescript for example
    "parser": "esprima"
    "env": { "es6": true } // we have to set globals separately
    "parserOptions": {
        "ecmaVersion": "6",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    ...
}
```


## Rules


All rules can be set on one of three levels:
  
  - turn of (`"off"` or `0` in configuration file)
  - turn on as warning (`"warn"` or `1` in configuration file)
  - turn on as error (`"error"` or `2` in configuration file)


 - rules can be modified using configuration comments or configuration file by `"rules"` property
 - when we want to configure additional option of the rule than we pass an array. The first argument is a flag and second additional options
 - rules from plugins has to have plugin prefix 


```JavaScript
/* eslint react/no-set-state: "off", quotes: ["error", "double"] */
```

```JavaScript
{
    "plugins": [
        "react"
    ],
    "rules": {
       "react/no-set-state": "off",
       "quotes": ["error", "double"]
    }
}
```


## `.eslintignore`


- allow ignoring specific files or directories using glob patterns
- need to be in root directory
- paths `.eslintignore` is relative to current directory
- `node_modules/`, files and directories/files starting with `.` are ignored by default


```
# .eslintignore
/src/*.spec.js
```


## `ignorePatterns`


Instead of `.eslintignore` we can also use `"ignorePatterns"` property in `.eslintrc` file


```JavaScript
{
    "ignorePatterns": ["/src/*.spec.js"],
    ...
}
```

---

## CLI


command          |description                              |example
-----------------|-----------------------------------------|-----------------------------------------
-c, --config     |path to the configuration file           |npx eslint -c ~/config.json src/
-fix             |tres to fixes ESLint errors automatically|npx eslint --fix src/
--quiet          |disables warnings                        |npx eslint --quiet src/
-o, --output-file|writes report to file                    |npx eslint -o ./logs/ESLint-report.html src/ 
-f, --format     |output format of eslint report           |npx eslint -f html src/