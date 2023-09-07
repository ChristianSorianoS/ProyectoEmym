import { Component, OnInit } from '@angular/core';
import { SOCIALS_URL } from '../common/commonMapper';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  URLS = SOCIALS_URL;
  constructor() { }

  ngOnInit(): void {
  }

}
