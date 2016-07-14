import { Component } from '@angular/core';
import { NgForm } from '@angular/common';
import { FormModel } from './form.model';
import { ClientSocket } from '../shared/client-socket.ts';

declare var require;
const styles: string = require('!style!css!sass!./chat.component.scss');
const template: string = require('./chat.component.html');

@Component({
  selector: 'vu-chat',
  styleUrls: [styles],
  template
})
export class ChatComponent extends ClientSocket {

  handle: string = 'user-' + Math.floor((Math.random() * 10000) + 1);
  message: string = 'test';
  items: string[] = [];

  constructor() {
    super();
  }

  model = new FormModel('User Handle', 'Enter a Message');

  connect() {
    this.initialize();
    console.log(`{socket} [client:connect] attempting to connect to `
      + `websocket @ ${this.uri}...`);
    this.io('connect', () => {
      console.log(`{socket} [client:connect] connected to websocket `
        + `@ ${this.uri}...`);
      this.socket.emit('chat:register', this.handle);
    });
    this.io('chat:message', item => {
      this.pushItemToFeed(item);
    });
    this.io('disconnect', () => {
      this.disconnect();
      this.items.push('You have left the channel');
      console.log(`{socket} [client:disconnect] successfully disconnected from `
        + `websocket @ ${this.uri}...`);
    });
  }

  pushItemToFeed(item) {
    this.items.push(item);
  }

  submitted = false;

  send() {
    this.submitted = true;
    console.log('{ socket - client:message } Trying to send message', this.model.handle, this.model.message);
    this.socket.emit('chat:message', this.model.message);
    this.message = '';
  }
}
