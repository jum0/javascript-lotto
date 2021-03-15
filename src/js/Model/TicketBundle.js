import messenger from "../Messenger.js";
import { MESSAGE, STANDARD_NUMBER } from "../Util/constants.js";

class TicketBundle {
  constructor() {
    this.ticketBundle = [];

    messenger.addMessageListener(
      MESSAGE.AUTO_NUMBER_PURCHASE_BUTTON_CLICKED,
      () => {
        this.ticketBundle.push(this.generateRandomNumbers());
      }
    );
  }

  generateRandomNumbers() {
    const numbers = Array.from(
      { length: STANDARD_NUMBER.LOTTO_MAX_NUMBER },
      (_, i) => i + 1
    );

    numbers.sort(() => Math.random() - Math.random());

    return numbers
      .slice(0, STANDARD_NUMBER.TICKET_NUMBER_LENGTH)
      .sort((a, b) => a - b);
  }
}

export default TicketBundle;
