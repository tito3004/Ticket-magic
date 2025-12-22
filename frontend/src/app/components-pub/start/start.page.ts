import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.css'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class StartPage {}
