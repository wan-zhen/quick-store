import { Injectable } from '@angular/core';
<% if (isEnityStore) { %>import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';<% } %><% if (!isEnityStore) { %>import { Store, StoreConfig } from '@datorama/akita';<% } %>

<% if (isEnityStore) { %>export interface <%= classify(name) %>State extends EntityState { }<% } %><% if (!isEnityStore) { %>
  
export type <%= classify(name) %>State = { }<% } %>

@Injectable()
@StoreConfig({})
export class <%= classify(name) %>Store extends EntityStore<<%= classify(name) %>State> {
  constructor() {
    super({});
  }
}

