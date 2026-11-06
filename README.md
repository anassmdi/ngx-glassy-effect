# NGX Glassy Effect

[![npm downloads](https://img.shields.io/npm/dm/ngx-glassy-effect.svg)](https://npmjs.org/ngx-glassy-effect)
[![npm](https://img.shields.io/npm/l/ngx-glassy-effect.svg)](/LICENSE)

This project is an Angular directive that applies a glassy effect to your html elements.

- V3 : 3rd time's the charm, the V2 was not bad, but it only worked on Chrome & the refractions didn't zoom out until a certain distance as they go further away from the borders so they just disappeared, & refractions on corners broke into pixels not handling antialiasing properly. This time it's using WebGL instead of backdrop-filter giving a clean near-perfect glassy effect (closer to apple's liquid glass), & it supports more browsers like Safari & Mozilla.
- V4 : V3 is perfect, If there's gonna be a v4, it's going to be about glass on top of a glass, say apple ios app-store's navbar when you hover an item & it shows a refraction of the refraction of the background. Feel free to contribute.

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
<!-- Use in your html element as a directive -->
<div class="content" ngxGlassyEffect>
  Hello - Bonjour - مرحبا
</div>
```

> Tip : If your div's text is white & the background behind it is light, give your div a semi-transparent background, like rgba (0, 0, 0, 0.35), to keep your text visible & readable, all without losing the glassy effect.

```css
/* Tip 1 */
.content {
  /* ... */
  color: white;
  background-color: rgb(52 52 52 / 0.2);
}
```

## Demo

V3 demo only :

![Default](/about/preview.gif)

> The source code of the demo is in '/projects/glassy-effect-test'

## Configuration

- If you wish to customize the input values, here's a full description of all the variables :
- NB : Avoid customizing *** inputs unless you know what you're doing.

| Input             | Type                | Default                           | Description                                                                                              |
|-------------------|---------------------|-----------------------------------|----------------------------------------------------------------------------------------------------------|
| refraction        | number              | Height - 10px (if Height < 110px) | The intensity/depth of the refraction displacement map (auto-calculated from element height if omitted). |
| blur              | number              | 0                                 | The backdrop blur intensity factor applied to the substrate beneath the lens.                            |
| radius    ***     | number \| undefined | undefined                         | The corner radius of the glass effect (falls back to the element's computed CSS `border-radius`).        |
| bezel     ***     | number              | 0.7                               | The relative width of the refractive edge bevel transition zone.                                         |
| curvature ***     | number              | 4                                 | The exponential falloff curve exponent used to calculate the lens profile normals.                       |
| ior       ***     | number              | 1.5                               | The Index of Refraction (IOR) determining the degree of light bending through the lens.                  |
| specular  ***     | number              | 0.2                               | The intensity multiplier for the specular rim highlight and edge glow effect.                            |
| specularWidth *** | number              | 1                                 | The crispness and width of the specular rim highlight line.                                              |
| lightAngle ***    | number              | -120                              | The directional angle of the virtual light source in degrees for rim lighting calculations.              |
| invert    ***     | boolean             | false                             | Inverts the lens distortion direction (switching between convex magnification and concave depth).        |
| chroma            | number              | 0.12                              | The chromatic aberration (RGB color splitting) intensity factor across refracted channels.               |

## Contribute

- Contributions, bug reports, and structural feature requests are welcome! Feel free to open an issue or submit a pull request on the official GitHub repository.

## Author

- Anassmdi
- GitHub: @anassmdi
- NPM Package: ngx-glassy-effect
