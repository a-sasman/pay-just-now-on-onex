export type NavSection = {
  id: string;
  label: string;
};

export type ScenarioQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
};

export type CustomerQuestion = {
  question: string;
  answer: string;
};

export const courseData = {
  meta: {
    title: "Content",
    brand: "PayJustNow",
    courseId: "payjustnow-on-onex",
    logoSrc: "./images/payjustnow/payjustnow-logo.png",
    logoAlt: "PayJustNow logo",
  },
  navSections: [
    { id: "welcome", label: "Welcome" },
    { id: "sale-journey", label: "Sale Journey" },
    { id: "sale-rules", label: "Sale Rules" },
    { id: "refunds", label: "Refunds" },
    { id: "customer-questions", label: "Customer Questions" },
    { id: "complete", label: "Complete" },
  ] as NavSection[],
  welcome: {
    title: "PayJustNow on oneX",
    intro:
      "You already know how PayJustNow works and how to explain the payment options to a customer. Now let’s look at what happens at the Point of Sale, where the order of each step matters.",
    outcomesIntro: "By the end of this course, you will be able to:",
    outcomes: [
      "Apply the payment rules",
      "Check for excluded products",
      "Choose the right refund action",
      "Respond when a refund does not process",
    ],
    imageSrc: "./images/payjustnow/onex-hero.png",
    imageAlt: "oneX shopping app displayed on a phone among pink abstract shapes",
  },
  saleJourney: {
    title: "The Sale Journey",
    paragraphs: [
      "A customer is ready to pay with PayJustNow. Follow the visual journey from loading the customer and selecting PayJustNow to the customer scanning the QR code, confirming the payment and completing the transaction.",
      "As you go, look out for the order of the tenders, the customer approval and the final confirmation.",
    ],
    screenshotSrc: "./images/payjustnow/onex-payment-plan.png",
    screenshotAlt:
      "PayJustNow checkout screen showing a R4,000 purchase and available payment-plan choices",
  },
  rules: {
    title: "Four rules",
    intro: "Before you process a PayJustNow sale, keep these four rules in mind.",
    items: [
      "Add all other tenders first. PayJustNow comes last.",
      "The customer approves the payment in the app.",
      "You can cancel before approval. After approval, process a return or a new sale.",
      "Employees may use PayJustNow with their staff discount.",
    ],
  },
  exclusions: {
    title: "Exclusions",
    paragraphs: [
      "Not everything in the basket can be paid for with PayJustNow. TFG gift cards, airtime, data, 1Voucher and other Value-Added Services are excluded.",
      "Tell the customer before payment and use another tender for the excluded items.",
    ],
    sortItems: [
      { id: "ordinary-merchandise", label: "Ordinary merchandise", group: "allowed" },
      { id: "tfg-gift-cards", label: "TFG gift cards", group: "excluded" },
      { id: "airtime", label: "Airtime", group: "excluded" },
      { id: "data", label: "Data", group: "excluded" },
      { id: "1voucher", label: "1Voucher", group: "excluded" },
      { id: "value-added-services", label: "Other Value-Added Services", group: "excluded" },
    ],
  },
  refundDecision: {
    title: "Choose the refund journey",
    question: "Was the original purchase paid only with PayJustNow?",
    reminder: "If you are unsure, check the original transaction in oneX.",
    paths: [
      {
        label: "YES",
        body: "Refund the full eligible return amount through PayJustNowStores.",
      },
      {
        label: "NO",
        body: "Refund only the PayJustNow portion through PayJustNowStores. Return the remaining amount to the other original tender.",
      },
    ],
  },
  refundChecks: {
    title: "Three refund checks",
    intro: "Before you complete the refund:",
    items: [
      "PayJustNow money goes back through PayJustNow.",
      "A split refund is limited to the PayJustNow portion. The system may show the limit in cents.",
      "Check the return reason and quantity before you tap Apply.",
    ],
  },
  knowledgeChecks: [
    {
      id: "sale-change-check",
      question:
        "A customer is paying R200 with a gift card and wants to use PayJustNow for the balance. After scanning the QR code, but before approving the payment, the customer asks to add another item. What is the best action?",
      options: [
        "Ask the customer to approve the current amount, then add the item to the same transaction.",
        "Cancel the PayJustNow tender, add the item, apply the gift card again and then select PayJustNow for the new balance.",
        "Add the item while the approval is open and keep the original PayJustNow amount.",
        "Complete the sale, then refund the gift card so the extra item can be added.",
      ],
      correctIndex: 1,
      feedback:
        "The customer has not approved the payment yet, so the PayJustNow tender can still be cancelled. Rebuild the sale so the gift card is applied first and PayJustNow covers the correct remaining balance.",
    },
    {
      id: "exclusions-check",
      question:
        "A customer wants to buy a jacket, airtime and a TFG gift card. The customer also wants to pay part by debit card and use PayJustNow for the balance. What is the best action?",
      options: [
        "Apply the debit card first, then use PayJustNow for everything left in the basket.",
        "Explain that the airtime and gift card need another tender, apply the debit-card payment, then use PayJustNow last for the eligible merchandise.",
        "Use PayJustNow for the jacket and gift card, then use the debit card for the airtime.",
        "Process the jacket separately on PayJustNow before dealing with the other tenders.",
      ],
      correctIndex: 1,
      feedback:
        "The excluded products need another tender. For eligible merchandise, apply the debit-card payment first and PayJustNow last.",
    },
    {
      id: "split-refund-check",
      question:
        "A customer paid part of the original purchase by card and part through PayJustNow. During the return, the PayJustNow refund limit shown on screen is lower than the total refund amount. What should you do?",
      options: [
        "Refund the full amount through PayJustNow because PayJustNow was used in the original sale.",
        "Refund only up to the PayJustNow limit through PayJustNow, then return the remaining amount to the other original tender.",
        "Refund the full amount to the card because the PayJustNow limit is too low.",
        "Change the return reason to increase the PayJustNow limit.",
      ],
      correctIndex: 1,
      feedback:
        "In a split-tender return, PayJustNow can only refund the PayJustNow portion. The remaining amount goes back through the other original tender.",
    },
    {
      id: "amount-not-allowed-check",
      question:
        "You selected PayJustNowStores, but the refund returns “Amount not allowed.” What should you check first?",
      options: [
        "Check whether the amount entered is higher than the PayJustNow limit shown on screen.",
        "Change the refund to cash so the customer does not have to wait.",
        "Refund the full original transaction and correct the difference later.",
        "Select a different return reason and try again.",
      ],
      correctIndex: 0,
      feedback:
        "First compare the amount entered with the PayJustNow limit. The limit may be shown in cents. If the tender and amount are correct but the refund still fails, log a call on Synergy or contact Tech Support on 021 937 4499.",
    },
  ] as ScenarioQuestion[],
  customerQuestions: {
    title: "Customer Questions",
    intro:
      "Customers may ask for help with PayJustNow questions that do not come up in every transaction. You do not need to memorise every answer. Use this section when a customer needs help, or download the PayJustNow Customer Questions Guide for later.",
    instruction: "Select a question to view the answer.",
    items: [
      {
        question: "I am not getting a QR code.",
        answer:
          "Check that the mobile number on the PayJustNow account is correct. The customer can update it under Account Details on the customer portal.",
      },
      {
        question: "My OTP has not arrived.",
        answer:
          "Ask the customer to select Resend Code. If it still does not arrive, restart the phone and try again, or contact the mobile network provider. If the problem continues, use the PayJustNow Customer Support form.",
      },
      {
        question: "How can I use money in my PayJustNow wallet?",
        answer:
          "Wallet funds can be used for a new purchase, an early payment on an existing order, or a withdrawal to a South African bank account. Withdrawals made before 16:00 are processed by overnight EFT and reflect the next business day.",
      },
      {
        question: "Why has my saved card disappeared?",
        answer:
          "The bank may have blocked PayJustNow from using the card after a failed debit attempt. Check that the card is active, enabled for online purchases and has enough funds. If the problem continues, the customer can use instant EFT or another card.",
      },
      {
        question: "How can I pay early or settle my balance?",
        answer:
          "In the PayJustNow customer portal, select View Order, select Make Payment, choose the next instalment or full outstanding balance, then select Make Payment again to confirm.",
      },
      {
        question: "How can I change a lost, expired or declined card?",
        answer:
          "In the customer portal, open View Order and select Make Payment. Choose the amount, select Add New Card Details, enter the new card details and select Pay Now.",
      },
      {
        question: "What do I need for my first PayJustNow order?",
        answer:
          "The customer provides a name, contact details and South African ID number. PayJustNow completes a credit and ID check. Once approved, the customer can use an accepted card.",
      },
      {
        question: "Where can I check the payment-plan details?",
        answer: "Use the first PayJustNow course for the approved payment-plan explanation.",
      },
    ] as CustomerQuestion[],
  },
  complete: {
    title: "Well done",
    paragraphs: [
      "You can now apply the PayJustNow rules on oneX and choose the correct refund action.",
      "Remember: other tenders first, PayJustNow last. Check for excluded products. During a refund, check the original transaction, the PayJustNow limit, the return reason and the quantity.",
      "Need help later? Return to Customer Questions or download the PayJustNow Customer Questions Guide.",
    ],
  },
  guide: {
    href: "./downloads/payjustnow-customer-questions-guide.pdf",
    label: "Download Guide",
  },
};
