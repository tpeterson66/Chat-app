import React from 'react';
import Message from './Message/Message'

export default function FixedContainer() {
  return (
    <div class="w3-container w3-light-grey" style={{ overflowY: "scroll" }}>
      <h1>Header</h1>
      <ul class="w3-ul w3-card-4">
        <Message username="Tom" date="Jan 15, 2020 - 7:30 PM" message="Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least.  " />
        <Message username="Tom" date="Jan 15, 2020 - 7:30 PM" />
        <Message username="Tom" date="Jan 15, 2020 - 7:30 PM" />
        <Message username="Tom" date="Jan 15, 2020 - 7:30 PM" />
      </ul>
    </div>
  );
}