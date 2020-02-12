import { Injectable } from '@angular/core';
import { <%= classify(name) %>Service } from '@akita/services';

@Injectable()
export class <%= classify(name) %>MockService extends <%= classify(name) %>Service {

  constructor(
  ) {
    super(
    );
  }
}
