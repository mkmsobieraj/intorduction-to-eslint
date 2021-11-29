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


`.eslintrc` configuration file supports following extensions 

-`js` 
- `yml`
- `json`


There are three ways to configure ESlint
  
- configuration file (configuration file need to be in included in project or path has to be pass as an argument)
- configuration comments
- directly in package.json in a `eslintConfig` field


ESLint consists of the:

- Environments
- Globals - allowed to configure global variables, by using `globals` property in configuration file
- Parser - allow to specify the JavaScript options
- Rules
- Plugins - npm package that can add many extensions
- Settings - shared settings for all rules


## Priority


1. comments
2. .eslintrc file in the same directory
3. ...
4. top root .eslintrc  file / package.json configuration

<aside class="notes">
If there are .eslintrc  and package.json files on the same level, package.json will be ignored.
If one of .eslintrc file has "root": true property, the searching will be stop ot this file 
All rules from founded .eslintrc are merged
</aside>


## Extending Configuration Files

- configuration file can be extended by using `extends` key word
- value of `extends` could be
  - path to the config file
  - name of sharable config
  - eslint:recommended - most common rules
  - eslint:all - all rules in the currently installed ESLint version
  - array of above, where later configuration extends the preceding one
- The eslint-config- prefix can be omitted from the configuration name.
- The rules from preceding can be added or override


## Sharable configuration

- it is an npm package that exports configuration object
- when it is installed we can includes package by adding it in `extends` property


```JavaScript
// npm i -D eslint-config-example

// .eslintrc
{
    "extends": "example"
}
```


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
- cna be set via comment, cli, configuration file
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


- By default ESLint supports ES5 syntax
- It is set by using `parserOptions` property

```JavaScript
{
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