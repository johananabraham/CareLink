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
      loading: "Loading...",
      error: "An error occurred. Please try again."
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
      welcome: "I can help you find resources for food, housing, healthcare, mental health, substance use treatment, employment, veteran services, or crisis support. What do you need help with?",
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
      helpPrompt: "You can ask me about food, housing, healthcare, or any other community resources.",
      instructions: "Type 'food', 'housing', 'healthcare', or tell me what you need help with.",
      foundResources: "I found {count} resources for {category}",
      searchingFor: "Looking for {category} resources"
    },
    
    // Clarification questions
    clarifications: {
      Food: "It sounds like you might need food assistance. Would you like to see food pantries, soup kitchens, or meal programs?",
      Housing: "Are you looking for emergency shelter, housing assistance, or help with rent?",
      Healthcare: "Do you need medical care, dental services, or help finding health insurance?",
      "Mental Health": "Are you interested in counseling, therapy, or mental health support services?",
      "Substance Use": "Are you looking for detox services, recovery programs, or ongoing addiction support?",
      Employment: "Would you like job training, resume help, or employment placement services?",
      Veterans: "Are you looking for VA benefits, veteran housing, or veteran healthcare services?",
      Crisis: "Do you need immediate crisis support, a suicide hotline, or emergency assistance?"
    },
    
    // Categories
    categories: {
      Food: "food",
      Housing: "housing", 
      Healthcare: "healthcare",
      "Mental Health": "mental health",
      "Substance Use": "substance use",
      Crisis: "crisis",
      Employment: "employment",
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
      loading: "Cargando...",
      error: "Ocurrió un error. Por favor inténtalo de nuevo."
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
      welcome: "Puedo ayudarte a encontrar recursos para alimentación, vivienda, atención médica, salud mental, tratamiento de sustancias, empleo, servicios para veteranos, o apoyo en crisis. ¿Con qué necesitas ayuda?",
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
      helpPrompt: "Puedes preguntarme sobre alimentos, vivienda, atención médica, o cualquier otro recurso comunitario.",
      instructions: "Escribe 'comida', 'vivienda', 'salud', o dime en qué necesitas ayuda.",
      foundResources: "Encontré {count} recursos para {category}",
      searchingFor: "Buscando recursos de {category}"
    },
    
    // Clarification questions
    clarifications: {
      Food: "Parece que podrías necesitar asistencia alimentaria. ¿Te gustaría ver bancos de alimentos, comedores populares, o programas de comidas?",
      Housing: "¿Buscas refugio de emergencia, asistencia de vivienda, o ayuda con el alquiler?",
      Healthcare: "¿Necesitas atención médica, servicios dentales, o ayuda para encontrar seguro médico?",
      "Mental Health": "¿Te interesan servicios de consejería, terapia, o apoyo de salud mental?",
      "Substance Use": "¿Buscas servicios de desintoxicación, programas de recuperación, o apoyo continuo para adicciones?",
      Employment: "¿Te gustaría capacitación laboral, ayuda con currículum, o servicios de colocación laboral?",
      Veterans: "¿Buscas beneficios de VA, vivienda para veteranos, o servicios de atención médica para veteranos?",
      Crisis: "¿Necesitas apoyo inmediato en crisis, una línea de crisis, o asistencia de emergencia?"
    },
    
    // Categories
    categories: {
      Food: "alimentación",
      Housing: "vivienda", 
      Healthcare: "atención médica",
      "Mental Health": "salud mental",
      "Substance Use": "abuso de sustancias",
      Crisis: "crisis",
      Employment: "empleo",
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
      loading: "Waa la shubayaa...",
      error: "Qalad ayaa dhacay. Fadlan mar kale isku day."
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
      welcome: "Waxaan kaa caawin karaa in aad hesho agab loogu talagalay cunto, guri, daryeel caafimaad, caafimaadka maskaxda, daawaynta isticmaalka daroogada, shaqo, adeegyada askarta, ama taageerada xiisadaha. Maxaad u baahan tahay caawimo?",
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
      helpPrompt: "Waxaad i weydiin kartaa wax ku saabsan cunto, guri, daryeel caafimaad, ama agab kale oo bulsho.",
      instructions: "Qor 'cunto', 'guri', 'caafimaad', ama ii sheeg waxa aad u baahan tahay caawimo.",
      foundResources: "Waxaan helay {count} agab loogu talagalay {category}",
      searchingFor: "Raadinta agabka {category}"
    },
    
    // Clarification questions
    clarifications: {
      Food: "Waxay umuuqataa inaad u baahan tahay caawimo cunto. Miyaad jeclaan lahayd inaad aragto bangiyada cuntada, matbakhyada guud, ama barnaamijyada cuntada?",
      Housing: "Miyaad raadinaysaa meel galabni ah oo degdeg ah, caawimo guri, ama caawimo kiro?",
      Healthcare: "Miyaad u baahan tahay daryeel caafimaad, adeegyada ilkaha, ama caawimo si aad u hesho caymis caafimaad?",
      "Mental Health": "Miyaad xiisaynaysaa adeegyada la-talinta, daaweynta, ama taageerada caafimaadka maskaxda?",
      "Substance Use": "Miyaad raadinaysaa adeegyada nadiifeynta jidhka, barnaamijyada soo kabashadhka, ama taageero joogto ah ee iska-ceejinta?",
      Employment: "Miyaad jeclaan lahayd tababar shaqo, caawimo resume, ama adeegyada heleynta shaqo?",
      Veterans: "Miyaad raadinaysaa faa'iidooyinka VA, guri askari, ama adeegyada daryeelka caafimaadka askarta?",
      Crisis: "Miyaad u baahan tahay taageero degdeg ah oo xiisad ah, khadka xiisadaha, ama caawimo degdeg ah?"
    },
    
    // Categories
    categories: {
      Food: "cunto",
      Housing: "guri", 
      Healthcare: "daryeel caafimaad",
      "Mental Health": "caafimaadka maskaxda",
      "Substance Use": "isticmaalka daroogada",
      Crisis: "xiisad",
      Employment: "shaqo",
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
      loading: "جاري التحميل...",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى."
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
      welcome: "يمكنني مساعدتك في العثور على موارد للطعام والإسكان والرعاية الصحية والصحة النفسية وعلاج تعاطي المواد والتوظيف وخدمات المحاربين القدامى أو دعم الأزمات. بماذا تحتاج المساعدة؟",
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
      helpPrompt: "يمكنك أن تسألني عن الطعام أو الإسكان أو الرعاية الصحية أو أي موارد مجتمعية أخرى.",
      instructions: "اكتب 'طعام' أو 'إسكان' أو 'رعاية صحية' أو أخبرني بما تحتاج للمساعدة فيه.",
      foundResources: "وجدت {count} مورد لـ {category}",
      searchingFor: "البحث عن موارد {category}"
    },
    
    // Clarification questions
    clarifications: {
      Food: "يبدو أنك قد تحتاج إلى مساعدة غذائية. هل تود رؤية بنوك الطعام أو مطابخ الحساء أو برامج الوجبات؟",
      Housing: "هل تبحث عن مأوى طارئ أو مساعدة في الإسكان أو مساعدة في الإيجار؟",
      Healthcare: "هل تحتاج رعاية طبية أو خدمات أسنان أو مساعدة في العثور على تأمين صحي؟",
      "Mental Health": "هل أنت مهتم بخدمات الاستشارة أو العلاج أو خدمات دعم الصحة النفسية؟",
      "Substance Use": "هل تبحث عن خدمات إزالة السموم أو برامج التعافي أو الدعم المستمر للإدمان؟",
      Employment: "هل تود التدريب المهني أو مساعدة في السيرة الذاتية أو خدمات التوظيف؟",
      Veterans: "هل تبحث عن مزايا VA أو إسكان المحاربين القدامى أو خدمات الرعاية الصحية للمحاربين القدامى؟",
      Crisis: "هل تحتاج دعم أزمة فوري أو خط أزمة أو مساعدة طارئة؟"
    },
    
    // Categories
    categories: {
      Food: "طعام",
      Housing: "إسكان", 
      Healthcare: "رعاية صحية",
      "Mental Health": "صحة نفسية",
      "Substance Use": "تعاطي المواد",
      Crisis: "أزمة",
      Employment: "توظيف",
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
      loading: "लोड हो रहा है...",
      error: "एक त्रुटि हुई है। कृपया पुनः प्रयास करें।"
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
      welcome: "मैं आपको भोजन, आवास, स्वास्थ्य देखभाल, मानसिक स्वास्थ्य, पदार्थ उपयोग उपचार, रोजगार, वयोवृद्ध सेवाओं, या संकट सहायता के लिए संसाधन खोजने में मदद कर सकता हूं। आपको किस चीज़ में मदद चाहिए?",
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
      helpPrompt: "आप मुझसे भोजन, आवास, स्वास्थ्य देखभाल, या किसी अन्य सामुदायिक संसाधन के बारे में पूछ सकते हैं।",
      instructions: "'भोजन', 'आवास', 'स्वास्थ्य देखभाल' टाइप करें, या बताएं कि आपको किस चीज़ में मदद चाहिए।",
      foundResources: "मैंने {category} के लिए {count} संसाधन पाए",
      searchingFor: "{category} संसाधन खोज रहे हैं"
    },
    
    // Clarification questions
    clarifications: {
      Food: "ऐसा लगता है कि आपको भोजन सहायता की आवश्यकता हो सकती है। क्या आप फूड बैंक, सूप किचन, या भोजन कार्यक्रम देखना चाहेंगे?",
      Housing: "क्या आप आपातकालीन आश्रय, आवास सहायता, या किराए में मदद की तलाश कर रहे हैं?",
      Healthcare: "क्या आपको चिकित्सा देखभाल, दंत सेवाओं, या स्वास्थ्य बीमा खोजने में मदद चाहिए?",
      "Mental Health": "क्या आप परामर्श, चिकित्सा, या मानसिक स्वास्थ्य सहायता सेवाओं में रुचि रखते हैं?",
      "Substance Use": "क्या आप डिटॉक्स सेवाओं, रिकवरी प्रोग्राम, या निरंतर लत समर्थन की तलाश कर रहे हैं?",
      Employment: "क्या आप नौकरी प्रशिक्षण, रिज्यूमे मदद, या रोजगार नियुक्ति सेवाओं को पसंद करेंगे?",
      Veterans: "क्या आप VA लाभ, वयोवृद्ध आवास, या वयोवृद्ध स्वास्थ्य देखभाल सेवाओं की तलाश कर रहे हैं?",
      Crisis: "क्या आपको तत्काल संकट सहायता, एक संकट हॉटलाइन, या आपातकालीन सहायता चाहिए?"
    },
    
    // Categories
    categories: {
      Food: "भोजन",
      Housing: "आवास", 
      Healthcare: "स्वास्थ्य देखभाल",
      "Mental Health": "मानसिक स्वास्थ्य",
      "Substance Use": "पदार्थ उपयोग",
      Crisis: "संकट",
      Employment: "रोजगार",
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