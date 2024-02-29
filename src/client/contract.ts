import { Client } from './client';
import { ApiTypes } from '../api';

export class Contract {
  client: Client;
  id: string;
  factionSymbol: string;
  type: 'PROCUREMENT' | 'TRANSPORT' | 'SHUTTLE';
  deliver?: ApiTypes.ContractDeliverGood[];
  deadlineTimestamp: number;
  paymentOnAccepted: number;
  paymentOnFulfilled: number;
  accepted: boolean;
  fulfilled: boolean;
  deadlineToAcceptTimestamp?: number;

  constructor(client: Client, data: ApiTypes.Contract) {
    this.client = client;
    this.id = data.id;
    this.factionSymbol = data.factionSymbol;
    this.type = data.type;
    this.deliver = data.terms.deliver;
    this.deadlineTimestamp = new Date(data.terms.deadline).getTime();
    this.paymentOnAccepted = data.terms.payment.onAccepted;
    this.paymentOnFulfilled = data.terms.payment.onFulfilled;
    this.accepted = data.accepted
    this.fulfilled = data.fulfilled
    this.deadlineToAcceptTimestamp = data.deadlineToAccept ? new Date(data.deadlineToAccept).getTime() : undefined;
  }

  get deadline() {
    return new Date(this.deadlineTimestamp);
  }

  get deadlineToAccept() {
    return this.deadlineToAcceptTimestamp ? new Date(this.deadlineToAcceptTimestamp) : undefined;
  }
}

export default Contract;