import { BasePublisher, CardCreatedEvent, Exchange, Routingkey } from "@rpticketsproject/task-managing-common";

export class CardCreatedPublisher extends BasePublisher<CardCreatedEvent> {
    exchange: Exchange.card = Exchange.card;
    routeKey: Routingkey.cardCreated = Routingkey.cardCreated;
}