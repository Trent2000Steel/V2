let memory = {
  messages: [],
  quote: null,
  leadSent: false,
  customerIntent: '', // 'reserve' or 'email'
  customerInfo: {
    fullName: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',         // full address or general
    destinationCity: '',
    destinationState: '',
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

export function setCustomerInfo(partialInfo) {
  Object.assign(memory.customerInfo, partialInfo);
}

export function setIntent(intent) {
  memory.customerIntent = intent;
}

export function markLeadSent() {
  memory.leadSent = true;
}
