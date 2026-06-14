# NGX Glassy Effect

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

```angular20html
<!-- Use in your html element as a directive, & configure it as your wish -->
<div class="content"
     ngxGlassyEffect
     [blur]="1.5"
     [scale]="50"
     [bezel]="10"
     [profile]="'squircle'"
     [showBorder]="true">
  Hello - Bonjour - مرحبا
</div>
```

> Tip 1 **: If your div (.content for exmp) text is white & the background behind the div is light, give your div a semi-transparent background, like rgba(0, 0, 0, 0.35), to keep your text visible & readable, all without losing the glassy effect.

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

> To see a visual Demo visit the git repository of this project : [Github Repository](https://github.com/anassmdi/ngx-glassy-effect)

## Configuration

- If you wish to customize the inputs values, here's a full description of all the variables :

| Input      | Type                  | Default   | Description                                                                                                  |
|------------|-----------------------|-----------|--------------------------------------------------------------------------------------------------------------|
| bezel      | number                | 10        | The width of the refractive edge bevel in pixels.                                                            |
| scale      | number                | 50        | The intensity of the glass refraction distortion map.                                                        |
| blur       | number                | 1.5       | The backdrop blur intensity factor applied to the substrate.                                                 |
| profile    | 'circle' / 'squircle' | 'squircle | The geometric falloff curve used to generate the edge normals.                                               |
| showBorder | boolean               | false     | When true, renders an integrated semi-transparent pseudo-border with a realistic top-down lighting gradient. |

> Read Tip 1 ** if your ngxGlassyEffect div's text is not showing.
