let memory = {
  messages: [],
  quote: null,
  customerInfo: {
    origin: '',
    destination: '',
    moveDate: '',
    homeSize: '',
    priorities: '',
    specialItems: '',
    helpNeeded: ''
  }
};

export function getMemory() {
  return memory;
}

export function updateMemory(newMessage) {
  memory.messages.push(newMessage);
}

export function saveQuote(quote) {
  memory.quote = quote;
}
