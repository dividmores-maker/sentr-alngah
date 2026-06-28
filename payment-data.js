// payment-data.js
// بيانات الدفع لكل مدرس - الـ key هو نفس id المدرس في TEACHERS و Firestore
// لو مدرس مش عنده محفظة معينة خلي قيمتها null وهتتخفى أوتوماتيك

const PAYMENT_DATA = {

  "t1": {
    whatsapp:     "201005244616",   // ← ضع الرقم الحقيقي
    vodafoneCash: "01000000001",
    etisalatCash: null,
    instapay:     01220989769 ,
    plans: [
      { label: "شهري", price: "XXX جنيه", note: "" },
    ],
    note: "بعد الدفع ابعت صورة الإيصال على الواتس عشان يتفعل حسابك.",
  },

  "t2": {
    whatsapp:     "20100000001",
    vodafoneCash: "01000000002",
    etisalatCash: null,
    instapay:     null,
    plans: [
      { label: "شهري", price: "XXX جنيه", note: "" },
    ],
    note: "بعد الدفع ابعت صورة الإيصال على الواتس عشان يتفعل حسابك.",
  },

  "t3": {
    whatsapp:     "201003773087",
    vodafoneCash: "01000000003",
    etisalatCash: null,
    instapay:     null,
    plans: [
      { label: "شهري", price: "XXX جنيه", note: "" },
    ],
    note: "بعد الدفع ابعت صورة الإيصال على الواتس عشان يتفعل حسابك.",
  },

  "t4": {
    whatsapp:     "201204886344",
    vodafoneCash: "01000000004",
    etisalatCash: null,
    instapay:     null,
    plans: [
      { label: "شهري", price: "XXX جنيه", note: "" },
    ],
    note: "بعد الدفع ابعت صورة الإيصال على الواتس عشان يتفعل حسابك.",
  },

  "t5": {
    whatsapp:     "201223617881",
    vodafoneCash: "01000000005",
    etisalatCash: null,
    instapay:     null,
    plans: [
      { label: "شهري", price: "XXX جنيه", note: "" },
    ],
    note: "بعد الدفع ابعت صورة الإيصال على الواتس عشان يتفعل حسابك.",
  },

  "t6": {
    whatsapp:     "201096400298",
    vodafoneCash: "01000000006",
    etisalatCash: null,
    instapay:     null,
    plans: [
      { label: "شهري", price: "XXX جنيه", note: "" },
    ],
    note: "بعد الدفع ابعت صورة الإيصال على الواتس عشان يتفعل حسابك.",
  },

  "t7": {
    whatsapp:     "201229864268",
    vodafoneCash: "01000000007",
    etisalatCash: null,
    instapay:     null,
    plans: [
      { label: "شهري", price: "XXX جنيه", note: "" },
    ],
    note: "بعد الدفع ابعت صورة الإيصال على الواتس عشان يتفعل حسابك.",
  },

  "t8": {
    whatsapp:     "201211475727",
    vodafoneCash: "01000000008",
    etisalatCash: null,
    instapay:     null,
    plans: [
      { label: "شهري", price: "XXX جنيه", note: "" },
    ],
    note: "بعد الدفع ابعت صورة الإيصال على الواتس عشان يتفعل حسابك.",
  },

};
