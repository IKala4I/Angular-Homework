# Angular Homework

## How to run the application

### Cloning the repository

```bash
git clone https://github.com/IKala4I/Angular-Homework.git
```

### Install packages

```bash
npm i
```

### Start the app

```bash
npm run start
```

## Project structure tree

```lua
|-- src
|   |-- app
|   |   |-- components
|   |   |   |-- pages
|   |   |   |   |-- create-product-page
|   |   |   |   |-- product-detail-page
|   |   |   |   |-- products-page
|   |   |   |-- partial
|   |   |   |   |-- filter-form
|   |   |   |   |-- product-detail
|   |   |   |   |-- product-form
|   |   |   |   |-- product-list
|   |   |   |   |   |-- product-card
|   |   |   |   |-- tag-form
|   |   |   |   |-- tag-list
|   |   |   |   |   |-- tag
|   |   |-- constants
|   |   |   |-- mock-data
|   |   |-- directives
|   |   |-- interfaces
|   |   |-- models
|   |   |-- services
|   |   |-- styles
|   |   |-- utils
|   |   |-- app.component.html
|   |   |-- app.component.scss
|   |   |-- app.component.ts
|   |   |-- app.config.ts
|   |   |-- app.routes.ts
|-- assets
|-- favicon.ico
|-- index.html
|-- main.ts
|-- styles.scss
|-- .editorconfig
|-- .gitignore
|-- angular.json
|-- package.json
|-- README.md
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.spec.json
```

#### Comment

In my services, I used BehaviorSubjects to use it as Observables. The file styles.scss contains global styles to avoid style duplication. I created a page for the product list, and product details and create-product-form. You can manage tags on the product list page. I tried to separate my logic into different components.
