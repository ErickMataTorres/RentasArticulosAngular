import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navvar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navvar.component.html',
  styleUrl: './navvar.component.css'
})
export class NavvarComponent {
  
}
