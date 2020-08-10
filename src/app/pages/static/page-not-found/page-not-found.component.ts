import { DOCUMENT, isPlatformBrowser, } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';

// Soruce code => https://codepen.io/ademilter/pen/hDtpq

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: any,
  ) {

  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const WIDTH = 700;
      const HEIGHT = 500;
      const canvas = this.document.getElementById('canvas') as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      const flickering = () => {
        for (let i = 0; i < pix.length; i += 4) {
          const color = (Math.random() * 255) + 50;
          pix[i] = color;
          pix[i + 1] = color;
          pix[i + 2] = color;
        }
        context.putImageData(imgData, 0, 0);
      };
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      context.fillStyle = 'white';
      context.fillRect(0, 0, WIDTH, HEIGHT);
      context.fill();
      const imgData = context.getImageData(0, 0, WIDTH, HEIGHT);
      let pix = imgData.data;
      pix = imgData.data;
      setInterval(flickering, 30);
    }
  }

}
