import Customer from "../../customer/entity/customer";
import CustomerChangedAddressEvent from "../../customer/event/handler/change-address/customer-change-address.event";
import EnviaConsoleLogHandler from "../../customer/event/handler/change-address/envia-console-log.handler";
import CustomerCreatedEvent from "../../customer/event/handler/create-user/customer-created.event";
import EnviaConsoleLog1Handler from "../../customer/event/handler/create-user/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/create-user/envia-console-log-2.handler";
import Address from "../../customer/value-object/address";
import EventDispatcher from "./event-dispatcher";


jest.mock("../../@shared/event/event-dispatcher");

describe("Customer test specific test", () => {
    it("should notify when Customer is created", () => {
      const mockEventDispatcher = new EventDispatcher();
      const customer = new Customer("1", "Customer 1", mockEventDispatcher);
  
      expect(mockEventDispatcher.register).toHaveBeenCalledWith(
        "CustomerCreatedEvent",
        expect.any(EnviaConsoleLog1Handler)
      );

      expect(mockEventDispatcher.register).toHaveBeenCalledWith(
        "CustomerCreatedEvent",
        expect.any(EnviaConsoleLog2Handler)
      );
  
      expect(mockEventDispatcher.notify).toHaveBeenCalledWith(
        expect.any(CustomerCreatedEvent)
      );
  
      expect(mockEventDispatcher.unregister).not.toHaveBeenCalled();
    });
  
    it("should notify when Customer's address is changed", () => {
      const mockEventDispatcher = new EventDispatcher();
      const customer = new Customer("1", "Customer 1", mockEventDispatcher);
  
      customer.changeAddress(new Address("New Street", 123, "New Zip", "New City"));
  
      expect(mockEventDispatcher.register).toHaveBeenCalledWith(
        "CustomerChangedAddressEvent",
        expect.any(EnviaConsoleLogHandler)
      );
  
      expect(mockEventDispatcher.notify).toHaveBeenCalledWith(
        expect.any(CustomerChangedAddressEvent)
      );
  
      expect(mockEventDispatcher.unregister).toHaveBeenCalled();
    });
});