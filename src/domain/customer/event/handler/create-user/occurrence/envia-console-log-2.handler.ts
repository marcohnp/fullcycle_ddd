import EventHandlerInterface from "../../../../../@shared/event/event-handler.interface";
import CustomerCreatedOccurrenceEvent from "../episode/customer-created-episode.event";

export default class EnviaConsoleLog2Handler 
implements EventHandlerInterface<CustomerCreatedOccurrenceEvent> 
{
    handle(event: CustomerCreatedOccurrenceEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}