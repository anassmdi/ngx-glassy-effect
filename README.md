# NGX Glassy Effect

[![npm downloads](https://img.shields.io/npm/dm/ngx-glassy-effect.svg)](https://npmjs.org/ngx-glassy-effect)
[![npm](https://img.shields.io/npm/l/ngx-glassy-effect.svg)](/LICENSE)

This project is an Angular directive that applies a glassy effect to your html elements.

## Installation

```shell
npm install ngx-glassy-effect --save
```

## Setup

```ts
import { Component } from '@angular/core';
import { GlassyEffect } from 'ngx-glassy-effect';

@Component({
  selector: 'app-root',
  imports: [GlassyEffect], // Imported as directive into your standalone component
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
```

```html
<!-- Use in your html element as a directive, & configure it as your wish -->
<div class="content"
     ngxGlassyEffect
     [blur]="1.5"
     [scale]="50"
     [bezel]="10"
     [profile]="'squircle'"
     [showBorder]="true"
     [lensRange]="100"
     [reflectionMidpoint]="0.2">
  Hello - Bonjour - مرحبا
</div>
```

> Tip 1 **: If your div (.content for example) text is white & the background behind the div is light, give your div a semi-transparent background, like rgba(0, 0, 0, 0.35), to keep your text visible & readable, all without losing the glassy effect.

```css
/* Tip 1 */
.content {
  /* ... */
  color: white;
  background-color: rgb(52 52 52 / 0.2);
}
```

> Tip 2 : If the default borders & shadows aren't working for you, you can just remove [showBorder] or make it 'false', & give the element of ngxGlassyEffect the border & shadows you like using css.

```css
/* Tip 2 */
.content {
  /* ... */
  border: turquoise 2px solid;
}
```

## Demo

#### First demo that shows how it reflects so well with any border-radius & any size of the box you're applying it to.

![Default](/about/preview.gif)

#### Another demo with a real-life example, it shows how close the reflection gets to the real apple's ios liquid glass.

![Default](/about/preview2.gif)

> The source code of the demo is in '/projects/glassy-effect-test'

## Configuration

- If you wish to customize the inputs values, here's a full description of all the variables :

| Input              | Type                  | Default   | Description                                                                                         |
|--------------------|-----------------------|-----------|-----------------------------------------------------------------------------------------------------|
| bezel              | number                | 10        | The width of the refractive edge bevel in pixels.                                                   |
| scale              | number                | 50        | The intensity of the glass refraction distortion map.                                               |
| blur               | number                | 1.5       | The backdrop blur intensity factor applied to the substrate.                                        |
| profile            | 'circle' / 'squircle' | 'squircle | The geometric falloff curve used to generate the edge normals.                                      |
| showBorder         | boolean               | false     | Dynamically injects an anti-aliased pseudo-border running a dynamic light-angle alignment gradient. |
| lensRange          | number                | 100       | The spatial scope/influence bounding box of the border lens effect.                                 |
| reflectionMidpoint | number                | 0.2       | The turning midpoint ratio where edge glare achieves peak reflection values.                        |

## Contribute

- Contributions, bug reports, and structural feature requests are welcome! Feel free to open an issue or submit a pull request on the official GitHub repository.

## Author

- Anassmdi
- GitHub: @anassmdi
- NPM Package: ngx-glassy-effect
