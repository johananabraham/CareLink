// Translation data for Carelink+ internationalization
const TRANSLATIONS = {
  en: {
    // App title and headers
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - Community Resource Finder",
    
    // Language selection modal
    languageModal: {
      title: "Welcome to Carelink+",
      subtitle: "Please select your preferred language",
      selectButton: "Continue in {language}",
      close: "Close"
    },
    
    // Navigation
    nav: {
      home: "Home",
      howItWorks: "How It Works",
      about: "About", 
      contact: "Contact",
      getHelp: "Get Help Now"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "Type your message...",
      sendButton: "Send",
      mapTitle: "Resource Locations",
      resourcesTitle: "Available Resources",
      loading: "Loading...",
      error: "An error occurred. Please try again.",
      viewOnMap: "View on Map",
      getDirections: "Get Directions",
      callNow: "Call Now",
      website: "Visit Website",
      distance: "Distance",
      open: "Open",
      closed: "Closed",
      unknownHours: "Hours not available"
    },
    
    // Chat interface
    chat: {
      assistantTitle: "Carelink+ Assistant",
      assistantSubtitle: "Here to help you find community resources"
    },
    
    // Session control menu
    session: {
      title: "Session",
      startOver: "Start Over",
      startOverDesc: "Fresh conversation",
      clearChat: "Clear Chat",
      clearChatDesc: "Remove message history",
      helpTips: "Help & Tips",
      helpTipsDesc: "How to use Carelink+",
      endSession: "End Session",
      endSessionDesc: "Close Carelink+"
    },
    
    // Process/How It Works Section
    process: {
      badge: "Simple Process",
      title: "How It Works",
      subtitle: "Getting connected to quality care does not have to be confusing. Follow these three steps.",
      step1: {
        title: "Share Your Needs",
        description: "Answer a few short questions about what you are looking for. This can include healthcare, insurance, food, housing, or help in your language. You do not need to share personal documents, and your information stays private."
      },
      step2: {
        title: "Find Trusted Local Help", 
        description: "We connect you to reliable community organizations, clinics, and programs near you that fit your needs. We focus on services that are affordable, welcoming, and available in your preferred language."
      },
      step3: {
        title: "Get Support You Can Trust",
        description: "Use the resources we share or connect with volunteers who can further help guide you through the process. We are here to make the system easier to understand and to help you feel supported, not overwhelmed."
      }
    },
    
    // About Section
    about: {
      title: "About CareLink+",
      description: "Finding help should not feel confusing or overwhelming. Many people face barriers like language, cost, and unfamiliar systems when trying to access healthcare and basic resources. We exist to make that process easier. Our platform connects individuals and families to trusted local services, including healthcare, insurance assistance, food programs, housing support, and community organizations. We believe everyone deserves clear information and support they can trust, no matter where they come from or what language they speak.",
      vision: {
        title: "Our Vision",
        description: "A future where people can access healthcare and essential resources with confidence and clarity, without fear, confusion, or unnecessary barriers."
      }
    },
    
    // Values Section
    values: {
      title: "Our Values",
      accessibility: {
        title: "Accessibility",
        description: "Information should be easy to understand and available to everyone, regardless of language, income, or background."
      },
      respect: {
        title: "Respect", 
        description: "Everyone deserves to be treated with care and understanding when seeking help."
      },
      equity: {
        title: "Equity",
        description: "We are committed to reducing disparities and helping close gaps in access to care and essential services."
      },
      trust: {
        title: "Trust",
        description: "We prioritize privacy, accuracy, and partnerships with organizations that truly serve communities."
      },
      community: {
        title: "Community",
        description: "We believe in the strength of local communities and work to connect people to support systems close to home."
      }
    },
    
    // Footer Section
    footer: {
      description: "Connecting communities to trusted healthcare and essential resources with clarity and compassion.",
      quickLinks: "Quick Links",
      support: "Support", 
      help: "Help Center",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      accessibility: "Accessibility",
      copyright: "© 2025 CareLink+. All rights reserved.",
      emergency: "For emergencies, call 911"
    },
    
    // Location services
    location: {
      servicesTitle: "Location Services:",
      enableNearMe: "Enable \"Near Me\"",
      nearMeActive: "✓ \"Near Me\" Active",
      yourLocation: "Your Location",
      accuracy: "Accuracy",
      zipCodePrompt: "Please enter your ZIP code to find resources near you:",
      zipCodeSuccess: "Found location for ZIP code {zipCode}! I can now show you nearby resources.",
      zipCodeError: "I couldn't find that ZIP code ({zipCode}). Please try a different ZIP code or browse all available resources.",
      zipCodeInvalid: "That doesn't look like a valid ZIP code. Please enter a 5-digit ZIP code (e.g., 12345) or ZIP+4 format (e.g., 12345-6789).",
      zipCodeFallback: "I can still help you find resources! You can search by ZIP code or browse all available options."
    },
    
    // Forms
    forms: {
      helpFormTitle: "Request Personal Assistance",
      helpFormSubtitle: "We'll connect you with someone who can provide personalized help",
      step1Title: "Basic Information",
      step2Title: "Location & Your Needs", 
      step3Title: "Additional Details",
      fullName: "Full Name *",
      fullNamePlaceholder: "Enter your full name",
      phoneNumber: "Phone Number *",
      phoneNumberPlaceholder: "(555) 123-4567",
      email: "Email Address (Optional)",
      emailPlaceholder: "your.email@example.com",
      address: "Address/ZIP Code *",
      addressPlaceholder: "Street address or ZIP code",
      helpCategory: "What do you need help with? *",
      selectCategory: "-- Select a category --",
      other: "Other",
      helpDescription: "Describe your situation *",
      helpDescriptionPlaceholder: "Please describe what kind of help you need...",
      urgency: "How urgent is your need? *",
      selectUrgency: "-- Select urgency level --",
      emergency: "Emergency (Need help today)",
      urgent: "Urgent (Need help within a week)",
      moderate: "Moderate (Need help within a month)",
      low: "Low priority (Just exploring options)",
      contactTime: "Best time to contact you",
      anytime: "Anytime",
      morning: "Morning (8AM - 12PM)",
      afternoon: "Afternoon (12PM - 5PM)",
      evening: "Evening (5PM - 8PM)",
      additionalNotes: "Additional Notes (Optional)",
      additionalNotesPlaceholder: "Any other information that might help us assist you...",
      privacyNotice: "🔒 Your information will be kept confidential and only used to connect you with appropriate resources and assistance.",
      back: "Back",
      cancel: "Cancel",
      next: "Next",
      submit: "Submit Request",
      validationRequired: "This field is required",
      validationEmail: "Please enter a valid email address",
      validationPhone: "Please enter a valid phone number"
    },
    
    // Bot responses
    bot: {
      welcome: "I can help you find resources for free medical clinics, community health centers, mental health support, crisis & emergency mental health, substance use recovery, housing & shelter, rent & utility assistance, food & basic needs, employment services, legal services, refugee & immigrant support, or veteran services. What do you need help with?",
      searchingResources: "Looking for {category} resources in your area...",
      resourcesFound: "Found {count} {category} resource{plural} near you! Check the map above to see their locations. Click on any marker for more details.",
      noResourcesFound: "I'm sorry, I couldn't find any mappable {category} resources in your area right now. This might be because:\n\n• The resources don't have location coordinates yet\n• They may be listed under a different category name\n• The data is still being updated\n\nYou can try asking for a different type of assistance, or check back later.",
      clarificationPrefix: "Great! Looking for {category} resources in your area...",
      needMoreInfo: "I want to make sure I understand what you need. Could you tell me more specifically what kind of help you're looking for?",
      feedbackPrompt: "Was this helpful? Did you find what you were looking for?",
      feedbackYes: "Yes, this helped!",
      feedbackNo: "I need more assistance",
      feedbackThankYou: "Great! We're glad we could help.",
      offerPersonalHelp: "Let us connect you with someone who can provide personal assistance.",
      noResourcesOffer: "Since we couldn't find the right resources, would you like us to connect you with someone who can help personally?",
      personalAssistance: "I'd be happy to connect you with someone who can provide personalized assistance.",
      shareInfo: "Would you like to share some basic information so we can connect you with the right resources and support?",
      helpPrompt: "You can ask me about food, housing, medical clinics, mental health, legal help, employment, or any other community resources.",
      instructions: "Type 'food', 'housing', 'clinic', 'rent help', or tell me what you need help with.",
      foundResources: "I found {count} resources for {category}",
      searchingFor: "Looking for {category} resources"
    },
    
    // Clarification questions
    clarifications: {
      "Free & Charitable Medical Clinics": "Are you looking for a free or walk-in medical clinic for immediate care?",
      "Community Health Centers": "Are you looking for a community health center for ongoing care, like a primary doctor?",
      "Mental Health (Non-Crisis)": "Are you looking for counseling, therapy, or non-emergency mental health support?",
      "Crisis & Emergency Mental Health": "Do you need immediate crisis support, a crisis hotline, or emergency mental health services?",
      "Substance Use & Addiction Recovery": "Are you looking for detox services, recovery programs, or ongoing addiction support?",
      "Housing & Shelter": "Are you looking for emergency shelter or transitional housing?",
      "Rent, Utility & Eviction Assistance": "Do you need help paying rent, utilities, or are you facing eviction?",
      "Food & Basic Needs": "Are you looking for food assistance, clothing, or other basic necessities?",
      "Employment Services": "Would you like job training, resume help, or employment placement services?",
      "Legal Services": "Are you looking for free legal help, such as a legal aid lawyer?",
      "Refugee & Immigrant Support": "Are you looking for refugee or immigrant services, like resettlement help or language assistance?",
      Veterans: "Are you looking for VA benefits, veteran housing, or veteran healthcare services?"
    },

    // Categories
    categories: {
      "Free & Charitable Medical Clinics": "free & charitable medical clinics",
      "Community Health Centers": "community health centers",
      "Mental Health (Non-Crisis)": "mental health (non-crisis)",
      "Crisis & Emergency Mental Health": "crisis & emergency mental health",
      "Substance Use & Addiction Recovery": "substance use & addiction recovery",
      "Housing & Shelter": "housing & shelter",
      "Rent, Utility & Eviction Assistance": "rent, utility & eviction assistance",
      "Food & Basic Needs": "food & basic needs",
      "Employment Services": "employment services",
      "Legal Services": "legal services",
      "Refugee & Immigrant Support": "refugee & immigrant support",
      Veterans: "veterans"
    },
    
    // Map popup labels
    mapPopup: {
      name: "Name",
      description: "Description",
      location: "Location",
      phone: "Phone",
      website: "Website",
      hours: "Hours"
    }
  },

  es: {
    // App title and headers
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - Buscador de Recursos Comunitarios",
    
    // Language selection modal
    languageModal: {
      title: "Bienvenido a Carelink+",
      subtitle: "Por favor selecciona tu idioma preferido",
      selectButton: "Continuar en {language}",
      close: "Cerrar"
    },
    
    // Navigation
    nav: {
      home: "Inicio",
      howItWorks: "Cómo Funciona",
      about: "Acerca de",
      contact: "Contacto",
      getHelp: "Obtener Ayuda Ahora"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "Escribe tu mensaje...",
      sendButton: "Enviar",
      mapTitle: "Ubicaciones de Recursos",
      resourcesTitle: "Recursos Disponibles",
      loading: "Cargando...",
      error: "Ocurrió un error. Por favor inténtalo de nuevo.",
      viewOnMap: "Ver en Mapa",
      getDirections: "Obtener Direcciones",
      callNow: "Llamar Ahora",
      website: "Visitar Sitio Web",
      distance: "Distancia",
      open: "Abierto",
      closed: "Cerrado",
      unknownHours: "Horarios no disponibles"
    },
    
    // Chat interface
    chat: {
      assistantTitle: "Asistente Carelink+",
      assistantSubtitle: "Aquí para ayudarte a encontrar recursos comunitarios"
    },
    
    // Session control menu
    session: {
      title: "Sesión",
      startOver: "Empezar de Nuevo",
      startOverDesc: "Conversación nueva",
      clearChat: "Borrar Chat",
      clearChatDesc: "Eliminar historial de mensajes",
      helpTips: "Ayuda y Consejos",
      helpTipsDesc: "Cómo usar Carelink+",
      endSession: "Finalizar Sesión",
      endSessionDesc: "Cerrar Carelink+"
    },
    
    // Process/How It Works Section
    process: {
      badge: "Proceso Simple",
      title: "Cómo Funciona",
      subtitle: "Conectarse a atención de calidad no tiene que ser confuso. Sigue estos tres pasos.",
      step1: {
        title: "Comparte Tus Necesidades",
        description: "Responde algunas preguntas cortas sobre lo que estás buscando. Esto puede incluir atención médica, seguro, comida, vivienda, o ayuda en tu idioma. No necesitas compartir documentos personales, y tu información se mantiene privada."
      },
      step2: {
        title: "Encuentra Ayuda Local Confiable",
        description: "Te conectamos con organizaciones comunitarias, clínicas y programas confiables cerca de ti que se adapten a tus necesidades. Nos enfocamos en servicios que son asequibles, acogedores, y disponibles en tu idioma preferido."
      },
      step3: {
        title: "Obtén Apoyo en el que Puedes Confiar",
        description: "Usa los recursos que compartimos o conéctate con voluntarios que pueden ayudarte a guiarte a través del proceso. Estamos aquí para hacer que el sistema sea más fácil de entender y para ayudarte a sentirte apoyado, no abrumado."
      }
    },
    
    // About Section
    about: {
      title: "Acerca de CareLink+",
      description: "Buscar ayuda no debe sentirse confuso o abrumador. Muchas personas enfrentan barreras como el idioma, el costo y sistemas desconocidos al tratar de acceder a atención médica y recursos básicos. Existimos para hacer ese proceso más fácil. Nuestra plataforma conecta a individuos y familias con servicios locales confiables, incluyendo atención médica, asistencia de seguros, programas de alimentos, apoyo de vivienda y organizaciones comunitarias. Creemos que todos merecen información clara y apoyo en el que puedan confiar, sin importar de dónde vengan o qué idioma hablen.",
      vision: {
        title: "Nuestra Visión",
        description: "Un futuro donde las personas puedan acceder a atención médica y recursos esenciales con confianza y claridad, sin miedo, confusión o barreras innecesarias."
      }
    },
    
    // Values Section
    values: {
      title: "Nuestros Valores",
      accessibility: {
        title: "Accesibilidad",
        description: "La información debe ser fácil de entender y estar disponible para todos, independientemente del idioma, ingresos o antecedentes."
      },
      respect: {
        title: "Respeto",
        description: "Todos merecen ser tratados con cuidado y comprensión al buscar ayuda."
      },
      equity: {
        title: "Equidad",
        description: "Estamos comprometidos a reducir las disparidades y ayudar a cerrar las brechas en el acceso a la atención y servicios esenciales."
      },
      trust: {
        title: "Confianza",
        description: "Priorizamos la privacidad, precisión y asociaciones con organizaciones que verdaderamente sirven a las comunidades."
      },
      community: {
        title: "Comunidad",
        description: "Creemos en la fuerza de las comunidades locales y trabajamos para conectar a las personas con sistemas de apoyo cercanos a casa."
      }
    },
    
    // Footer Section
    footer: {
      description: "Conectando comunidades a atención médica confiable y recursos esenciales con claridad y compasión.",
      quickLinks: "Enlaces Rápidos",
      support: "Apoyo",
      help: "Centro de Ayuda",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      accessibility: "Accesibilidad",
      copyright: "© 2025 CareLink+. Todos los derechos reservados.",
      emergency: "Para emergencias, llama al 911"
    },
    
    // Location services
    location: {
      servicesTitle: "Servicios de Ubicación:",
      enableNearMe: "Activar \"Cerca de Mí\"",
      nearMeActive: "✓ \"Cerca de Mí\" Activo",
      yourLocation: "Tu Ubicación",
      accuracy: "Precisión",
      zipCodePrompt: "Por favor ingresa tu código postal para encontrar recursos cerca de ti:",
      zipCodeSuccess: "¡Encontré la ubicación para el código postal {zipCode}! Ahora puedo mostrarte recursos cercanos.",
      zipCodeError: "No pude encontrar ese código postal ({zipCode}). Por favor intenta un código postal diferente o explora todos los recursos disponibles.",
      zipCodeInvalid: "Ese no parece ser un código postal válido. Por favor ingresa un código postal de 5 dígitos (ej. 12345) o formato ZIP+4 (ej. 12345-6789).",
      zipCodeFallback: "¡Aún puedo ayudarte a encontrar recursos! Puedes buscar por código postal o explorar todas las opciones disponibles."
    },
    
    // Forms
    forms: {
      helpFormTitle: "Solicitar Asistencia Personal",
      helpFormSubtitle: "Te conectaremos con alguien que pueda brindarte ayuda personalizada",
      step1Title: "Información Básica",
      step2Title: "Ubicación y Tus Necesidades",
      step3Title: "Detalles Adicionales",
      fullName: "Nombre Completo *",
      fullNamePlaceholder: "Ingresa tu nombre completo",
      phoneNumber: "Número de Teléfono *",
      phoneNumberPlaceholder: "(555) 123-4567",
      email: "Correo Electrónico (Opcional)",
      emailPlaceholder: "tu.correo@ejemplo.com",
      address: "Dirección/Código Postal *",
      addressPlaceholder: "Dirección o código postal",
      helpCategory: "¿Con qué necesitas ayuda? *",
      selectCategory: "-- Selecciona una categoría --",
      other: "Otro",
      helpDescription: "Describe tu situación *",
      helpDescriptionPlaceholder: "Por favor describe qué tipo de ayuda necesitas...",
      urgency: "¿Qué tan urgente es tu necesidad? *",
      selectUrgency: "-- Selecciona nivel de urgencia --",
      emergency: "Emergencia (Necesito ayuda hoy)",
      urgent: "Urgente (Necesito ayuda en una semana)",
      moderate: "Moderado (Necesito ayuda en un mes)",
      low: "Prioridad baja (Solo explorando opciones)",
      contactTime: "Mejor hora para contactarte",
      anytime: "Cualquier hora",
      morning: "Mañana (8AM - 12PM)",
      afternoon: "Tarde (12PM - 5PM)",
      evening: "Noche (5PM - 8PM)",
      additionalNotes: "Notas Adicionales (Opcional)",
      additionalNotesPlaceholder: "Cualquier otra información que nos ayude a asistirte...",
      privacyNotice: "🔒 Tu información será confidencial y solo se usará para conectarte con recursos y asistencia apropiados.",
      back: "Atrás",
      cancel: "Cancelar",
      next: "Siguiente",
      submit: "Enviar Solicitud",
      validationRequired: "Este campo es obligatorio",
      validationEmail: "Por favor ingresa un correo electrónico válido",
      validationPhone: "Por favor ingresa un número de teléfono válido"
    },
    
    // Bot responses
    bot: {
      welcome: "Puedo ayudarte a encontrar recursos para clínicas médicas gratuitas, centros de salud comunitarios, salud mental, crisis y salud mental de emergencia, recuperación de adicciones, vivienda y refugio, asistencia de alquiler y servicios públicos, alimentos y necesidades básicas, servicios de empleo, servicios legales, apoyo a refugiados e inmigrantes, o servicios para veteranos. ¿Con qué necesitas ayuda?",
      searchingResources: "Buscando recursos de {category} en tu área...",
      resourcesFound: "¡Encontré {count} recurso{plural} de {category} cerca de ti! Revisa el mapa arriba para ver sus ubicaciones. Haz clic en cualquier marcador para más detalles.",
      noResourcesFound: "Lo siento, no pude encontrar recursos de {category} mapeables en tu área ahora mismo. Esto puede ser porque:\n\n• Los recursos aún no tienen coordenadas de ubicación\n• Pueden estar listados bajo un nombre de categoría diferente\n• Los datos aún se están actualizando\n\nPuedes intentar preguntar por un tipo diferente de asistencia, o volver a intentar más tarde.",
      clarificationPrefix: "¡Perfecto! Buscando recursos de {category} en tu área...",
      needMoreInfo: "Quiero asegurarme de entender lo que necesitas. ¿Podrías decirme más específicamente qué tipo de ayuda buscas?",
      feedbackPrompt: "¿Esto te ayudó? ¿Encontraste lo que estabas buscando?",
      feedbackYes: "¡Sí, esto me ayudó!",
      feedbackNo: "Necesito más asistencia",
      feedbackThankYou: "¡Excelente! Nos alegra haber podido ayudarte.",
      offerPersonalHelp: "Permítenos conectarte con alguien que pueda brindarte asistencia personal.",
      noResourcesOffer: "Como no pudimos encontrar los recursos adecuados, ¿te gustaría que te conectemos con alguien que pueda ayudarte personalmente?",
      personalAssistance: "Me encantaría conectarte con alguien que pueda proporcionarte asistencia personalizada.",
      shareInfo: "¿Te gustaría compartir información básica para que podamos conectarte con los recursos y apoyo adecuados?",
      helpPrompt: "Puedes preguntarme sobre alimentos, vivienda, clínicas médicas, salud mental, ayuda legal, empleo, o cualquier otro recurso comunitario.",
      instructions: "Escribe 'comida', 'vivienda', 'clínica', 'ayuda con alquiler', o dime en qué necesitas ayuda.",
      foundResources: "Encontré {count} recursos para {category}",
      searchingFor: "Buscando recursos de {category}"
    },
    
    // Clarification questions
    clarifications: {
      "Free & Charitable Medical Clinics": "¿Buscas una clínica médica gratuita o sin cita previa para atención inmediata?",
      "Community Health Centers": "¿Buscas un centro de salud comunitario para atención continua, como un médico de cabecera?",
      "Mental Health (Non-Crisis)": "¿Buscas consejería, terapia, o apoyo de salud mental no urgente?",
      "Crisis & Emergency Mental Health": "¿Necesitas apoyo inmediato en crisis, una línea de crisis, o servicios de salud mental de emergencia?",
      "Substance Use & Addiction Recovery": "¿Buscas servicios de desintoxicación, programas de recuperación, o apoyo continuo para adicciones?",
      "Housing & Shelter": "¿Buscas refugio de emergencia o vivienda de transición?",
      "Rent, Utility & Eviction Assistance": "¿Necesitas ayuda para pagar el alquiler, los servicios públicos, o estás enfrentando un desalojo?",
      "Food & Basic Needs": "¿Buscas asistencia alimentaria, ropa, u otras necesidades básicas?",
      "Employment Services": "¿Te gustaría capacitación laboral, ayuda con currículum, o servicios de colocación laboral?",
      "Legal Services": "¿Buscas ayuda legal gratuita, como un abogado de asistencia legal?",
      "Refugee & Immigrant Support": "¿Buscas servicios para refugiados o inmigrantes, como ayuda de reasentamiento o asistencia con el idioma?",
      Veterans: "¿Buscas beneficios de VA, vivienda para veteranos, o servicios de atención médica para veteranos?"
    },

    // Categories
    categories: {
      "Free & Charitable Medical Clinics": "clínicas médicas gratuitas y de caridad",
      "Community Health Centers": "centros de salud comunitarios",
      "Mental Health (Non-Crisis)": "salud mental (no crisis)",
      "Crisis & Emergency Mental Health": "crisis y salud mental de emergencia",
      "Substance Use & Addiction Recovery": "uso de sustancias y recuperación de adicciones",
      "Housing & Shelter": "vivienda y refugio",
      "Rent, Utility & Eviction Assistance": "asistencia de alquiler, servicios y desalojo",
      "Food & Basic Needs": "alimentos y necesidades básicas",
      "Employment Services": "servicios de empleo",
      "Legal Services": "servicios legales",
      "Refugee & Immigrant Support": "apoyo a refugiados e inmigrantes",
      Veterans: "veteranos"
    },
    
    // Map popup labels
    mapPopup: {
      name: "Nombre",
      description: "Descripción",
      location: "Ubicación",
      phone: "Teléfono",
      website: "Sitio web",
      hours: "Horario"
    }
  },

  so: {
    // App title and headers (Somali)
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - Raadiye Agabka Bulshada",
    
    // Language selection modal
    languageModal: {
      title: "Ku soo dhawow Carelink+",
      subtitle: "Fadlan dooro luqadda aad door bidaysid",
      selectButton: "Ku sii wad {language}",
      close: "Xidh"
    },
    
    // Navigation
    nav: {
      home: "Guriga",
      howItWorks: "Sidee u Shaqeyso",
      about: "Ku Saabsan",
      contact: "Xiriir",
      getHelp: "Hel Caawimo Hadda"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "Qor fariintaada...",
      sendButton: "Dir",
      mapTitle: "Goobaha Agabka",
      resourcesTitle: "Agabka La Heli Karo",
      loading: "Waa la shubayaa...",
      error: "Qalad ayaa dhacay. Fadlan mar kale isku day.",
      viewOnMap: "Ku Arag Khariidadda",
      getDirections: "Hel Hagitaan",
      callNow: "Wac Hadda",
      website: "Booqo Bogga",
      distance: "Masaafada",
      open: "Furan",
      closed: "Xidhan",
      unknownHours: "Saacadaha lama yaqaan"
    },
    
    // Chat interface
    chat: {
      assistantTitle: "Caawinta Carelink+",
      assistantSubtitle: "Halkan ayaan kaa caawinayaa si aad u hesho agab bulsho"
    },
    
    // Session control menu
    session: {
      title: "Fadhiga",
      startOver: "Dib u billow",
      startOverDesc: "Wadahadal cusub",
      clearChat: "Nadiifi Wadahadalka",
      clearChatDesc: "Ka saar tariiqhda fariimaha",
      helpTips: "Caawimada & Tilmaamaha",
      helpTipsDesc: "Sida loo isticmaalo Carelink+",
      endSession: "Dhamaadka Fadhiga",
      endSessionDesc: "Xidh Carelink+"
    },
    
    // Process/How It Works Section
    process: {
      badge: "Habka Fudud",
      title: "Sidee u Shaqeyso",
      subtitle: "Ku xidhka daryeel tayo leh ma aha in uu noqdo mid wareeri leh. Raac saddexdan tallaabo.",
      step1: {
        title: "Wadaag Baahiyahaaga",
        description: "Ka jawaab dhowr su'aalood gaagaaban oo ku saabsan waxa aad raadinayso. Tan waxay ku dari kartaa daryeelka caafimaadka, caymiska, cuntada, guriga, ama caawimada luuqaddaada. Uma baahnid inaad wadaagto dukumentiyada gaarka ah, macluumaadkaaguna waa qarsoomi doonaan."
      },
      step2: {
        title: "Hel Caawimo Maxalli ah oo Aaminsan",
        description: "Waxaan kugu xidhaynaa hay'adaha bulshada, isbitaalada iyo barnaamijyada la aaminsan karo ee ku dhow ee u habboon baahiyahaaga. Waxaan diiradda saarnaa adeegyada jaban, soo dhaweyn, oo ku heli kara luuqaddaada la doortay."
      },
      step3: {
        title: "Hel Taageero aad Ku Kalsoon Karto",
        description: "Isticmaal agabka aan la wadaagno ama ku xidho mutadawiciinta kuu caawin kara inay ku hagaan habka. Waxaan halkan u joognaa si aan habka u fududeyno in la fahmo oo aan kaa caawino inaad dareemto taageero, ee aan ku curyaamin."
      }
    },
    
    // About Section
    about: {
      title: "Ku Saabsan CareLink+",
      description: "Caawimo raadinta ma aha inay noqoto mid wareeri ama culus. Dad badan ayaa wajaha caqabado sida luuqada, kharashka, iyo nidaamyada aan la aqoon marka ay isku dayaan inay helaan daryeelka caafimaadka iyo agabka aasaasiga ah. Waxaan u joognaa inaan habkaas u fududeyno. Barnameejeenku wuxuu ku xidhaa shakhsiyaadka iyo qoysaska adeegyo maxalli ah oo la aaminsan karo, oo ay ku jiraan daryeelka caafimaadka, caawimada caymiska, barnaamijyada cuntada, taageerada guriga, iyo hay'adaha bulshada. Waxaan rumaynaa in qof walba uu mudan yahay macluumaad cad iyo taageero ay ku kalsoon karaan, aan loo eegin halka ay ka yimaadeen ama luuqadda ay ku hadlaan.",
      vision: {
        title: "Aragtideenna",
        description: "Mustaqbal ay dadku u heli karaan daryeelka caafimaadka iyo agabka muhiimka ah kalsooni iyo caddayn, aan cabsi, wareeri, ama caqabado aan loo baahnayn."
      }
    },
    
    // Values Section
    values: {
      title: "Qiyameenkeenna",
      accessibility: {
        title: "Helitaan",
        description: "Macluumaadku waa inuu fudud u fahmi yahay oo uu u heli yahay qof kasta, aan loo eegin luuqada, dakhliga, ama asalka."
      },
      respect: {
        title: "Ixtiraam",
        description: "Qof walba wuxuu mudan yahay in loogu dhaqmo daryeel iyo faham marka uu caawimo raadinayo."
      },
      equity: {
        title: "Sinnaanta",
        description: "Waxaan u ballan qadnay inaan yareeyno farqiga oo aan ka caawinno xiritaanka farqiga gelitaanka daryeelka iyo adeegyada muhiimka ah."
      },
      trust: {
        title: "Kalsoonida",
        description: "Waxaan muhiim u dhignaa sirta, saxda, iyo iskaashi hay'ado run ahaan u adeega bulshada."
      },
      community: {
        title: "Bulshada",
        description: "Waxaan rumaynaa xoogga bulshada maxalliga ah oo aan ku shaqeyno inaan dadka ku xidho nidaamyada taageeraha ee guriga u dhow."
      }
    },
    
    // Footer Section
    footer: {
      description: "Ku xidhista bulshada daryeelka caafimaadka la aaminsan karo iyo agabka muhiimka ah caddayn iyo naxariis.",
      quickLinks: "Xiriirada Degdega ah",
      support: "Taageero",
      help: "Xarunta Caawimada",
      privacy: "Siyaasadda Sirta",
      terms: "Shuruudaha Adeegga",
      accessibility: "Helitaan",
      copyright: "© 2025 CareLink+. Dhammaan xuquuqda way dhowran yihiin.",
      emergency: "Xaaladaha degdegga ah, wac 911"
    },
    
    // Location services
    location: {
      servicesTitle: "Adeegyada Goobta:",
      enableNearMe: "Daar \"Ii Dhow\"",
      nearMeActive: "✓ \"Ii Dhow\" La Daray",
      yourLocation: "Goobtagaaga",
      accuracy: "Saxnaanta"
    },
    
    // Forms
    forms: {
      helpFormTitle: "Codsasho Caawimo Shakhsi ah",
      helpFormSubtitle: "Waxaan kuu xidhayaa qof ku siinaya caawimo shakhsi ah",
      step1Title: "Macluumaad Aasaasi ah",
      step2Title: "Goob iyo Baahiyahaaga",
      step3Title: "Faahfaahin Dheeraad ah",
      fullName: "Magaca Oo dhan *",
      fullNamePlaceholder: "Gali magacaaga oo dhan",
      phoneNumber: "Nambarka Telefoonka *",
      phoneNumberPlaceholder: "(555) 123-4567",
      email: "Ciwaanka Iimayl-ka (Ikhtiyaari)",
      emailPlaceholder: "email.kaaga@tusaale.com",
      address: "Cinwaanka/Koodka Boostada *",
      addressPlaceholder: "Cinwaanka wadada ama koodka boostada",
      helpCategory: "Maxaad u baahan tahay caawimo? *",
      selectCategory: "-- Dooro qaybta --",
      other: "Kan kale",
      helpDescription: "Sharax xaaladaada *",
      helpDescriptionPlaceholder: "Fadlan sharax nooca caawimada aad u baahan tahay...",
      urgency: "Sidee ayey u degdeg tahay baahidaadu? *",
      selectUrgency: "-- Dooro heerka degdegga ah --",
      emergency: "Degdeg (Waxaan u baahanahay caawimo maanta)",
      urgent: "Degdeg ah (Waxaan u baahanahay caawimo toddobaad gudahood)",
      moderate: "Dhexdhexaad ah (Waxaan u baahanahay caawimo bil gudahood)",
      low: "Mudnaanta hoose (Oo kaliya baadhaya ikhtiyaarada)",
      contactTime: "Waqtiga ugu fiican ee lagu soo waco",
      anytime: "Waqti kasta",
      morning: "Subax (8AM - 12PM)",
      afternoon: "Galabnimo (12PM - 5PM)",
      evening: "Fiidnimo (5PM - 8PM)",
      additionalNotes: "Xusuusyo Dheeraad ah (Ikhtiyaari)",
      additionalNotesPlaceholder: "Wax kale oo macluumaad ah oo naga caawin kara inaanu ku caawino...",
      privacyNotice: "🔒 Macluumaadkaaga waa la qarsoonnaan doonaa oo kaliya ayaa loo isticmaali doonaa inaad la xidho agabka iyo caawimada ku habboon.",
      back: "Dib u laabo",
      cancel: "Joojin",
      next: "Xiga",
      submit: "Soo dir codsashada",
      validationRequired: "Goobtan waa in la buuxiyaa",
      validationEmail: "Fadlan gali ciwaanka iimayl-ka saxda ah",
      validationPhone: "Fadlan gali nambarka telefoonka saxda ah"
    },
    
    // Bot responses
    bot: {
      welcome: "Waxaan kaa caawin karaa in aad hesho agab loogu talagalay kilinikyo caafimaad oo bilaash ah, xarumaha caafimaadka bulshada, caafimaadka maskaxda, xiisadaha degdegga ah, ka soo kabashada daroogada, guri iyo hoy, caawimada kirada iyo khidmadaha, cunto iyo baahiyaha aasaasiga, adeegyada shaqada, adeegyada sharci, taageerada qaxootiga iyo soo galootiga, ama adeegyada askarta hore. Maxaad u baahan tahay caawimo?",
      searchingResources: "Waan baadhayaa agabka {category} ee agagaaga ku yaal...",
      resourcesFound: "Waxaan helay {count} agab {category} oo ku dhow! Fiiri khariidadda kor ku taal si aad u aragto meelaha ay ku yaalliin. Gujii calaamad kasta si aad faahfaahin u hesho.",
      noResourcesFound: "Waan ka xunnahay, ma heli karo agab {category} oo khariidadda lagu saari karo oo agagaaga ah hadda. Taani waxay noqon kartaa sababtoo ah:\n\n• Agabku wali ma haysto tirtiro goob\n• Waxay u badan tahay inay ku qoran yihiin magac kale\n• Xogta wali waa la cusboneysiiinayaa\n\nWaxaad tijaabi kartaa inaad weydiiso caawimo kale, ama dib ugu soo noqo mar dambe.",
      clarificationPrefix: "Fiican! Waan raadiyaa agabka {category} ee agagaaga ku yaal...",
      needMoreInfo: "Waxaan doonayaa inaan hubsado waxa aad u baahan tahay. Miyaad ii sheegi kartaa si tafatiran waxa aad raadinayso?",
      feedbackPrompt: "Tani miyey kaa caawinay? Miyaad heeshay waxa aad raadinaysay?",
      feedbackYes: "Haa, tani wey i caawinay!",
      feedbackNo: "Waxaan u baahanahay caawimo dheeraad ah",
      feedbackThankYou: "Fiican! Waan ku faraxsan nahay inaan ku caawin karney.",
      offerPersonalHelp: "Waxaan kuu ogolaaneyn in aan ku xidhno qof ku siinaya caawimo shakhsi ah.",
      noResourcesOffer: "Maadaama aanan ka helin agabkii saxda ahaa, miyaad jeclaanahayd inaan ku xidhno qof ku caawin kara si shakhsi ah?",
      personalAssistance: "Waxaan ku farxi lahaa inaan ku xidhno qof ku siini kara caawimo gaara ah.",
      shareInfo: "Miyaad jeclaanahayd inaad wadaagto macluumaad aasaasi ah si aan kuugu xidhno agabka iyo taageerada ku habboon?",
      helpPrompt: "Waxaad i weydiin kartaa wax ku saabsan cunto, guri, kilinik caafimaad, caafimaadka maskaxda, caawimo sharci, shaqo, ama agab kale oo bulsho.",
      instructions: "Qor 'cunto', 'guri', 'kilinik', 'caawimo kiro', ama ii sheeg waxa aad u baahan tahay caawimo.",
      foundResources: "Waxaan helay {count} agab loogu talagalay {category}",
      searchingFor: "Raadinta agabka {category}"
    },
    
    // Clarification questions
    clarifications: {
      "Free & Charitable Medical Clinics": "Miyaad raadinaysaa kilinik caafimaad oo bilaash ah ama aan ballan loo qaban doonin?",
      "Community Health Centers": "Miyaad raadinaysaa xarun caafimaad oo bulsho ah oo daryeel joogto ah, sida dhakhtar qoys?",
      "Mental Health (Non-Crisis)": "Miyaad raadinaysaa la-talin, daaweyn, ama taageero caafimaad maskaxda oo aan degdeg ahayn?",
      "Crisis & Emergency Mental Health": "Miyaad u baahan tahay taageero xiisad oo degdeg ah, khadka xiisadaha, ama adeegyo caafimaad maskaxda oo degdeg ah?",
      "Substance Use & Addiction Recovery": "Miyaad raadinaysaa adeegyada nadiifeynta jidhka, barnaamijyada soo kabashadhka, ama taageero joogto ah ee iska-ceejinta?",
      "Housing & Shelter": "Miyaad raadinaysaa hoy degdeg ah ama guri ku meel gaar ah?",
      "Rent, Utility & Eviction Assistance": "Miyaad u baahan tahay caawimo lacag-bixinta kirada, khidmadaha, ama miyaad wajahaysaa eryid?",
      "Food & Basic Needs": "Miyaad raadinaysaa caawimada cuntada, dharka, ama baahiyaha aasaasiga ah ee kale?",
      "Employment Services": "Miyaad jeclaan lahayd tababar shaqo, caawimo resume, ama adeegyada heleynta shaqo?",
      "Legal Services": "Miyaad raadinaysaa caawimo sharci oo bilaash ah, sida qareen caawimo sharci?",
      "Refugee & Immigrant Support": "Miyaad raadinaysaa adeegyada qaxootiga ama soo galootiga, sida caawimada dib-u-dejinta ama caawimada luuqadda?",
      Veterans: "Miyaad raadinaysaa faa'iidooyinka VA, guri askari, ama adeegyada daryeelka caafimaadka askarta?"
    },

    // Categories
    categories: {
      "Free & Charitable Medical Clinics": "kilinikyo caafimaad oo bilaash ah",
      "Community Health Centers": "xarumaha caafimaadka bulshada",
      "Mental Health (Non-Crisis)": "caafimaadka maskaxda (aan xiisad ahayn)",
      "Crisis & Emergency Mental Health": "xiisadaha iyo caafimaadka maskaxda ee degdegga ah",
      "Substance Use & Addiction Recovery": "isticmaalka daroogada iyo soo kabashada",
      "Housing & Shelter": "guri iyo hoy",
      "Rent, Utility & Eviction Assistance": "caawimada kirada, khidmadaha iyo eryidda",
      "Food & Basic Needs": "cunto iyo baahiyaha aasaasiga ah",
      "Employment Services": "adeegyada shaqada",
      "Legal Services": "adeegyada sharciga",
      "Refugee & Immigrant Support": "taageerada qaxootiga iyo soo galootiga",
      Veterans: "askarta hore"
    },
    
    // Map popup labels
    mapPopup: {
      name: "Magaca",
      description: "Sharaxaad",
      location: "Goob",
      phone: "Telefoon",
      website: "Bogga internetka",
      hours: "Saacadaha"
    }
  },

  ar: {
    // App title and headers (Arabic)
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - محدد موارد المجتمع",
    
    // Language selection modal
    languageModal: {
      title: "مرحباً بك في Carelink+",
      subtitle: "يرجى اختيار لغتك المفضلة",
      selectButton: "المتابعة باللغة {language}",
      close: "إغلاق"
    },
    
    // Navigation
    nav: {
      home: "الرئيسية",
      howItWorks: "كيف تعمل",
      about: "حول",
      contact: "اتصل",
      getHelp: "احصل على المساعدة الآن"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "اكتب رسالتك...",
      sendButton: "إرسال",
      mapTitle: "مواقع الموارد",
      resourcesTitle: "الموارد المتاحة",
      loading: "جاري التحميل...",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
      viewOnMap: "عرض على الخريطة",
      getDirections: "الحصول على الاتجاهات",
      callNow: "اتصل الآن",
      website: "زيارة الموقع",
      distance: "المسافة",
      open: "مفتوح",
      closed: "مغلق",
      unknownHours: "الساعات غير متاحة"
    },
    
    // Chat interface
    chat: {
      assistantTitle: "مساعد Carelink+",
      assistantSubtitle: "هنا لمساعدتك في العثور على الموارد المجتمعية"
    },
    
    // Session control menu
    session: {
      title: "الجلسة",
      startOver: "البدء من جديد",
      startOverDesc: "محادثة جديدة",
      clearChat: "مسح الدردشة",
      clearChatDesc: "إزالة تاريخ الرسائل",
      helpTips: "المساعدة والنصائح",
      helpTipsDesc: "كيفية استخدام Carelink+",
      endSession: "إنهاء الجلسة",
      endSessionDesc: "إغلاق Carelink+"
    },
    
    // Process/How It Works Section
    process: {
      badge: "عملية بسيطة",
      title: "كيف تعمل",
      subtitle: "الحصول على الرعاية الجيدة ليس بالأمر المعقد. اتبع هذه الخطوات الثلاث.",
      step1: {
        title: "شارك احتياجاتك",
        description: "أجب على بعض الأسئلة القصيرة حول ما تبحث عنه. يمكن أن يشمل ذلك الرعاية الصحية أو التأمين أو الطعام أو الإسكان أو المساعدة بلغتك. لا تحتاج إلى مشاركة الوثائق الشخصية، ومعلوماتك تبقى خاصة."
      },
      step2: {
        title: "اعثر على المساعدة المحلية الموثوقة",
        description: "نربطك بالمنظمات المجتمعية والعيادات والبرامج الموثوقة بالقرب منك التي تناسب احتياجاتك. نركز على الخدمات التي تكون ميسورة التكلفة ومرحبة ومتوفرة بلغتك المفضلة."
      },
      step3: {
        title: "احصل على الدعم الذي يمكنك الوثوق به",
        description: "استخدم الموارد التي نشاركها أو تواصل مع المتطوعين الذين يمكنهم مساعدتك أكثر في توجيهك خلال العملية. نحن هنا لجعل النظام أسهل للفهم ولمساعدتك على الشعور بالدعم، وليس الإرهاق."
      }
    },
    
    // About Section
    about: {
      title: "حول CareLink+",
      description: "البحث عن المساعدة يجب ألا يكون مشوشاً أو مرهقاً. العديد من الناس يواجهون حواجز مثل اللغة والتكلفة والأنظمة غير المألوفة عند محاولة الحصول على الرعاية الصحية والموارد الأساسية. نحن موجودون لجعل هذه العملية أسهل. منصتنا تربط الأفراد والعائلات بخدمات محلية موثوقة، تشمل الرعاية الصحية ومساعدة التأمين وبرامج الطعام ودعم الإسكان والمنظمات المجتمعية. نؤمن أن كل شخص يستحق معلومات واضحة ودعم يمكنه الوثوق به، بغض النظر عن مكان مجيئهم أو اللغة التي يتحدثون بها.",
      vision: {
        title: "رؤيتنا",
        description: "مستقبل يمكن للناس فيه الوصول إلى الرعاية الصحية والموارد الأساسية بثقة ووضوح، بدون خوف أو تشويش أو حواجز غير ضرورية."
      }
    },
    
    // Values Section
    values: {
      title: "قيمنا",
      accessibility: {
        title: "إمكانية الوصول",
        description: "يجب أن تكون المعلومات سهلة الفهم ومتاحة للجميع، بغض النظر عن اللغة أو الدخل أو الخلفية."
      },
      respect: {
        title: "الاحترام",
        description: "يستحق الجميع أن يُعاملوا بعناية وفهم عند طلب المساعدة."
      },
      equity: {
        title: "العدالة",
        description: "نحن ملتزمون بتقليل التفاوتات والمساعدة في سد الفجوات في الوصول إلى الرعاية والخدمات الأساسية."
      },
      trust: {
        title: "الثقة",
        description: "نولي أولوية للخصوصية والدقة والشراكات مع المنظمات التي تخدم المجتمعات حقاً."
      },
      community: {
        title: "المجتمع",
        description: "نؤمن بقوة المجتمعات المحلية ونعمل على ربط الناس بأنظمة الدعم القريبة من المنزل."
      }
    },
    
    // Footer Section
    footer: {
      description: "ربط المجتمعات بالرعاية الصحية الموثوقة والموارد الأساسية بوضوح ورحمة.",
      quickLinks: "روابط سريعة",
      support: "الدعم",
      help: "مركز المساعدة",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      accessibility: "إمكانية الوصول",
      copyright: "© 2025 CareLink+. جميع الحقوق محفوظة.",
      emergency: "للطوارئ، اتصل بـ 911"
    },
    
    // Location services
    location: {
      servicesTitle: "خدمات الموقع:",
      enableNearMe: "تفعيل \"بالقرب مني\"",
      nearMeActive: "✓ \"بالقرب مني\" مفعل",
      yourLocation: "موقعك",
      accuracy: "الدقة"
    },
    
    // Forms
    forms: {
      helpFormTitle: "طلب مساعدة شخصية",
      helpFormSubtitle: "سنوصلك بشخص يمكنه تقديم مساعدة شخصية",
      step1Title: "المعلومات الأساسية",
      step2Title: "الموقع واحتياجاتك",
      step3Title: "تفاصيل إضافية",
      fullName: "الاسم الكامل *",
      fullNamePlaceholder: "أدخل اسمك الكامل",
      phoneNumber: "رقم الهاتف *",
      phoneNumberPlaceholder: "(555) 123-4567",
      email: "عنوان البريد الإلكتروني (اختياري)",
      emailPlaceholder: "your.email@example.com",
      address: "العنوان/الرمز البريدي *",
      addressPlaceholder: "عنوان الشارع أو الرمز البريدي",
      helpCategory: "بماذا تحتاج المساعدة؟ *",
      selectCategory: "-- اختر فئة --",
      other: "أخرى",
      helpDescription: "صف حالتك *",
      helpDescriptionPlaceholder: "يرجى وصف نوع المساعدة التي تحتاجها...",
      urgency: "ما مدى إلحاح حاجتك؟ *",
      selectUrgency: "-- اختر مستوى الإلحاح --",
      emergency: "طوارئ (أحتاج مساعدة اليوم)",
      urgent: "عاجل (أحتاج مساعدة خلال أسبوع)",
      moderate: "متوسط (أحتاج مساعدة خلال شهر)",
      low: "أولوية منخفضة (أستكشف الخيارات فقط)",
      contactTime: "أفضل وقت للتواصل معك",
      anytime: "أي وقت",
      morning: "الصباح (8AM - 12PM)",
      afternoon: "بعد الظهر (12PM - 5PM)",
      evening: "المساء (5PM - 8PM)",
      additionalNotes: "ملاحظات إضافية (اختياري)",
      additionalNotesPlaceholder: "أي معلومات أخرى قد تساعدنا في مساعدتك...",
      privacyNotice: "🔒 ستبقى معلوماتك سرية وستستخدم فقط لربطك بالموارد والمساعدة المناسبة.",
      back: "العودة",
      cancel: "إلغاء",
      next: "التالي",
      submit: "إرسال الطلب",
      validationRequired: "هذا الحقل مطلوب",
      validationEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
      validationPhone: "يرجى إدخال رقم هاتف صحيح"
    },
    
    // Bot responses
    bot: {
      welcome: "يمكنني مساعدتك في العثور على موارد للعيادات الطبية المجانية، مراكز صحة المجتمع، الصحة النفسية، الأزمات والصحة النفسية الطارئة، التعافي من الإدمان، الإسكان والمأوى، مساعدة الإيجار والمرافق، الطعام والاحتياجات الأساسية، خدمات التوظيف، الخدمات القانونية، دعم اللاجئين والمهاجرين، أو خدمات المحاربين القدامى. بماذا تحتاج المساعدة؟",
      searchingResources: "البحث عن موارد {category} في منطقتك...",
      resourcesFound: "تم العثور على {count} مورد {category} بالقرب منك! تحقق من الخريطة أعلاه لرؤية مواقعها. انقر على أي علامة للحصول على تفاصيل أكثر.",
      noResourcesFound: "أعتذر، لا يمكنني العثور على أي موارد {category} قابلة للرسم على الخريطة في منطقتك الآن. قد يكون هذا بسبب:\n\n• الموارد ليس لديها إحداثيات الموقع بعد\n• قد تكون مدرجة تحت اسم فئة مختلف\n• البيانات ما زالت يجري تحديثها\n\nيمكنك محاولة السؤال عن نوع مختلف من المساعدة، أو العودة لاحقاً.",
      clarificationPrefix: "ممتاز! البحث عن موارد {category} في منطقتك...",
      needMoreInfo: "أريد التأكد من فهم ما تحتاجه. هل يمكنك إخباري بشكل أكثر تحديداً عن نوع المساعدة التي تبحث عنها؟",
      feedbackPrompt: "هل كان هذا مفيداً؟ هل وجدت ما كنت تبحث عنه؟",
      feedbackYes: "نعم، هذا ساعدني!",
      feedbackNo: "أحتاج مساعدة أكثر",
      feedbackThankYou: "ممتاز! يسرنا أن نكون قد تمكنا من مساعدتك.",
      offerPersonalHelp: "دعنا نربطك بشخص يمكنه تقديم المساعدة الشخصية.",
      noResourcesOffer: "بما أننا لم نتمكن من العثور على الموارد المناسبة، هل تريد أن نربطك بشخص يمكنه مساعدتك شخصياً؟",
      personalAssistance: "سأكون سعيداً لربطك بشخص يمكنه تقديم المساعدة الشخصية.",
      shareInfo: "هل تود مشاركة بعض المعلومات الأساسية حتى نتمكن من ربطك بالموارد والدعم المناسبين؟",
      helpPrompt: "يمكنك أن تسألني عن الطعام أو الإسكان أو العيادات الطبية أو الصحة النفسية أو المساعدة القانونية أو التوظيف أو أي موارد مجتمعية أخرى.",
      instructions: "اكتب 'طعام' أو 'إسكان' أو 'عيادة' أو 'مساعدة إيجار' أو أخبرني بما تحتاج للمساعدة فيه.",
      foundResources: "وجدت {count} مورد لـ {category}",
      searchingFor: "البحث عن موارد {category}"
    },
    
    // Clarification questions
    clarifications: {
      "Free & Charitable Medical Clinics": "هل تبحث عن عيادة طبية مجانية أو بدون موعد للرعاية الفورية؟",
      "Community Health Centers": "هل تبحث عن مركز صحة مجتمعي للرعاية المستمرة، مثل طبيب العائلة؟",
      "Mental Health (Non-Crisis)": "هل تبحث عن استشارة أو علاج أو دعم صحة نفسية غير طارئ؟",
      "Crisis & Emergency Mental Health": "هل تحتاج دعم أزمة فوري أو خط أزمة أو خدمات صحة نفسية طارئة؟",
      "Substance Use & Addiction Recovery": "هل تبحث عن خدمات إزالة السموم أو برامج التعافي أو الدعم المستمر للإدمان؟",
      "Housing & Shelter": "هل تبحث عن مأوى طارئ أو سكن انتقالي؟",
      "Rent, Utility & Eviction Assistance": "هل تحتاج مساعدة في دفع الإيجار أو المرافق أو تواجه إخلاء؟",
      "Food & Basic Needs": "هل تبحث عن مساعدة غذائية أو ملابس أو احتياجات أساسية أخرى؟",
      "Employment Services": "هل تود التدريب المهني أو مساعدة في السيرة الذاتية أو خدمات التوظيف؟",
      "Legal Services": "هل تبحث عن مساعدة قانونية مجانية، مثل محامي مساعدة قانونية؟",
      "Refugee & Immigrant Support": "هل تبحث عن خدمات للاجئين أو المهاجرين، مثل مساعدة إعادة التوطين أو المساعدة اللغوية؟",
      Veterans: "هل تبحث عن مزايا VA أو إسكان المحاربين القدامى أو خدمات الرعاية الصحية للمحاربين القدامى؟"
    },

    // Categories
    categories: {
      "Free & Charitable Medical Clinics": "عيادات طبية مجانية وخيرية",
      "Community Health Centers": "مراكز صحة المجتمع",
      "Mental Health (Non-Crisis)": "صحة نفسية (غير طارئة)",
      "Crisis & Emergency Mental Health": "الأزمات والصحة النفسية الطارئة",
      "Substance Use & Addiction Recovery": "تعاطي المواد والتعافي من الإدمان",
      "Housing & Shelter": "إسكان ومأوى",
      "Rent, Utility & Eviction Assistance": "مساعدة الإيجار والمرافق والإخلاء",
      "Food & Basic Needs": "طعام واحتياجات أساسية",
      "Employment Services": "خدمات التوظيف",
      "Legal Services": "خدمات قانونية",
      "Refugee & Immigrant Support": "دعم اللاجئين والمهاجرين",
      Veterans: "محاربون قدامى"
    },
    
    // Map popup labels
    mapPopup: {
      name: "الاسم",
      description: "الوصف",
      location: "الموقع",
      phone: "الهاتف",
      website: "الموقع الإلكتروني",
      hours: "ساعات العمل"
    }
  },

  hi: {
    // App title and headers (Hindi)
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - सामुदायिक संसाधन खोजक",
    
    // Language selection modal
    languageModal: {
      title: "Carelink+ में आपका स्वागत है",
      subtitle: "कृपया अपनी पसंदीदा भाषा चुनें",
      selectButton: "{language} में जारी रखें",
      close: "बंद करें"
    },
    
    // Navigation
    nav: {
      home: "होम",
      howItWorks: "यह कैसे काम करता है",
      about: "के बारे में",
      contact: "संपर्क",
      getHelp: "अभी सहायता पाएं"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "अपना संदेश लिखें...",
      sendButton: "भेजें",
      mapTitle: "संसाधन स्थान",
      resourcesTitle: "उपलब्ध संसाधन",
      loading: "लोड हो रहा है...",
      error: "एक त्रुटि हुई है। कृपया पुनः प्रयास करें।",
      viewOnMap: "नक्शे पर देखें",
      getDirections: "दिशा निर्देश प्राप्त करें",
      callNow: "अभी कॉल करें",
      website: "वेबसाइट पर जाएं",
      distance: "दूरी",
      open: "खुला",
      closed: "बंद",
      unknownHours: "समय उपलब्ध नहीं"
    },
    
    // Chat interface
    chat: {
      assistantTitle: "Carelink+ सहायक",
      assistantSubtitle: "यहाँ आपको सामुदायिक संसाधन खोजने में मदद करने के लिए हैं"
    },
    
    // Session control menu
    session: {
      title: "सेशन",
      startOver: "नए सिरे से शुरू करें",
      startOverDesc: "नई बातचीत",
      clearChat: "चैट साफ़ करें",
      clearChatDesc: "संदेश इतिहास हटाएं",
      helpTips: "सहायता और सुझाव",
      helpTipsDesc: "Carelink+ का उपयोग कैसे करें",
      endSession: "सेशन समाप्त करें",
      endSessionDesc: "Carelink+ बंद करें"
    },
    
    // Process/How It Works Section
    process: {
      badge: "सरल प्रक्रिया",
      title: "यह कैसे काम करता है",
      subtitle: "गुणवत्तापूर्ण देखभाल से जुड़ना भ्रमित करने वाला नहीं होना चाहिए। इन तीन चरणों का पालन करें।",
      step1: {
        title: "अपनी जरूरतें साझा करें",
        description: "आप क्या खोज रहे हैं, इसके बारे में कुछ छोटे प्रश्नों के उत्तर दें। इसमें स्वास्थ्य सेवा, बीमा, भोजन, आवास, या आपकी भाषा में सहायता शामिल हो सकती है। आपको व्यक्तिगत दस्तावेज़ साझा करने की आवश्यकता नहीं है, और आपकी जानकारी निजी रहती है।"
      },
      step2: {
        title: "भरोसेमंद स्थानीय सहायता खोजें",
        description: "हम आपको आपके पास के विश्वसनीय सामुदायिक संगठनों, क्लीनिकों और कार्यक्रमों से जोड़ते हैं जो आपकी आवश्यकताओं के अनुकूल हैं। हम उन सेवाओं पर ध्यान देते हैं जो किफायती, स्वागत करने वाली, और आपकी पसंदीदा भाषा में उपलब्ध हैं।"
      },
      step3: {
        title: "ऐसा समर्थन पाएं जिस पर आप भरोसा कर सकें",
        description: "हमारे द्वारा साझा किए गए संसाधनों का उपयोग करें या उन स्वयंसेवकों से जुड़ें जो प्रक्रिया के माध्यम से आपकी मार्गदर्शन में और मदद कर सकते हैं। हम यहाँ सिस्टम को समझने में आसान बनाने और आपको अभिभूत नहीं, बल्कि समर्थित महसूस कराने के लिए हैं।"
      }
    },
    
    // About Section
    about: {
      title: "CareLink+ के बारे में",
      description: "सहायता मांगना भ्रमित करने वाला या भारी नहीं होना चाहिए। कई लोग स्वास्थ्य सेवा और बुनियादी संसाधनों तक पहुंचने की कोशिश करते समय भाषा, लागत और अपरिचित प्रणालियों जैसी बाधाओं का सामना करते हैं। हम उस प्रक्रिया को आसान बनाने के लिए मौजूद हैं। हमारा प्लेटफ़ॉर्म व्यक्तियों और परिवारों को विश्वसनीय स्थानीय सेवाओं से जोड़ता है, जिसमें स्वास्थ्य सेवा, बीमा सहायता, भोजन कार्यक्रम, आवास सहायता और सामुदायिक संगठन शामिल हैं। हमारा मानना है कि हर व्यक्ति स्पष्ट जानकारी और सहायता का हकदार है जिस पर वे भरोसा कर सकते हैं, चाहे वे कहीं से भी आएं या कोई भी भाषा बोलते हों।",
      vision: {
        title: "हमारा दृष्टिकोण",
        description: "एक भविष्य जहां लोग बिना डर, भ्रम या अनावश्यक बाधाओं के, विश्वास और स्पष्टता के साथ स्वास्थ्य सेवा और आवश्यक संसाधनों तक पहुंच सकें।"
      }
    },
    
    // Values Section
    values: {
      title: "हमारे मूल्य",
      accessibility: {
        title: "पहुंच",
        description: "जानकारी समझने में आसान होनी चाहिए और सभी के लिए उपलब्ध होनी चाहिए, चाहे भाषा, आय या पृष्ठभूमि कुछ भी हो।"
      },
      respect: {
        title: "सम्मान",
        description: "सहायता मांगते समय हर व्यक्ति देखभाल और समझ के साथ व्यवहार पाने का हकदार है।"
      },
      equity: {
        title: "समानता",
        description: "हम असमानताओं को कम करने और देखभाल और आवश्यक सेवाओं तक पहुंच में अंतराल को बंद करने में मदद करने के लिए प्रतिबद्ध हैं।"
      },
      trust: {
        title: "भरोसा",
        description: "हम गोपनीयता, सटीकता और उन संगठनों के साथ साझेदारी को प्राथमिकता देते हैं जो वास्तव में समुदायों की सेवा करते हैं।"
      },
      community: {
        title: "समुदाय",
        description: "हम स्थानीय समुदायों की शक्ति में विश्वास करते हैं और लोगों को घर के पास सहायता प्रणालियों से जोड़ने का काम करते हैं।"
      }
    },
    
    // Footer Section
    footer: {
      description: "स्पष्टता और करुणा के साथ समुदायों को विश्वसनीय स्वास्थ्य सेवा और आवश्यक संसाधनों से जोड़ना।",
      quickLinks: "त्वरित लिंक",
      support: "सहायता",
      help: "सहायता केंद्र",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      accessibility: "पहुंच",
      copyright: "© 2025 CareLink+. सभी अधिकार सुरक्षित।",
      emergency: "आपातकाल के लिए, 911 पर कॉल करें"
    },
    
    // Location services
    location: {
      servicesTitle: "स्थान सेवाएं:",
      enableNearMe: "\"मेरे पास\" सक्षम करें",
      nearMeActive: "✓ \"मेरे पास\" सक्रिय",
      yourLocation: "आपका स्थान",
      accuracy: "सटीकता"
    },
    
    // Forms
    forms: {
      helpFormTitle: "व्यक्तिगत सहायता का अनुरोध",
      helpFormSubtitle: "हम आपको किसी ऐसे व्यक्ति से जोड़ेंगे जो व्यक्तिगत सहायता प्रदान कर सकता है",
      step1Title: "मूलभूत जानकारी",
      step2Title: "स्थान और आपकी आवश्यकताएं",
      step3Title: "अतिरिक्त विवरण",
      fullName: "पूरा नाम *",
      fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
      phoneNumber: "फोन नंबर *",
      phoneNumberPlaceholder: "(555) 123-4567",
      email: "ईमेल पता (वैकल्पिक)",
      emailPlaceholder: "your.email@example.com",
      address: "पता/पिन कोड *",
      addressPlaceholder: "सड़क का पता या पिन कोड",
      helpCategory: "आपको किस चीज़ में मदद चाहिए? *",
      selectCategory: "-- एक श्रेणी चुनें --",
      other: "अन्य",
      helpDescription: "अपनी स्थिति का वर्णन करें *",
      helpDescriptionPlaceholder: "कृपया बताएं कि आपको किस प्रकार की सहायता चाहिए...",
      urgency: "आपकी आवश्यकता कितनी तत्काल है? *",
      selectUrgency: "-- तत्कालता का स्तर चुनें --",
      emergency: "आपातकाल (आज ही मदद चाहिए)",
      urgent: "तत्काल (एक सप्ताह के भीतर मदद चाहिए)",
      moderate: "मध्यम (एक महीने के भीतर मदद चाहिए)",
      low: "कम प्राथमिकता (सिर्फ विकल्प देख रहे हैं)",
      contactTime: "आपसे संपर्क करने का सबसे अच्छा समय",
      anytime: "कभी भी",
      morning: "सुबह (8AM - 12PM)",
      afternoon: "दोपहर (12PM - 5PM)",
      evening: "शाम (5PM - 8PM)",
      additionalNotes: "अतिरिक्त नोट्स (वैकल्पिक)",
      additionalNotesPlaceholder: "कोई अन्य जानकारी जो हमारी आपकी सहायता में मदद कर सकती है...",
      privacyNotice: "🔒 आपकी जानकारी गुप्त रखी जाएगी और केवल आपको उचित संसाधनों और सहायता से जोड़ने के लिए उपयोग की जाएगी।",
      back: "वापस",
      cancel: "रद्द करें",
      next: "अगला",
      submit: "अनुरोध भेजें",
      validationRequired: "यह फील्ड आवश्यक है",
      validationEmail: "कृपया एक वैध ईमेल पता दर्ज करें",
      validationPhone: "कृपया एक वैध फोन नंबर दर्ज करें"
    },
    
    // Bot responses
    bot: {
      welcome: "मैं आपको मुफ्त चिकित्सा क्लीनिक, सामुदायिक स्वास्थ्य केंद्र, मानसिक स्वास्थ्य सहायता, संकट और आपातकालीन मानसिक स्वास्थ्य, नशा मुक्ति, आवास और आश्रय, किराया और उपयोगिता सहायता, भोजन और बुनियादी जरूरतें, रोजगार सेवाएं, कानूनी सेवाएं, शरणार्थी और प्रवासी सहायता, या पूर्व सैनिक सेवाओं के लिए संसाधन खोजने में मदद कर सकता हूं। आपको किस चीज़ में मदद चाहिए?",
      searchingResources: "आपके क्षेत्र में {category} संसाधन खोज रहे हैं...",
      resourcesFound: "आपके पास {count} {category} संसाधन मिले! उनके स्थानों को देखने के लिए ऊपर का नक्शा देखें। अधिक विवरण के लिए किसी भी मार्कर पर क्लिक करें।",
      noResourcesFound: "मुझे खुशी है, मैं आपके क्षेत्र में अभी कोई मानचित्र योग्य {category} संसाधन नहीं ढूंढ सका। यह इसलिए हो सकता है:\n\n• संसाधनों के पास अभी तक स्थान निर्देशांक नहीं हैं\n• वे एक अलग श्रेणी नाम के तहत सूचीबद्ध हो सकते हैं\n• डेटा अभी भी अपडेट हो रहा है\n\nआप एक अलग प्रकार की सहायता मांगने की कोशिश कर सकते हैं, या बाद में वापस आ सकते हैं।",
      clarificationPrefix: "बहुत बढ़िया! आपके क्षेत्र में {category} संसाधन खोज रहे हैं...",
      needMoreInfo: "मैं यह सुनिश्चित करना चाहता हूं कि मैं समझ गया हूं कि आपको क्या चाहिए। क्या आप मुझे और विशेष रूप से बता सकते हैं कि आप किस प्रकार की मदद की तलाश कर रहे हैं?",
      feedbackPrompt: "क्या यह सहायक था? क्या आपको वह मिला जिसकी आप तलाश कर रहे थे?",
      feedbackYes: "हां, इससे मदद मिली!",
      feedbackNo: "मुझे और सहायता चाहिए",
      feedbackThankYou: "बहुत बढ़िया! हमें खुशी है कि हम आपकी मदद कर सके।",
      offerPersonalHelp: "आइए हम आपको किसी ऐसे व्यक्ति से जोड़ते हैं जो व्यक्तिगत सहायता प्रदान कर सकता है।",
      noResourcesOffer: "चूंकि हम सही संसाधन नहीं ढूंढ सके, क्या आप चाहेंगे कि हम आपको किसी ऐसे व्यक्ति से जोड़ें जो व्यक्तिगत रूप से आपकी सहायता कर सकता है?",
      personalAssistance: "मुझे खुशी होगी आपको किसी ऐसे व्यक्ति से जोड़ने में जो व्यक्तिगत सहायता प्रदान कर सकता है।",
      shareInfo: "क्या आप कुछ बुनियादी जानकारी साझा करना चाहेंगे ताकि हम आपको सही संसाधनों और सहायता से जोड़ सकें?",
      helpPrompt: "आप मुझसे भोजन, आवास, चिकित्सा क्लीनिक, मानसिक स्वास्थ्य, कानूनी सहायता, रोजगार, या किसी अन्य सामुदायिक संसाधन के बारे में पूछ सकते हैं।",
      instructions: "'भोजन', 'आवास', 'क्लीनिक', 'किराया सहायता' टाइप करें, या बताएं कि आपको किस चीज़ में मदद चाहिए।",
      foundResources: "मैंने {category} के लिए {count} संसाधन पाए",
      searchingFor: "{category} संसाधन खोज रहे हैं"
    },
    
    // Clarification questions
    clarifications: {
      "Free & Charitable Medical Clinics": "क्या आप तत्काल देखभाल के लिए मुफ्त या वॉक-इन चिकित्सा क्लीनिक की तलाश कर रहे हैं?",
      "Community Health Centers": "क्या आप निरंतर देखभाल के लिए सामुदायिक स्वास्थ्य केंद्र की तलाश कर रहे हैं, जैसे पारिवारिक डॉक्टर?",
      "Mental Health (Non-Crisis)": "क्या आप परामर्श, चिकित्सा, या गैर-आपातकालीन मानसिक स्वास्थ्य सहायता की तलाश कर रहे हैं?",
      "Crisis & Emergency Mental Health": "क्या आपको तत्काल संकट सहायता, संकट हॉटलाइन, या आपातकालीन मानसिक स्वास्थ्य सेवाओं की आवश्यकता है?",
      "Substance Use & Addiction Recovery": "क्या आप डिटॉक्स सेवाओं, रिकवरी प्रोग्राम, या निरंतर लत समर्थन की तलाश कर रहे हैं?",
      "Housing & Shelter": "क्या आप आपातकालीन आश्रय या संक्रमणकालीन आवास की तलाश कर रहे हैं?",
      "Rent, Utility & Eviction Assistance": "क्या आपको किराया, उपयोगिताओं का भुगतान करने में मदद चाहिए, या आप बेदखली का सामना कर रहे हैं?",
      "Food & Basic Needs": "क्या आप भोजन सहायता, कपड़े, या अन्य बुनियादी आवश्यकताओं की तलाश कर रहे हैं?",
      "Employment Services": "क्या आप नौकरी प्रशिक्षण, रिज्यूमे मदद, या रोजगार नियुक्ति सेवाओं को पसंद करेंगे?",
      "Legal Services": "क्या आप मुफ्त कानूनी सहायता की तलाश कर रहे हैं, जैसे कानूनी सहायता वकील?",
      "Refugee & Immigrant Support": "क्या आप शरणार्थी या प्रवासी सेवाओं की तलाश कर रहे हैं, जैसे पुनर्वास सहायता या भाषा सहायता?",
      Veterans: "क्या आप VA लाभ, वयोवृद्ध आवास, या वयोवृद्ध स्वास्थ्य देखभाल सेवाओं की तलाश कर रहे हैं?"
    },

    // Categories
    categories: {
      "Free & Charitable Medical Clinics": "मुफ्त और धर्मार्थ चिकित्सा क्लीनिक",
      "Community Health Centers": "सामुदायिक स्वास्थ्य केंद्र",
      "Mental Health (Non-Crisis)": "मानसिक स्वास्थ्य (गैर-संकट)",
      "Crisis & Emergency Mental Health": "संकट और आपातकालीन मानसिक स्वास्थ्य",
      "Substance Use & Addiction Recovery": "पदार्थ उपयोग और नशा मुक्ति",
      "Housing & Shelter": "आवास और आश्रय",
      "Rent, Utility & Eviction Assistance": "किराया, उपयोगिता और बेदखली सहायता",
      "Food & Basic Needs": "भोजन और बुनियादी जरूरतें",
      "Employment Services": "रोजगार सेवाएं",
      "Legal Services": "कानूनी सेवाएं",
      "Refugee & Immigrant Support": "शरणार्थी और प्रवासी सहायता",
      Veterans: "पूर्व सैनिक"
    },
    
    // Map popup labels
    mapPopup: {
      name: "नाम",
      description: "विवरण",
      location: "स्थान",
      phone: "फोन",
      website: "वेबसाइट",
      hours: "घंटे"
    }
  }
};

// Language metadata
const LANGUAGE_INFO = {
  en: { name: "English", nativeName: "English", flag: "🇺🇸", dir: "ltr" },
  es: { name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr" },
  so: { name: "Somali", nativeName: "Soomaali", flag: "🇸🇴", dir: "ltr" },
  ar: { name: "Arabic", nativeName: "العربية", flag: "🇸🇦", dir: "rtl" },
  hi: { name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", dir: "ltr" }
};

// Make available globally
window.TRANSLATIONS = TRANSLATIONS;
window.LANGUAGE_INFO = LANGUAGE_INFO;