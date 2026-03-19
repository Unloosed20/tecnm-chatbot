const chats = [
  {
    id: 1,
    title: "Bienvenida",
    section: "Inicio",
    messages: [],
  },
  {
    id: 2,
    title: "Constancia de estudios",
    section: "Trámites escolares",
    messages: [
      {
        id: 201,
        role: "user",
        text: "¿Cómo solicito una constancia de estudios?",
      },
      {
        id: 202,
        role: "assistant",
        text: "Para solicitar una constancia de estudios normalmente necesitas verificar el trámite en servicios escolares, revisar el pago correspondiente y presentar tus datos académicos.",
      },
    ],
  },
];

module.exports = { chats };