# single-spa example with Webpack `lazyStyleTag`

This example repo shows a very simple proof of concept that leverages Webpack style-loader's `lazyStyleTag` functionality to dynamically add and remove the CSS associated with a single-spa application.

## How to run

- clone repo
- run `yarn install`
- run `yarn start`
- open browser to http://single-spa-playground.org/playground/instant-test?name=@example/lazy-style&url=3000
  - (single-spa-playground saves previous applications to localStorage, so you might need to clear that or use an incognito tab)

## Explanation

This repo is configured using [Webpack style-loader's `lazyStyleTag`](https://webpack.js.org/loaders/style-loader/#lazystyletag), enabling this behavior only for css files that end with `.lazy.css`.

This demo shows:

- styles are appended to the DOM as part of the application's `mount` lifecycle (which sets the bg color to blue)
- styles are removed from the DOM as part of the application's `unmount` lifecycle (no background set so bg color is white)
  - verify this by using the [single-spa inspector](https://single-spa.js.org/docs/devtools/) to manually mount and unmount the application
- a child may also use lazy styles that are added/removed from the DOM (which sets the background to red)

## Questions

### But what about style conflicts?

**Nothing about single-spa, Webpack, or any single application can change the nature of CSS.** That would require a completely different way of styling on the web. The C in CSS stands for "cascade" and you need to work with it as you would when including multiple stylesheets on a webpage. This is what I wanted to show with the above styles. Styles `use`d later are appended to the bottom of the document head and so CSS cascading rules apply (later rules of the same specifity override previous rules).

That said, many solutions to style conflicts already exist in the web ecosystem. [CSS Modules](https://webpack.js.org/loaders/css-loader/#modules) can be easily enabled with a single Webpack config option. Many/most CSS-in-JS options manage their styles as part of framework lifecycles as well (checkout [Kremling](https://github.com/CanopyTax/kremling) for one such library).

### Can this work with Vue/Angular/Svelte?

_Maybe?_ Much of this is an educated guess without concrete proof (yet). Please feel free to share if you accomplish this with these frameworks.

Vue probably could if you were able to use style-loader; vue-cli internally uses [mini-css-extract-plugin](https://cli.vuejs.org/config/#css-extract) ([Webpack docs](https://github.com/webpack-contrib/mini-css-extract-plugin)) so one would need to remove/disable that in addition to adding style-loader configuration.

Angular might be in a similar situation since it uses Webpack internally, though the rigidity of Angular as a framework/cli make it very hard to work with. It makes many assumptions and does not offer escape hatches so there is very little flexibility.

Svelte cannot because, at the time of this writing, such a plugin does not exist among the [many options](https://github.com/rollup/awesome#css). A new plugin would need to be written. It would have to have [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte) disable/bypass its own CSS behavior (using `emitCss: true` probably) and then another plugin would have to handle converting the CSS into a module that has the `use`/`unuse` functions for use within the application.

### Why not in `bootstrap` lifecycle?

Because `bootstrap` is executed only once when the application is loaded, so they need to be `use`d in `mount` and `unuse`d in `unmount`.
