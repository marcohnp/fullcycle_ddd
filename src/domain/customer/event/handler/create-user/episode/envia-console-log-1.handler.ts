import EventHandlerInterface from "../../../../../@shared/event/event-handler.interface";
import CustomerCreatedEpisodeEvent from "./customer-created-episode.event";

export default class EnviaConsoleLog1Handler 
implements EventHandlerInterface<CustomerCreatedEpisodeEvent> 
{
    handle(event: CustomerCreatedEpisodeEvent): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}