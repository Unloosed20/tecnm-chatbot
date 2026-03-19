export function buildChatTitle(text) {
  const cleaned = text.trim();
  if (!cleaned) return "Nuevo chat";
  return cleaned.length > 28 ? `${cleaned.slice(0, 28)}...` : cleaned;
}

export function getAssistantResponse(section, message) {
  const lowerMessage = message.toLowerCase();

  const sectionReplies = {
    Inicio: "Puedo orientarte sobre trámites escolares, becas, titulación, servicio social, residencias, inglés y créditos complementarios. Elige una sección o escribe tu duda.",
    "Trámites escolares":
      "En trámites escolares puedo ayudarte con constancias, certificados, historial académico, credenciales y otros procesos administrativos.",
    Becas:
      "En becas puedo orientarte sobre convocatorias, requisitos, tipos de apoyo y documentación necesaria.",
    Titulación:
      "En titulación puedo ayudarte con modalidades, requisitos, proceso, EGEL, tesis y experiencia profesional.",
    "Servicio social":
      "En servicio social puedo ayudarte con registro, requisitos, duración, lugares disponibles y proceso de liberación.",
    "Residencias profesionales":
      "En residencias profesionales puedo orientarte sobre registro, empresas, requisitos, duración y reportes.",
    Inglés:
      "En la sección de inglés puedo ayudarte con cursos, niveles, certificaciones, examen diagnóstico y horarios.",
    "Créditos Complementarios":
      "En créditos complementarios puedo orientarte sobre actividades culturales, deportes, talleres, requisitos y validación.",
  };

  if (section === "Trámites escolares") {
    if (lowerMessage.includes("constancia")) {
      return "La constancia de estudios generalmente se solicita en servicios escolares. Normalmente te pedirán identificación, datos del alumno y, en algunos casos, comprobante de pago.";
    }
    if (lowerMessage.includes("certificado")) {
      return "Para certificados, normalmente debes revisar requisitos, validar tu situación académica y completar el pago correspondiente en el área escolar.";
    }
    if (lowerMessage.includes("historial")) {
      return "El historial académico suele tramitarse en servicios escolares. Conviene verificar si lo necesitas simple, sellado o con validez oficial.";
    }
  }

  if (section === "Becas") {
    if (lowerMessage.includes("requisito")) {
      return "Los requisitos de una beca pueden variar, pero suelen incluir promedio mínimo, documentación personal, solicitud y cumplimiento de la convocatoria vigente.";
    }
    if (lowerMessage.includes("convocatoria") || lowerMessage.includes("fechas")) {
      return "Las fechas de convocatoria deben revisarse cada periodo. Lo ideal es consultar la publicación oficial del campus o del programa de becas correspondiente.";
    }
    if (lowerMessage.includes("movilidad")) {
      return "Las becas de movilidad suelen requerir buen desempeño académico, documentación adicional y, a veces, procesos de postulación específicos.";
    }
  }

  if (section === "Titulación") {
    if (lowerMessage.includes("egel")) {
      return "EGEL es una de las modalidades que pueden aplicar según tu carrera. Debes revisar puntaje requerido, vigencia y lineamientos internos del campus.";
    }
    if (lowerMessage.includes("tesis")) {
      return "La modalidad de tesis suele requerir registro del proyecto, asesor asignado, desarrollo del trabajo y revisión antes del acto de titulación.";
    }
    if (lowerMessage.includes("modalidad")) {
      return "Las modalidades de titulación pueden incluir tesis, EGEL, experiencia profesional y otras opciones autorizadas por el instituto.";
    }
  }

  if (section === "Servicio social") {
    if (lowerMessage.includes("registro")) {
      return "Para el registro de servicio social normalmente necesitas cumplir el porcentaje de créditos requerido y seguir el proceso indicado por el área correspondiente.";
    }
    if (lowerMessage.includes("liberación")) {
      return "La liberación del servicio social normalmente requiere reportes, constancias de cumplimiento y validación final del departamento responsable.";
    }
    if (lowerMessage.includes("duración")) {
      return "La duración del servicio social suele medirse en horas y periodo mínimo, según la normativa institucional vigente.";
    }
  }

  if (section === "Residencias profesionales") {
    if (lowerMessage.includes("empresa")) {
      return "Para residencias profesionales, las empresas receptoras suelen validarse según convenios, perfil del estudiante y lineamientos del programa.";
    }
    if (lowerMessage.includes("reporte")) {
      return "Los reportes de residencia suelen entregarse de forma parcial y final, siguiendo el formato establecido por el instituto.";
    }
    if (lowerMessage.includes("registro")) {
      return "El registro de residencias generalmente incluye propuesta, asesor, empresa y validación académica.";
    }
  }

  if (section === "Inglés") {
    if (lowerMessage.includes("curso")) {
      return "Los cursos de inglés suelen organizarse por niveles. Conviene revisar horarios, costos, fechas y modalidad de inscripción.";
    }
    if (lowerMessage.includes("certificación")) {
      return "La certificación de inglés puede depender del nivel requerido y del examen aceptado por la institución o el programa.";
    }
    if (lowerMessage.includes("diagnóstico")) {
      return "El examen diagnóstico sirve para ubicarte en un nivel adecuado antes de iniciar el curso o proceso de certificación.";
    }
  }

  if (section === "Créditos Complementarios") {
    if (lowerMessage.includes("deporte")) {
      return "Las actividades deportivas pueden contar para créditos complementarios si están autorizadas y correctamente registradas.";
    }
    if (lowerMessage.includes("taller")) {
      return "Los talleres válidos para créditos complementarios deben estar reconocidos por el campus y cumplir los requisitos de participación.";
    }
    if (lowerMessage.includes("validación")) {
      return "La validación de créditos complementarios normalmente requiere evidencia de participación y revisión por el área correspondiente.";
    }
  }

  return sectionReplies[section] ?? "Puedo ayudarte con información general del campus. Cuéntame tu duda con más detalle.";
}