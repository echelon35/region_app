import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kbr-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent {
  env = environment;
  appName: string = this.env.settings.appName;
}
