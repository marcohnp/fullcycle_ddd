import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEpisodeEvent from "../event/handler/create-user/episode/customer-created-episode.event";
import CustomerChangedAddressEvent from "../event/handler/change-address/customer-change-address.event";
import EnviaConsoleLog1Handler from "../event/handler/create-user/episode/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/handler/create-user/occurrence/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../event/handler/change-address/envia-console-log.handler";
import Address from "../value-object/address";
import CustomerCreatedOccurrenceEvent from "../event/handler/create-user/occurrence/customer-created-occurrence.event";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcher;

  constructor(id: string, name: string, eventDispatcher: EventDispatcher) {
    this._id = id;
    this._name = name;
    this._eventDispatcher = eventDispatcher;
    this.validate();
    this.notifyCustomerCreatedEvent(id, name);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }
  
  changeAddress(address: Address) {
    this._address = address;
    this.notifyAddressChangedEvent(address, this._id, this._name);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }

  unregisterEventHandlers() {
    this._eventDispatcher.unregisterAll();
  }

  public notifyCustomerCreatedEvent(id: string, name: string) {
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    this._eventDispatcher.register("CustomerCreatedEpisodeEvent", eventHandler1);
    this._eventDispatcher.register("CustomerCreatedOccurrenceEvent", eventHandler2);
    const customerCreatedEpisodeEvent = new CustomerCreatedEpisodeEvent({
      id: id,
      name: name,
    });
    const customerCreatedOccurrenceEvent = new CustomerCreatedOccurrenceEvent({
      id: id,
      name: name,
    });
    
    this._eventDispatcher.notify(customerCreatedEpisodeEvent);
    this._eventDispatcher.notify(customerCreatedOccurrenceEvent);
    this._eventDispatcher.unregisterAll();
  }

  public notifyAddressChangedEvent(newAddress: Address, id: string, name: string) {
    const eventHandler = new EnviaConsoleLogHandler();
    this._eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

    const addressChangedEvent = new CustomerChangedAddressEvent({
      id: id,
      name: name,
      address: new Address(newAddress._street, newAddress._number, newAddress._zip, newAddress._city),
    });

    this._eventDispatcher.notify(addressChangedEvent);
    this._eventDispatcher.unregister("CustomerChangedAddressEvent", eventHandler);
  }
}
