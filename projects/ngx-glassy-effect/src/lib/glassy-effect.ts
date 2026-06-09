import { DestroyRef, Directive, ElementRef, inject, input, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[ngxGlassyEffect]',
  standalone: true
})
export class GlassyEffect {

  /**
   * This class has been generator with the help of AI.
   **/

  private el = inject(ElementRef<HTMLElement>);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  bezel = input<number>(10);
  scale = input<number>(50);
  blur = input<number>(1.5);
  profile = input<'circle' | 'squircle'>('squircle');
  showBorder = input<boolean>(false);

  private width = signal<number>(0);
  private height = signal<number>(0);

  private filterId = `glassy-effect-${Math.random().toString(36).substring(2, 9)}`;
  private resizeObserver!: ResizeObserver;

  private sharedCanvas = this.isBrowser ? document.createElement('canvas') : null;
  private borderLayer: HTMLDivElement | null = null;
  private animationFrameId: number | null = null;

  constructor() {
    if (!this.isBrowser) return;

    this.setupResizeObserver();

    effect(() => {
      const w = Math.floor(this.width());
      const h = Math.floor(this.height());
      const bezel = this.bezel();
      const scale = this.scale();
      const blur = this.blur();
      const profile = this.profile();

      if (w === 0 || h === 0) return;

      const nativeEl = this.el.nativeElement;
      const computedStyle = window.getComputedStyle(nativeEl);

      const maxPossibleRadius = Math.min(w / 2, h / 2);
      const rawRadius = parseFloat(computedStyle.borderRadius) || 0;
      const borderRadius = Math.min(rawRadius, maxPossibleRadius);

      const dataUrl = this.generateDisplacementMap(w, h, bezel, profile, borderRadius);
      this.syncSvgFilter(dataUrl, w, h, scale, blur);

      nativeEl.style.backdropFilter = `url(#${this.filterId})`;

      if (this.showBorder()) {
        this.applyBorderLighting();
      } else if (this.borderLayer) {
        this.borderLayer.remove();
        this.borderLayer = null;
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

      const svgEl = document.getElementById(`svg-container-${this.filterId}`);
      if (svgEl) svgEl.remove();
    });
  }

  private applyBorderLighting(): void {
    const nativeEl = this.el.nativeElement;

    const computedStyle = window.getComputedStyle(nativeEl);
    if (computedStyle.position === 'static') {
      nativeEl.style.position = 'relative';
    }

    nativeEl.style.border = 'none';
    nativeEl.style.boxShadow = `
      0 4px 20px -2px rgba(0, 0, 0, 0.4),
      0 1px 3px 0 rgba(0, 0, 0, 0.2)
    `;

    if (!this.borderLayer) {
      this.borderLayer = document.createElement('div');
      this.borderLayer.style.position = 'absolute';
      this.borderLayer.style.inset = '0px';
      this.borderLayer.style.pointerEvents = 'none';
      this.borderLayer.style.zIndex = '1';
      this.borderLayer.style.webkitMask = 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)';
      this.borderLayer.style.webkitMaskComposite = 'xor';
      this.borderLayer.style.maskComposite = 'exclude';
      this.borderLayer.style.padding = '1px';
      nativeEl.appendChild(this.borderLayer);
    }

    this.borderLayer.style.borderRadius = computedStyle.borderRadius || 'inherit';
    this.borderLayer.style.opacity = '0.85';
    this.borderLayer.style.background = `
      linear-gradient(135deg,
        rgba(255, 255, 255, 0.45) 0%,
        rgba(255, 255, 255, 0.05) 45%,
        rgba(0, 0, 0, 0) 60%
      ),
      linear-gradient(to bottom,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(0, 0, 0, 0.35) 100%
      )
    `;
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

      this.animationFrameId = requestAnimationFrame(() => {
        const rect = this.el.nativeElement.getBoundingClientRect();
        this.width.set(rect.width);
        this.height.set(rect.height);
      });
    });
    this.resizeObserver.observe(this.el.nativeElement);
  }

  private generateDisplacementMap(
    w: number,
    h: number,
    bezel: number,
    profile: 'circle' | 'squircle',
    borderRadius: number
  ): string {
    const canvas = this.sharedCanvas;
    if (!canvas) return '';

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const distL = x;
        const distR = w - x;
        const distT = y;
        const distB = h - y;

        let minDist = Math.min(distL, distR, distT, distB);
        let nx = 0;
        let ny = 0;

        if (minDist === distL) nx = 1;
        else if (minDist === distR) nx = -1;
        else if (minDist === distT) ny = 1;
        else if (minDist === distB) ny = -1;

        if (x < borderRadius && y < borderRadius) {
          const dist = Math.sqrt(Math.pow(borderRadius - x, 2) + Math.pow(borderRadius - y, 2));
          minDist = borderRadius - dist;
          if (dist > 0) {
            nx = (borderRadius - x) / dist;
            ny = (borderRadius - y) / dist;
          }
        } else if (x > w - borderRadius && y < borderRadius) {
          const dist = Math.sqrt(Math.pow(x - (w - borderRadius), 2) + Math.pow(borderRadius - y, 2));
          minDist = borderRadius - dist;
          if (dist > 0) {
            nx = -(x - (w - borderRadius)) / dist;
            ny = (borderRadius - y) / dist;
          }
        } else if (x < borderRadius && y > h - borderRadius) {
          const dist = Math.sqrt(Math.pow(borderRadius - x, 2) + Math.pow(y - (h - borderRadius), 2));
          minDist = borderRadius - dist;
          if (dist > 0) {
            nx = (borderRadius - x) / dist;
            ny = -(y - (h - borderRadius)) / dist;
          }
        } else if (x > w - borderRadius && y > h - borderRadius) {
          const dist = Math.sqrt(Math.pow(x - (w - borderRadius), 2) + Math.pow(y - (h - borderRadius), 2));
          minDist = borderRadius - dist;
          if (dist > 0) {
            nx = -(x - (w - borderRadius)) / dist;
            ny = -(y - (h - borderRadius)) / dist;
          }
        }

        let magnitudeClamp = 0;

        if (minDist > 0 && minDist < bezel) {
          const t = minDist / bezel;
          const factor = 1 - t;

          if (profile === 'circle') {
            magnitudeClamp = Math.sin(factor * Math.PI / 2) * 0.45;
          } else {
            magnitudeClamp = Math.pow(Math.sin(factor * Math.PI / 2), 2) * 0.45;
          }
        }

        const rVal = Math.floor(128 + nx * magnitudeClamp * 127);
        const gVal = Math.floor(128 + ny * magnitudeClamp * 127);

        const idx = (y * w + x) * 4;
        data[idx] = rVal;
        data[idx + 1] = gVal;
        data[idx + 2] = 128;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL();
  }

  private syncSvgFilter(dataUrl: string, w: number, h: number, scale: number, blur: number): void {
    let container: Element | null = document.getElementById(`svg-container-${this.filterId}`);

    if (!container) {
      container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      container.id = `svg-container-${this.filterId}`;
      container.setAttribute('style', 'position: absolute; width: 0; height: 0; pointer-events: none;');
      document.body.appendChild(container);
    }

    container.innerHTML = `
      <filter id="${this.filterId}"
              x="-10%" y="-10%" width="120%" height="120%"
              primitiveUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">

        <feImage href="${dataUrl}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="glass_map" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="${blur}" result="blurred_substrate" />

        <feDisplacementMap
          in="blurred_substrate"
          in2="glass_map"
          scale="${scale}"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    `;
  }
}
