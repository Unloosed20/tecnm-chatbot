const initialChats = [
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
  {
    id: 3,
    title: "Beca institucional",
    section: "Becas",
    messages: [
      {
        id: 301,
        role: "user",
        text: "¿Cuáles son los requisitos de la beca institucional?",
      },
      {
        id: 302,
        role: "assistant",
        text: "Los requisitos de la beca institucional suelen incluir promedio mínimo, documentos personales y seguimiento a la convocatoria vigente.",
      },
    ],
  },
];

export default initialChats;