import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null)

// First define the translations
export const translations = {
  en: {
    nav: {
      about: 'About',
      impact: 'Impact',
      contact: 'Contact'
    },
    hero: {
      subtitle: 'Global Impact • 1,500+ Monthly Users',
      helpTitle: 'How to Use the Globe',
      helpItems: [
        '🌍 Click and drag to rotate the globe',
        '🔍 Scroll to zoom in/out',
        '🎯 Zoom in on any area to see local projects',
        '📍 Click markers to see project details',
        '🏷️ Use filters to find specific opportunities'
      ]
    },
    about: {
      title: 'About Humanity Bridge',
      whoWeAre: {
        title: 'Who We Are',
        content: 'Humanity Bridge is a forward-thinking platform dedicated to connecting both volunteers and those in need with local resources, community support, and meaningful opportunities to make a difference.'
      },
      mission: {
        title: 'Our Mission',
        content: 'Bridging the gap between communities by connecting people with local resources, food banks, shelters, and humanitarian projects worldwide, making support and impact accessible to everyone.'
      },
      howItWorks: {
        title: 'How It Works',
        content: 'Browse our interactive globe to find nearby community resources, food banks, shelters, and volunteer opportunities. Whether you\'re looking to help or seeking assistance, we connect you directly with verified local organizations.'
      },
      impact: {
        title: 'Impact',
        content: 'Connecting over 10K volunteers with essential resources and support across 175+ countries, with 1.4 Million+ verified locations including food banks, shelters, and community centers.'
      },
      getInvolved: {
        title: 'Get Involved',
        content: 'Whether you\'re seeking community resources or want to help others, we\'re here for you. Simply explore the interactive globe to find nearby food banks, shelters, and volunteer opportunities in your area.'
      }
    },
    impact: {
      title: 'Building Stronger Communities',
      connecting: {
        title: 'Connecting Communities',
        content1: 'At Humanity Bridge, we believe everyone deserves access to community resources. We bridge the gap between those seeking assistance and local support systems, while connecting passionate volunteers with organizations making real change. Our platform makes it simple to find food banks, shelters, and humanitarian projects in your area.',
        content2: 'Whether you\'re looking for community support or wanting to help others, we connect you directly with verified local organizations and resources that make a difference.'
      },
      stats: {
        resources: 'Resources & Projects',
        countries: 'Countries Connected',
        volunteers: 'Volunteers Connected'
      },
      realChange: {
        title: 'Real Change, Real Impact',
        content1: 'From local food banks to global disaster relief, our platform ensures that everyone can find the support they need or the opportunity to help. We verify every organization and resource listed, making it safe and simple to connect with your community.',
        content2: 'Join us in building an accessible support network where no one feels alone, and every individual can either find help or make a difference in their community.'
      }
    },
    contact: {
      title: 'Get in Touch',
      email: {
        title: '📧 Email',
        subtitle: 'Questions or suggestions?'
      },
      location: {
        title: '📍 Location',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 Join Us',
        subtitle: 'Start making a difference',
        content: 'in your community today'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. All rights reserved.',
        tagline: 'Connecting hearts and hands across the globe'
      }
    }
  },
  es: {
    nav: {
      about: 'Sobre Nosotros',
      impact: 'Impacto',
      contact: 'Contacto'
    },
    hero: {
      subtitle: 'Impacto Global • 1.500+ Usuarios Mensuales',
      helpTitle: 'Cómo Usar el Globo',
      helpItems: [
        '🌍 Haz clic y arrastra para rotar el globo',
        '🔍 Desplázate para acercar/alejar',
        '🎯 Acércate a cualquier área para ver proyectos locales',
        '📍 Haz clic en los marcadores para ver detalles',
        '🏷️ Usa filtros para encontrar oportunidades específicas'
      ]
    },
    about: {
      title: 'Sobre Humanity Bridge',
      whoWeAre: {
        title: 'Quiénes Somos',
        content: 'Humanity Bridge es una plataforma innovadora dedicada a conectar tanto a voluntarios como a personas necesitadas con recursos locales, apoyo comunitario y oportunidades significativas para hacer la diferencia.'
      },
      mission: {
        title: 'Nuestra Misión',
        content: 'Unir comunidades conectando personas con recursos locales, bancos de alimentos, refugios y proyectos humanitarios en todo el mundo, haciendo que el apoyo y el impacto sean accesibles para todos.'
      },
      howItWorks: {
        title: 'Cómo Funciona',
        content: 'Explora nuestro globo interactivo para encontrar recursos comunitarios cercanos, bancos de alimentos, refugios y oportunidades de voluntariado. Ya sea que busques ayuda o quieras ayudar, te conectamos directamente con organizaciones locales verificadas.'
      },
      impact: {
        title: 'Impacto',
        content: 'Conectando a más de 10 mil voluntarios con recursos esenciales y apoyo en más de 175 países, con más de 1,4 millones de ubicaciones verificadas, incluyendo bancos de alimentos, refugios y centros comunitarios.'
      },
      getInvolved: {
        title: 'Participa',
        content: 'Ya sea que busques recursos comunitarios o quieras ayudar a otros, estamos aquí para ti. Simplemente explora el globo interactivo para encontrar bancos de alimentos, refugios y oportunidades de voluntariado en tu área.'
      }
    },
    impact: {
      title: 'Construyendo Comunidades Más Fuertes',
      connecting: {
        title: 'Conectando Comunidades',
        content1: 'En Humanity Bridge, creemos que todos merecen acceso a recursos comunitarios. Unimos a quienes buscan asistencia con sistemas de apoyo local, mientras conectamos a voluntarios apasionados con organizaciones que generan cambios reales.',
        content2: 'Ya sea que busques apoyo comunitario o quieras ayudar a otros, te conectamos directamente con organizaciones y recursos locales verificados que marcan la diferencia.'
      },
      stats: {
        resources: 'Recursos y Proyectos',
        countries: 'Países Conectados',
        volunteers: 'Voluntarios Conectados'
      },
      realChange: {
        title: 'Cambio Real, Impacto Real',
        content1: 'Desde bancos de alimentos locales hasta ayuda en desastres globales, nuestra plataforma asegura que todos puedan encontrar el apoyo que necesitan o la oportunidad de ayudar.',
        content2: 'Únete a nosotros en la construcción de una red de apoyo accesible donde nadie se sienta solo y cada individuo puede encontrar ayuda o hacer la diferencia en su comunidad.'
      }
    },
    contact: {
      title: 'Contáctanos',
      email: {
        title: '📧 Correo',
        subtitle: '¿Preguntas o sugerencias?'
      },
      location: {
        title: '📍 Ubicación',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 Únete',
        subtitle: 'Comienza a hacer la diferencia',
        content: 'en tu comunidad hoy'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. Todos los derechos reservados.',
        tagline: 'Conectando corazones y manos alrededor del mundo'
      }
    }
  },
  fr: {
    nav: {
      about: 'À Propos',
      impact: 'Impact',
      contact: 'Contact'
    },
    hero: {
      subtitle: 'Impact Mondial • 1 500+ Utilisateurs Mensuels',
      helpTitle: 'Comment Utiliser le Globe',
      helpItems: [
        '🌍 Cliquez et faites glisser pour faire pivoter le globe',
        '🔍 Défilez pour zoomer/dézoomer',
        '🎯 Zoomez sur une zone pour voir les projets locaux',
        '📍 Cliquez sur les marqueurs pour voir les détails',
        '🏷️ Utilisez les filtres pour trouver des opportunités spécifiques'
      ]
    },
    about: {
      title: 'À Propos de Humanity Bridge',
      whoWeAre: {
        title: 'Qui Sommes-Nous',
        content: 'Humanity Bridge est une plateforme innovante dédiée à la connexion des bénévoles et des personnes dans le besoin avec des ressources locales, un soutien communautaire et des opportunités significatives.'
      },
      mission: {
        title: 'Notre Mission',
        content: 'Relier les communautés en connectant les personnes aux ressources locales, aux banques alimentaires, aux refuges et aux projets humanitaires dans le monde entier.'
      },
      howItWorks: {
        title: 'Comment Ça Marche',
        content: 'Explorez notre globe interactif pour trouver des ressources communautaires, des banques alimentaires, des refuges et des opportunités de bénévolat près de chez vous.'
      },
      impact: {
        title: 'Impact',
        content: 'Connexion de plus de 10 000 bénévoles avec des ressources essentielles dans plus de 175 pays, avec plus de 1,4 million de sites vérifiés.'
      },
      getInvolved: {
        title: 'Participez',
        content: 'Que vous cherchiez des ressources communautaires ou que vous souhaitiez aider les autres, nous sommes là pour vous.'
      }
    },
    impact: {
      title: 'Construire des Communautés Plus Fortes',
      connecting: {
        title: 'Connecter les Communautés',
        content1: 'Chez Humanity Bridge, nous croyons que chacun mérite d\'avoir accès aux ressources communautaires.',
        content2: 'Que vous cherchiez un soutien communautaire ou que vous souhaitiez aider les autres, nous vous connectons directement.'
      },
      stats: {
        resources: 'Ressources et Projets',
        countries: 'Pays Connectés',
        volunteers: 'Bénévoles Connectés'
      },
      realChange: {
        title: 'Un Changement Réel, Un Impact Réel',
        content1: 'Des banques alimentaires locales aux secours en cas de catastrophe, notre plateforme garantit que chacun peut trouver le soutien nécessaire.',
        content2: 'Rejoignez-nous pour construire un réseau de soutien accessible où personne ne se sent seul.'
      }
    },
    contact: {
      title: 'Contactez-Nous',
      email: {
        title: '📧 Email',
        subtitle: 'Questions ou suggestions?'
      },
      location: {
        title: '📍 Adresse',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 Rejoignez-Nous',
        subtitle: 'Commencez à faire la différence',
        content: 'dans votre communauté aujourd\'hui'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. Tous droits réservés.',
        tagline: 'Relier les cœurs et les mains à travers le monde'
      }
    }
  },
  de: {
    nav: {
      about: 'Über Uns',
      impact: 'Wirkung',
      contact: 'Kontakt'
    },
    hero: {
      subtitle: 'Globale Wirkung • 1.500+ Monatliche Nutzer',
      helpTitle: 'Wie man den Globus benutzt',
      helpItems: [
        '🌍 Klicken und ziehen Sie, um den Globus zu drehen',
        '🔍 Scrollen Sie zum Vergrößern/Verkleinern',
        '🎯 Zoomen Sie in einen Bereich, um lokale Projekte zu sehen',
        '📍 Klicken Sie auf Markierungen für Details',
        '🏷️ Nutzen Sie Filter, um spezifische Möglichkeiten zu finden'
      ]
    },
    about: {
      title: 'Über Humanity Bridge',
      whoWeAre: {
        title: 'Wer Wir Sind',
        content: 'Humanity Bridge ist eine zukunftsorientierte Plattform, die Freiwillige und Hilfesuchende mit lokalen Ressourcen, Gemeinschaftsunterstützung und bedeutungsvollen Möglichkeiten verbindet.'
      },
      mission: {
        title: 'Unsere Mission',
        content: 'Wir verbinden Gemeinschaften, indem wir Menschen mit lokalen Ressourcen, Tafeln, Unterkünften und humanitären Projekten weltweit zusammenbringen.'
      },
      howItWorks: {
        title: 'Wie Es Funktioniert',
        content: 'Erkunden Sie unseren interaktiven Globus, um lokale Ressourcen, Tafeln, Unterkünfte und Freiwilligenarbeit zu finden.'
      },
      impact: {
        title: 'Wirkung',
        content: 'Verbindung von über 10.000 Freiwilligen mit wichtigen Ressourcen in mehr als 175 Ländern, mit über 1,4 Millionen verifizierten Standorten.'
      },
      getInvolved: {
        title: 'Mitmachen',
        content: 'Ob Sie Gemeinschaftsressourcen suchen oder anderen helfen möchten, wir sind für Sie da.'
      }
    },
    impact: {
      title: 'Stärkere Gemeinschaften Aufbauen',
      connecting: {
        title: 'Gemeinschaften Verbinden',
        content1: 'Bei Humanity Bridge glauben wir, dass jeder Zugang zu Gemeinschaftsressourcen verdient.',
        content2: 'Ob Sie Unterstützung suchen oder helfen möchten, wir verbinden Sie direkt.'
      },
      stats: {
        resources: 'Ressourcen & Projekte',
        countries: 'Verbundene Länder',
        volunteers: 'Verbundene Freiwillige'
      },
      realChange: {
        title: 'Echte Veränderung, Echte Wirkung',
        content1: 'Von lokalen Tafeln bis zur globalen Katastrophenhilfe stellt unsere Plattform sicher, dass jeder die benötigte Unterstützung oder die Möglichkeit zu helfen findet.',
        content2: 'Schließen Sie sich uns beim Aufbau eines zugänglichen Unterstützungsnetzwerks an, in dem sich niemand allein fühlt und jeder Einzelne Hilfe finden oder einen Unterschied in seiner Gemeinschaft bewirken kann.'
      }
    },
    contact: {
      title: 'Kontakt',
      email: {
        title: '📧 E-Mail',
        subtitle: 'Fragen oder Vorschläge?'
      },
      location: {
        title: '📍 Standort',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 Mitmachen',
        subtitle: 'Beginnen Sie, etwas zu bewirken',
        content: 'in Ihrer Gemeinschaft'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. Alle Rechte vorbehalten.',
        tagline: 'Herzen und Hände weltweit verbinden'
      }
    }
  },
  ar: {
    direction: 'rtl',
    nav: {
      about: 'عن المنصة',
      impact: 'تأثيرنا',
      contact: 'اتصل بنا'
    },
    hero: {
      subtitle: 'تأثير عالمي • +1,500 مستخدم شهرياً',
      helpTitle: 'كيفية استخدام الكرة الأرضية',
      helpItems: [
        '🌍 انقر واسحب لتدوير الكرة الأرضية',
        '🔍 قم بالتمرير للتكبير/التصغير',
        '🎯 قم بالتكبير على أي منطقة لرؤية المشاريع المحلية',
        '📍 انقر على العلامات لرؤية تفاصيل المشروع',
        '🏷️ استخدم الفلاتر للعثور على فرص محددة'
      ]
    },
    about: {
      title: 'عن هيومانيتي بريدج',
      whoWeAre: {
        title: 'من نحن',
        content: 'هيومانيتي بريدج هي منصة مبتكرة مخصصة لربط المتطوعين والمحتاجين بالموارد المحلية والدعم المجتمعي والفرص الهادفة لإحداث فرق.'
      },
      mission: {
        title: 'مهمتنا',
        content: 'سد الفجوة بين المجتمعات من خلال ربط الناس بالموارد المحلية وبنوك الطعام والملاجئ والمشاريع الإنسانية في جميع أنحاء العالم.'
      },
      howItWorks: {
        title: 'كيف يعمل',
        content: 'تصفح كرتنا الأرضية التفاعلية للعثور على موارد مجتمعية قريبة وبنوك طعام وملاجئ وفرص تطوع.'
      },
      impact: {
        title: 'التأثير',
        content: 'ربط أكثر من 10 آلاف متطوع بالموارد الأساسية والدعم في أكثر من 175 دولة، مع أكثر من 1.4 مليون موقع موثق.'
      },
      getInvolved: {
        title: 'شارك معنا',
        content: 'سواء كنت تبحث عن موارد مجتمعية أو تريد مساعدة الآخرين، نحن هنا من أجلك.'
      }
    },
    impact: {
      title: 'بناء مجتمعات أقوى',
      connecting: {
        title: 'ربط المجتمعات',
        content1: 'في هيومانيتي بريدج، نؤمن أن الجميع يستحق الوصول إلى الموارد المجتمعية.',
        content2: 'سواء كنت تبحث عن دعم مجتمعي أو تريد مساعدة الآخرين، نربطك مباشرة.'
      },
      stats: {
        resources: 'الموارد والمشاريع',
        countries: 'الدول المتصلة',
        volunteers: 'المتطوعون المتصلون'
      },
      realChange: {
        title: 'تغيير حقيقي، تأثير حقيقي',
        content1: 'من بنوك الطعام المحلية إلى الإغاثة في حالات الكوارث العالمية، تضمن منصتنا حصول الجميع على الدعم الذي يحتاجونه.',
        content2: 'انضم إلينا في بناء شبكة دعم يمكن الوصول إليها حيث لا يشعر أحد بالوحدة.'
      }
    },
    contact: {
      title: 'تواصل معنا',
      email: {
        title: '📧 البريد الإلكتروني',
        subtitle: 'أسئلة أو اقتراحات؟'
      },
      location: {
        title: '📍 الموقع',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 انضم إلينا',
        subtitle: 'ابدأ في إحداث فرق',
        content: 'في مجتمعك اليوم'
      },
      footer: {
        copyright: '© 2024 هيومانيتي بريدج. جميع الحقوق محفوظة.',
        tagline: 'نربط القلوب والأيدي حول العالم'
      }
    }
  },
  he: {
    direction: 'rtl',
    nav: {
      about: 'אודות',
      impact: 'השפעה',
      contact: 'צור קשר'
    },
    hero: {
      subtitle: 'השפעה גלובלית • +1,500 משתמשים חודשיים',
      helpTitle: 'כיצד להשתמש בגלובוס',
      helpItems: [
        '🌍 לחץ וגרור כדי לסובב את הגלובוס',
        '🔍 גלול כדי להתקרב/להתרחק',
        '🎯 התקרב לכל אזור כדי לראות פרויקטים מקומיים',
        '📍 לחץ על הסמנים כדי לראות פרטים',
        '🏷️ השתמש במסננים כדי למצוא הזדמנויות ספציפיות'
      ]
    },
    about: {
      title: 'אודות Humanity Bridge',
      whoWeAre: {
        title: 'מי אנחנו',
        content: 'Humanity Bridge היא פלטפורמה חדשנית המוקדשת לחיבור מתנדבים ונזקקים עם משאבים מקומיים, תמיכה קהילתית והזדמנויות משמעותיות.'
      },
      mission: {
        title: 'המשימה שלנו',
        content: 'גישור על הפער בין קהילות על ידי חיבור אנשים למשאבים מקומיים, בנקי מזון, מקלטים ופרויקטים הומניטריים ברחבי העולם.'
      },
      howItWorks: {
        title: 'איך זה עובד',
        content: 'עיין בגלובוס האינטראקטיבי שלנו כדי למצוא משאבים קהילתיים, בנקי מזון, מקלטים והזדמנויות התנדבות בקרבת מקום.'
      },
      impact: {
        title: 'השפעה',
        content: 'חיבור של יותר מ-10,000 מתנדבים עם משאבים חיוניים ב-175+ מדינות, עם יותר מ-1.4 מיליון מיקומים מאומתים.'
      },
      getInvolved: {
        title: 'הצטרף אלינו',
        content: 'בין אם אתה מחפש משאבים קהילתיים או רוצה לעזור לאחרים, אנחנו כאן בשבילך.'
      }
    },
    impact: {
      title: 'בניית קהילות חזקות יותר',
      connecting: {
        title: 'חיבור קהילות',
        content1: 'ב-Humanity Bridge, אנו מאמינים שכל אחד ראוי לגישה למשאבים קהילתיים.',
        content2: 'בין אם אתה מחפש תמיכה קהילתית או רוצה לעזור לאחרים, אנחנו מחברים אותך ישירות.'
      },
      stats: {
        resources: 'משאבים ופרויקטים',
        countries: 'מדינות מחוברות',
        volunteers: 'מתנדבים מחוברים'
      },
      realChange: {
        title: 'שינוי אמיתי, השפעה אמיתית',
        content1: 'מבנקי מזון מקומיים ועד סיוע בעת אסון עולמי, הפלטפורמה שלנו מבטיחה שכל אחד יכול למצוא את התמיכה הנדרשת או את ההזדמנות לעזור.',
        content2: 'הצטרפו אלינו בבניית רשת תמיכה נגישה בה אף אחד לא מרגיש לבד וכל אחד יכול למצוא עזרה או לעשות שינוי בקהילה שלו.'
      }
    },
    contact: {
      title: 'צור קשר',
      email: {
        title: '📧 דוא"ל',
        subtitle: 'שאלות או הצעות?'
      },
      location: {
        title: '📍 מיקום',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 הצטרף אלינו',
        subtitle: 'התחל לעשות שינוי',
        content: 'בקהילה שלך היום'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. כל הזכויות שמורות.',
        tagline: 'מחברים לבבות וידיים ברחבי העולם'
      }
    }
  },
  zh: {
    nav: {
      about: '关于我们',
      impact: '影响力',
      contact: '联系我们'
    },
    hero: {
      subtitle: '全球影响力 • 每月1,500+用户',
      helpTitle: '如何使用地球仪',
      helpItems: [
        '🌍 点击并拖动以旋转地球仪',
        '🔍 滚动鼠标滚轮以放大/缩小',
        '🎯 放大任何区域以查看当地项目',
        '📍 点击标记以查看项目详情',
        '🏷️ 使用过滤器查找特定机会'
      ]
    },
    about: {
      title: '关于Humanity Bridge',
      whoWeAre: {
        title: '我们是谁',
        content: 'Humanity Bridge是一个前瞻性平台，致力于将志愿者和需要帮助的人与当地资源、社区支持和有意义的机会联系起来。'
      },
      mission: {
        title: '我们的使命',
        content: '通过将人们与全球各地的当地资源、食物银行、避难所和人道主义项目联系起来，架起社区之间的桥梁。'
      },
      howItWorks: {
        title: '如何运作',
        content: '浏览我们的互动地球仪，找到附近的社区资源、食物银行、避难所和志愿服务机会。'
      },
      impact: {
        title: '影响力',
        content: '在175多个国家连接超过1万名志愿者与基本资源，拥有超过140万个经验证的地点。'
      },
      getInvolved: {
        title: '参与其中',
        content: '无论您是在寻找社区资源还是想帮助他人，我们都在这里为您服务。'
      }
    },
    impact: {
      title: '建设更强大的社区',
      connecting: {
        title: '连接社区',
        content1: '在Humanity Bridge，我们相信每个人都应该获得社区资源。我们致力于连接寻求帮助的人与当地支持系统。',
        content2: '无论您是在寻找社区支持还是想要帮助他人，我们都会直接将您与经过验证的当地组织和资源联系起来。'
      },
      stats: {
        resources: '资源和项目',
        countries: '已连接国家',
        volunteers: '已连接志愿者'
      },
      realChange: {
        title: '真实改变，实际影响',
        content1: '从当地食物银行到全球灾难救援，我们的平台确保每个人都能找到所需的支持或提供帮助的机会。',
        content2: '加入我们，共同建设一个无人感到孤独的可及性支持网络。'
      }
    },
    contact: {
      title: '联系我们',
      email: {
        title: '📧 电子邮件',
        subtitle: '有问题或建议？'
      },
      location: {
        title: '📍 地址',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 加入我们',
        subtitle: '开始创造改变',
        content: '今天就在您的社区中'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge。保留所有权利。',
        tagline: '连接全球的心与手'
      }
    }
  },
  ja: {
    nav: {
      about: '私たちについて',
      impact: '影響',
      contact: 'お問い合わせ'
    },
    hero: {
      subtitle: 'グローバルな影響 • 月間1,500人以上のユーザー',
      helpTitle: '地球儀の使い方',
      helpItems: [
        '🌍 クリックとドラッグで地球儀を回転',
        '🔍 スクロールで拡大/縮小',
        '🎯 エリアを拡大してローカルプロジェクトを表示',
        '📍 マーカーをクリックして詳細を表示',
        '🏷️ フィルターを使用して特定の機会を検索'
      ]
    },
    about: {
      title: 'Humanity Bridgeについて',
      whoWeAre: {
        title: '私たちについて',
        content: 'Humanity Bridgeは、ボランティアと支援を必要とする人々を地域資源、コミュニティサポート、意義ある機会と結びつける革新的なプラットフォームです。'
      },
      mission: {
        title: '私たちのミッション',
        content: '世界中の地域資源、フードバンク、シェルター、人道支援プロジェクトと人々を結びつけ、コミュニティ間の架け橋となります。'
      },
      howItWorks: {
        title: '利用方法',
        content: 'インタラクティブな地球儀を使って、近くのコミュニティリソース、フードバンク、シェルター、ボランティアの機会を見つけることができます。'
      },
      impact: {
        title: '影響力',
        content: '175カ国以上で10,000人以上のボランティアを必要な資源と結びつけ、140万以上の認証された拠点を持っています。'
      },
      getInvolved: {
        title: '参加する',
        content: 'コミュニティリソースを探している方も、他の人を助けたい方も、私たちがサポートします。'
      }
    },
    impact: {
      title: 'より強いコミュニティの構築',
      connecting: {
        title: 'コミュニティをつなぐ',
        content1: 'Humanity Bridgeでは、誰もがコミュニティリソースにアクセスできる権利があると信じています。',
        content2: 'コミュニティサポートを求めている方も、他の人を助けたい方も、直接つながることができます。'
      },
      stats: {
        resources: 'リソースとプロジェクト',
        countries: '接続された国々',
        volunteers: '接続されたボランティア'
      },
      realChange: {
        title: '実際の変化、実際の影響',
        content1: '地域のフードバンクから世界的な災害救援まで、私たちのプラットフォームは誰もが必要なサポートを見つけられることを保証します。',
        content2: '誰も孤独を感じることのない、アクセス可能なサポートネットワークの構築に参加しましょう。'
      }
    },
    contact: {
      title: 'お問い合わせ',
      email: {
        title: '📧 メール',
        subtitle: 'ご質問やご提案はありますか？'
      },
      location: {
        title: '📍 所在地',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 メモリアルに参加',
        subtitle: '変化を起こし始めましょう',
        content: '今日、あなたのコミュニティで'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. All rights reserved.',
        tagline: '世界中の心と手をつなぐ'
      }
    }
  },
  ru: {
    nav: {
      about: 'О нас',
      impact: 'Влияние',
      contact: 'Контакты'
    },
    hero: {
      subtitle: 'Глобальное влияние • 1,500+ пользователей ежемесячно',
      helpTitle: 'Как использовать глобус',
      helpItems: [
        '🌍 Нажмите и перетащите, чтобы вращать глобус',
        '🔍 Прокрутите для увеличения/уменьшения масштаба',
        '🎯 Увеличьте масштаб любой области, чтобы увидеть местные проекты',
        '📍 Нажмите на маркеры, чтобы увидеть подробности',
        '🏷️ Используйте фильтры для поиска конкретных возможностей'
      ]
    },
    about: {
      title: 'О Humanity Bridge',
      whoWeAre: {
        title: 'Кто мы',
        content: 'Humanity Bridge - это передовая платформа, соединяющая волонтеров и нуждающихся с местными ресурсами, поддержкой сообщества и значимыми возможностями.'
      },
      mission: {
        title: 'Наша миссия',
        content: 'Наводить мосты между сообществами, соединяя людей с местными ресурсами, продовольственными банками, приютами и гуманитарными проектами по всему миру.'
      },
      howItWorks: {
        title: 'Как это работает',
        content: 'Исследуйте наш интерактивный глобус, чтобы найти ближайшие общественные ресурсы, продовольственные банки, приюты и волонтерские возможности.'
      },
      impact: {
        title: 'Влияние',
        content: 'Объединяем более 10 000 волонтеров с важными ресурсами в более чем 175 странах, с более чем 1,4 миллиона проверенных локаций.'
      },
      getInvolved: {
        title: 'Присоединяйтесь',
        content: 'Ищете ли вы общественные ресурсы или хотите помочь другим, мы здесь для вас.'
      }
    },
    impact: {
      title: 'Строим более сильные сообщества',
      connecting: {
        title: 'Объединяем сообщества',
        content1: 'В Humanity Bridge мы верим, что каждый заслуживает доступа к общественным ресурсам.',
        content2: 'Ищете ли вы поддержку сообщества или хотите помочь другим, мы напрямую соединяем вас.'
      },
      stats: {
        resources: 'Ресурсы и проекты',
        countries: 'Подключенные страны',
        volunteers: 'Подключенные волонтеры'
      },
      realChange: {
        title: 'Реальные изменения, реальное влияние',
        content1: 'От местных продовольственных банков до глобальной помощи при бедствиях, наша платформа гарантирует, что каждый может найти необходимую поддержку.',
        content2: 'Присоединяйтесь к нам в создании доступной сети поддержки, где никто не чувствует себя одиноким.'
      }
    },
    contact: {
      title: 'Свяжитесь с нами',
      email: {
        title: '📧 Электронная почта',
        subtitle: 'Вопросы или предложения?'
      },
      location: {
        title: '📍 Адрес',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 Присоединяйтесь к нам',
        subtitle: 'Начните менять мир',
        content: 'в вашем сообществе сегодня'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. Все права защищены.',
        tagline: 'Соединяем сердца и руки по всему миру'
      }
    }
  },
  it: {
    nav: {
      about: 'Chi Siamo',
      impact: 'Impatto',
      contact: 'Contatti'
    },
    hero: {
      subtitle: 'Impatto Globale • 1.500+ Utenti Mensili',
      helpTitle: 'Come Usare il Globo',
      helpItems: [
        '🌍 Clicca e trascina per ruotare il globo',
        '🔍 Scorri per ingrandire/rimpicciolire',
        '🎯 Ingrandisci un\'area per vedere i progetti locali',
        '📍 Clicca sui marcatori per vedere i dettagli',
        '🏷️ Usa i filtri per trovare opportunità specifiche'
      ]
    },
    about: {
      title: 'Chi è Humanity Bridge',
      whoWeAre: {
        title: 'Chi Siamo',
        content: 'Humanity Bridge è una piattaforma innovativa dedicata a connettere volontari e persone bisognose con risorse locali, supporto comunitario e opportunità significative.'
      },
      mission: {
        title: 'La Nostra Missione',
        content: 'Colmare il divario tra le comunità connettendo le persone con risorse locali, banchi alimentari, rifugi e progetti umanitari in tutto il mondo.'
      },
      howItWorks: {
        title: 'Come Funziona',
        content: 'Esplora il nostro globo interattivo per trovare risorse comunitarie, banchi alimentari, rifugi e opportunità di volontariato nelle vicinanze.'
      },
      impact: {
        title: 'Impatto',
        content: 'Connessione di oltre 10.000 volontari con risorse essenziali in più di 175 paesi, con oltre 1,4 milioni di luoghi verificati.'
      },
      getInvolved: {
        title: 'Partecipa',
        content: 'Che tu stia cercando risorse comunitarie o voglia aiutare gli altri, siamo qui per te.'
      }
    },
    impact: {
      title: 'Costruire Comunità Più Forti',
      connecting: {
        title: 'Connettere le Comunità',
        content1: 'In Humanity Bridge, crediamo che tutti meritino accesso alle risorse della comunità.',
        content2: 'Che tu stia cercando supporto comunitario o voglia aiutare gli altri, ti connettiamo direttamente.'
      },
      stats: {
        resources: 'Risorse e Progetti',
        countries: 'Paesi Connessi',
        volunteers: 'Volontari Connessi'
      },
      realChange: {
        title: 'Cambiamento Reale, Impatto Reale',
        content1: 'Dai banchi alimentari locali al soccorso in caso di disastri globali, la nostra piattaforma garantisce che tutti possano trovare il supporto necessario.',
        content2: 'Unisciti a noi nella costruzione di una rete di supporto accessibile dove nessuno si sente solo.'
      }
    },
    contact: {
      title: 'Contattaci',
      email: {
        title: '📧 Email',
        subtitle: 'Domande o suggerimenti?'
      },
      location: {
        title: '📍 Sede',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 Unisciti a Noi',
        subtitle: 'Inizia a fare la differenza',
        content: 'nella tua comunità oggi'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. Tutti i diritti riservati.',
        tagline: 'Connettere cuori e mani in tutto il mondo'
      }
    }
  },
  sw: {
    nav: {
      about: 'Kuhusu',
      impact: 'Athari',
      contact: 'Wasiliana'
    },
    hero: {
      subtitle: 'Athari za Kimataifa • Watumiaji 1,500+ kwa Mwezi',
      helpTitle: 'Jinsi ya Kutumia Dunia',
      helpItems: [
        '🌍 Bonyeza na uvute kugeuza dunia',
        '🔍 Sogeza juu/chini kuongeza/kupunguza ukubwa',
        '🎯 Kuza eneo lolote kuona miradi ya karibu',
        '📍 Bonyeza alama kuona maelezo zaidi',
        '🏷️ Tumia vichujio kupata fursa maalum'
      ]
    },
    about: {
      title: 'Kuhusu Humanity Bridge',
      whoWeAre: {
        title: 'Sisi ni Nani',
        content: 'Humanity Bridge ni jukwaa la kisasa linalojitahidi kuunganisha watu wenye kujitolea na wanaohitaji msaada na rasilimali za karibu, msaada wa jamii, na fursa zenye maana.'
      },
      mission: {
        title: 'Dhamira Yetu',
        content: 'Kuunganisha jamii kwa kuunganisha watu na rasilimali za karibu, benki za chakula, makazi, na miradi ya kibinadamu duniani kote.'
      },
      howItWorks: {
        title: 'Jinsi Inavyofanya Kazi',
        content: 'Tafuta kwenye dunia yetu ya kuvutia kupata rasilimali za jamii, benki za chakula, makazi, na fursa za kujitolea karibu nawe.'
      },
      impact: {
        title: 'Athari',
        content: 'Kuunganisha zaidi ya watu 10,000 wanaojitolea na rasilimali muhimu katika nchi zaidi ya 175, na maeneo zaidi ya milioni 1.4 yaliyothibitishwa.'
      },
      getInvolved: {
        title: 'Shiriki',
        content: 'Ikiwa unatafuta rasilimali za jamii au unataka kusaidia wengine, tuko hapa kwa ajili yako.'
      }
    },
    impact: {
      title: 'Kujenga Jamii Zenye Nguvu Zaidi',
      connecting: {
        title: 'Kuunganisha Jamii',
        content1: 'Katika Humanity Bridge, tunaamini kila mtu anastahili kupata rasilimali za jamii.',
        content2: 'Ikiwa unatafuta msaada wa jamii au unataka kusaidia wengine, tunakuunganisha moja kwa moja.'
      },
      stats: {
        resources: 'Rasilimali na Miradi',
        countries: 'Nchi Zilizounganishwa',
        volunteers: 'Wanaojitolea Waliounganishwa'
      },
      realChange: {
        title: 'Mabadiliko Halisi, Athari Halisi',
        content1: 'Kutoka benki za chakula za karibu hadi misaada ya majanga ya kimataifa, jukwaa letu linahakikisha kila mtu anaweza kupata msaada anaohitaji.',
        content2: 'Dàpọ̀ mọ́ wa láti kọ́ nẹ́tíwọ́ọ̀kì àtìlẹ́yìn tó rọrùn níbi tí kò sí ẹni tí yóò ní ìmọ̀lára pé òun nìkan wà.'
      }
    },
    contact: {
      title: 'Wasiliana Nasi',
      email: {
        title: '📧 Barua pepe',
        subtitle: 'Maswali au mapendekezo?'
      },
      location: {
        title: '📍 Mahali',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 Jiunge Nasi',
        subtitle: 'Anza kuleta mabadiliko',
        content: 'katika jamii yako leo'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. Haki zote zimehifadhiwa.',
        tagline: 'Síso àwọn ọkàn àti ọwọ́ pọ̀ káàkiri àgbáyé'
      }
    }
  },
  yo: {
    nav: {
      about: 'Nípa Wa',
      impact: 'Ipa',
      contact: 'Kàn sí Wa'
    },
    hero: {
      subtitle: 'Ipa Àgbáyé • Àwọn Olùmúlò 1,500+ Lóṣooṣù',
      helpTitle: 'Bí o ṣe le Lo Globe',
      helpItems: [
        '🌍 Tẹ kí o sì fa láti yí globe náà',
        '🔍 Scroll láti sun mọ́le/jìnnà',
        '🎯 Sun mọ́le sí agbègbè láti rí àwọn iṣẹ́ ìbílẹ̀',
        '📍 Tẹ àwọn àmì láti rí àwọn alayé',
        '🏷️ Lo àwọn àṣàyàn láti wá àwọn ànfàní pàtó'
      ]
    },
    about: {
      title: 'Nípa Humanity Bridge',
      whoWeAre: {
        title: 'Ta ni Wá',
        content: 'Humanity Bridge jẹ́ pẹpẹ tó ń ṣe àgbékalẹ̀ láti so àwọn olùrànlọ́wọ́ àti àwọn tó nílò ìrànlọ́wọ́ pọ̀ mọ́ àwọn ohun èlò ìbílẹ̀, àtìlẹ́yìn àdúgbò, àti àwọn ànfàní pàtàkì.'
      },
      mission: {
        title: 'Ìfẹ wa',
        content: 'Ṣíṣe àjọṣe láàrin àwọn àdúgbò nípa síso àwọn ènìyàn pọ̀ mọ́ àwọn ohun èlò ìbílẹ̀, ilé ìfowópamọ́ oúnjẹ, ibi ìsọ́, àti àwọn iṣẹ́ aláàánú káàkiri àgbáyé.'
      },
      howItWorks: {
        title: 'Bí ó ṣe ń ṣiṣẹ́',
        content: 'Ṣàyẹ̀wò globe wa tó ń ṣiṣẹ́ láti rí àwọn ohun èlò àdúgbò, ilé ìfowópamọ́ oúnjẹ, ibi ìsọ́, àti àwọn ànfàní ìrànlọ́wọ́ ní tòsí rẹ.'
      },
      impact: {
        title: 'Ipa',
        content: 'Ń so ju olùrànlọ́wọ́ 10,000 pọ̀ mọ́ àwọn ohun èlò pàtàkì ní orílẹ̀-èdè 175+, pẹ̀lú ibi tó ju 1.4 Mílíọ̀nù lọ tí a ti fìdí rẹ̀ múlẹ̀.'
      },
      getInvolved: {
        title: 'Dásí',
        content: 'Bóyá o ń wá àwọn ohun èlò àdúgbò tàbí o fẹ́ ran àwọn ẹlòmíràn lọ́wọ́, a wà níbí fún ọ.'
      }
    },
    impact: {
      title: 'Kíkọ́ Àwọn Àdúgbò Alágbára',
      connecting: {
        title: 'Síso Àwọn Àdúgbò Pọ̀',
        content1: 'Ní Humanity Bridge, a gbàgbọ́ pé gbogbo ènìyàn ló yẹ kó ní ànfàní sí àwọn ohun èlò àdúgbò.',
        content2: 'Bóyá o ń wá àtìlẹ́yìn àdúgbò tàbí o fẹ́ ran àwọn ẹlòmíràn lọ́wọ́, a ń so ọ́ pọ̀ tààrà.'
      },
      stats: {
        resources: 'Àwọn Ohun Èlò àti Iṣẹ́',
        countries: 'Àwọn Orílẹ̀-èdè tí a So',
        volunteers: 'Àwọn Olùrànlọ́wọ́ tí a So'
      },
      realChange: {
        title: 'Ìyípadà Gidi, Ipa Gidi',
        content1: 'Láti ilé ìfowópamọ́ oúnjẹ ìbílẹ̀ dé ìrànlọ́wọ́ fún àjálù àgbáyé, pẹpẹ wa ń ṣe ìdánilójú pé gbogbo ènìyàn le rí àtìlẹ́yìn tí wọ́n nílò.',
        content2: 'Dàpọ̀ mọ́ wa láti kọ́ nẹ́tíwọ́ọ̀kì àtìlẹ́yìn tó rọrùn níbi tí kò sí ẹni tí yóò ní ìmọ̀lára pé òun nìkan wà.'
      }
    },
    contact: {
      title: 'Kàn sí Wa',
      email: {
        title: '📧 Ímeèlì',
        subtitle: 'Àwọn ìbéèrè tàbí àbá?'
      },
      location: {
        title: '📍 Ibùdó',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 Dàpọ̀ mọ́ Wa',
        subtitle: 'Bẹ̀rẹ̀ sí ṣe ìyàtọ̀',
        content: 'ní àdúgbò rẹ lónìí'
      },
      footer: {
        copyright: '© 2024 Humanity Bridge. Gbogbo ẹ̀tọ́ ni a fi pamọ́.',
        tagline: 'Síso àwọn ọkàn àti ọwọ́ pọ̀ káàkiri àgbáyé'
      }
    }
  },
  hi: {
    nav: {
      about: 'हमारे बारे में',
      impact: 'प्रभाव',
      contact: 'संपर्क करें'
    },
    hero: {
      subtitle: 'वैश्विक प्रभाव • 1,500+ मासिक उपयोगकर्ता',
      helpTitle: 'ग्लोब का उपयोग कैसे करें',
      helpItems: [
        '🌍 ग्लोब को घुमाने के लिए क्लिक करें और खींचें',
        '🔍 ज़ूम इन/आउट के लिए स्क्रॉल करें',
        '🎯 स्थानीय परियोजनाएं देखने के लिए किसी भी क्षेत्र पर ज़ूम करें',
        '📍 विवरण देखने के लिए मार्कर पर क्लिक करें',
        '🏷️ विशिष्ट अवसर खोजने के लिए फ़िल्टर का उपयोग करें'
      ]
    },
    about: {
      title: 'ह्यूमैनिटी ब्रिज के बारे में',
      whoWeAre: {
        title: 'हम कौन हैं',
        content: 'ह्यूमैनिटी ब्रिज एक प्रगतिशील प्लेटफ़ॉर्म है जो स्वयंसेवकों और जरूरतमंदों को स्थानीय संसाधनों, सामुदायिक सहायता और सार्थक अवसरों से जोड़ने के लिए समर्पित है।'
      },
      mission: {
        title: 'हमारा मिशन',
        content: 'समुदायों को जोड़कर समुदायों के बीच की दूरी को कम करना।'
      },
      howItWorks: {
        title: 'कैसे काम करता है',
        content: 'आस-पास के सामुदायिक संसाधन, फूड बैंक, आश्रय और स्वयंसेवी अवसर खोजने के लिए हमारे इंटरैक्टिव ग्लोब को ब्राउज़ करें।'
      },
      impact: {
        title: 'प्रभाव',
        content: '175+ देशों में 10,000 से अधिक स्वयंसेवकों को आवश्यक संसाधनों से जोड़ना, 1.4 मिलियन+ सत्यापित स्थानों के साथ।'
      },
      getInvolved: {
        title: 'जुड़ें',
        content: 'चाहे आप सामुदायिक संसाधन खोज रहे हों या दूसरों की मदद करना चाहते हों, हम आपके लिए यहाँ हैं।'
      }
    },
    impact: {
      title: 'मजबूत समुदायों का निर्माण',
      connecting: {
        title: 'समुदायों को जोड़ना',
        content1: 'ह्यूमैनिटी ब्रिज में, हम मानते हैं कि हर किसी को सामुदायिक संसाधनों तक पहुंच का अधिकार है।',
        content2: 'चाहे आप सामुदायिक सहायता खोज रहे हों या दूसरों की मदद करना चाहते हों, हम आपको सीधे सत्यापित स्थानीय संगठनों से जोड़ते हैं।'
      },
      stats: {
        resources: 'संसाधन और परियोजनाएं',
        countries: 'जुड़े देश',
        volunteers: 'जुड़े स्वयंसेवक'
      },
      realChange: {
        title: 'वास्तविक परिवर्तन, वास्तविक प्रभाव',
        content1: 'स्थानीय फूड बैंक से लेकर वैश्विक आपदा राहत तक, हमारा प्लेटफ़ॉर्म सुनिश्चित करता है कि हर कोई आवश्यक सहायता प्राप्त कर सके।',
        content2: 'एक सुलभ सहायता नेटवर्क बनाने में हमारे साथ जुड़ें जहाँ कोई भी अकेला महसूस न करे।'
      }
    },
    contact: {
      title: 'संपर्क करें',
      email: {
        title: '📧 ईमेल',
        subtitle: 'प्रश्न या सुझाव?'
      },
      location: {
        title: '📍 स्थान',
        address: ['11770 US Highway 1', 'Palm Beach Gardens', 'Florida, FL 33408']
      },
      join: {
        title: '🤝 हमसे जुड़ें',
        subtitle: 'बदलाव लाना शुरू करें',
        content: 'आज अपने समुदाय में'
      },
      footer: {
        copyright: '© 2024 ह्यूमैनिटी ब्रिज। सर्वाधिकार सुरक्षित।',
        tagline: 'दुनिया भर में दिलों और हाथों को जोड़ना'
      }
    }
  }
}

// Then use it in the initialization check
if (!translations || !translations.en) {
  console.error('Translations not properly initialized')
  translations = {
    en: {
      nav: {
        about: 'About',
        impact: 'Impact',
        contact: 'Contact'
      }
    }
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  const value = {
    language,
    setLanguage,
    t: (key) => {
      try {
        const keys = key.split('.')
        let current = translations[language] || translations['en']
        
        for (const k of keys) {
          if (!current || current[k] === undefined) {
            console.warn(`Translation missing for key: ${key} in language: ${language}`)
            current = translations['en']
            for (const fallbackK of keys) {
              if (!current || current[fallbackK] === undefined) {
                return key
              }
              current = current[fallbackK]
            }
            return current
          }
          current = current[k]
        }
        return current
      } catch (error) {
        console.error('Translation error:', error)
        return key
      }
    }
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 