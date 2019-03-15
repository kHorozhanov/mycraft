import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent implements OnInit {
  status: number;

  constructor(
    @Optional() @Inject(RESPONSE) private _response,
    private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.status = this._route.snapshot.data.status;
    this._response && this._response.status(this.status);
  }
}
