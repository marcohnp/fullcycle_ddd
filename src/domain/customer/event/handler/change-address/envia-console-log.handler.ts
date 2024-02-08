import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "./customer-change-address.event";

export default class EnviaConsoleLogHandler 
implements EventHandlerInterface<CustomerChangedAddressEvent> 
{
    handle(event: CustomerChangedAddressEvent): void {
        const { id, name, address } = event.eventData;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}.`);
    }
}