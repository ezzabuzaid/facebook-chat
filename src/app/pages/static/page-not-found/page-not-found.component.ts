import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';

// Soruce code => https://codepen.io/ademilter/pen/hDtpq

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements AfterViewInit {

  constructor(
    private router: Router
  ) { }

  ngAfterViewInit() {
    const flickering = () => {
      for (let i = 0; i < pix.length; i += 4) {
        let color = (Math.random() * 255) + 50;
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

    let flickerInterval: NodeJS.Timeout;
    pix = imgData.data;
    flickerInterval = setInterval(flickering, 30);

  }

}
