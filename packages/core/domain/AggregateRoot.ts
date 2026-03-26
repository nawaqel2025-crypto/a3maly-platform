import { Entity } from "./Entity";
import { DomainEvent } from "./DomainEvent";

export abstract class AggregateRoot<TProps> extends Entity<TProps> {
  private _events: DomainEvent[] = [];

  protected addEvent(event: DomainEvent) {
    this._events.push(event);
  }

  public pullEvents(): DomainEvent[] {
    const events = [...this._events];
    this._events = [];
    return events;
  }
}
