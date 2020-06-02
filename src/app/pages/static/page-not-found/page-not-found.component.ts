import { AfterViewInit, Component } from '@angular/core';

// Soruce code => https://codepen.io/ademilter/pen/hDtpq

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements AfterViewInit {

  ngAfterViewInit() {
    const flickering = () => {
      for (let i = 0; i < pix.length; i += 4) {
        const color = (Math.random() * 255) + 50;
        pix[i] = color;
        pix[i + 1] = color;
        pix[i + 2] = color;
      }
      context.putImageData(imgData, 0, 0);
    };

    const prepareCanvas = () => {
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      context.fillStyle = 'white';
      context.fillRect(0, 0, WIDTH, HEIGHT);
      context.fill();
    };

    const WIDTH = 700;
    const HEIGHT = 500;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    prepareCanvas();
    const imgData = context.getImageData(0, 0, WIDTH, HEIGHT);
    let pix = imgData.data;
    pix = imgData.data;
    setInterval(flickering, 30);

  }

}
