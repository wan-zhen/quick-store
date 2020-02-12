import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { <%= classify(name) %>State, <%= classify(name) %>Store } from '@akita/stores';

@Injectable()
export class <%= classify(name) %>Query extends QueryEntity<<%= classify(name) %>State> {

  constructor(
    protected store: <%= classify(name) %>Store,
  ) {
    super(store);
  }
}
