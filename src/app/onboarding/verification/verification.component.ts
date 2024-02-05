import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {
  verifyId: any = ""

  constructor(
		private route: ActivatedRoute
	) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.verifyId = params['verifyId'];
      console.log(this.verifyId)
    });
  }

}
