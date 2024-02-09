import CustomerCreatedEpisodeEvent from "../../customer/event/handler/create-user/episode/customer-created-episode.event";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import CustomerChangedAddressEvent from "../../customer/event/handler/change-address/customer-change-address.event";
import EnviaConsoleLogHandler from "../../customer/event/handler/change-address/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../../customer/event/handler/create-user/episode/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/create-user/occurrence/envia-console-log-2.handler";
import CustomerCreatedOccurrenceEvent from "../../customer/event/handler/create-user/occurrence/customer-created-occurrence.event";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should register a Customer event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    
    eventDispatcher.register("CustomerCreatedEpisodeEvent", eventHandler);
    
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should register all Customer events handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    
    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEpisodeEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedOccurrenceEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedOccurrenceEvent"]
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(
      1
    );
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"].length).toBe(
      1
    );
    expect(eventDispatcher.getEventHandlers["CustomerCreatedOccurrenceEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedOccurrenceEvent"][0]
    ).toMatchObject(eventHandler2);
  });

  it("should unregister a Customer event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    
    eventDispatcher.register("CustomerCreatedEpisodeEvent", eventHandler);
    
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEpisodeEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"].length).toBe(
      0
    );
  });

  it("should unregister all Customer events handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    
    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEpisodeEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedOccurrenceEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedOccurrenceEvent"]
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(
      1
    );
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"].length).toBe(
      1
    );
    expect(eventDispatcher.getEventHandlers["CustomerCreatedOccurrenceEvent"].length).toBe(
      1
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedOccurrenceEvent"][0]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedOccurrenceEvent"]
    ).toBeUndefined();
  });

  it("should notify all Customer Logs Events handlers", () => {
    const eventDispatcher = new EventDispatcher();    
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEpisodeEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedOccurrenceEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEpisodeEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedOccurrenceEvent"][0]
    ).toMatchObject(eventHandler2);

    const customerCreatedEpisodeEvent = new CustomerCreatedEpisodeEvent({
      name: "Customer 1",
      active: true,
      rewardPoints: 100,
      address: new Address("Street 1", 1, "Zip 1", "City 1"),
    });

    const customerCreatedOccurrenceEvent = new CustomerCreatedOccurrenceEvent({
      name: "Customer 1",
      active: true,
      rewardPoints: 100,
      address: new Address("Street 1", 1, "Zip 1", "City 1"),
    });

    eventDispatcher.notify(customerCreatedEpisodeEvent);
    eventDispatcher.notify(customerCreatedOccurrenceEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify all Customer Log Address Event handlers", () => {
    const eventDispatcher = new EventDispatcher();    
    const eventHandler1 = new EnviaConsoleLogHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler1);

    const customerChangeAddress = new CustomerChangedAddressEvent({
      id: "1",
      name: "Customer 1",
      active: true,
      rewardPoints: 100,
      address: new Address("Street 1", 1, "Zip 1", "City 1"),
    });

    eventDispatcher.notify(customerChangeAddress);

    expect(spyEventHandler1).toHaveBeenCalled();
  });

});