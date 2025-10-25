export const productsData = {
  en: {
    "consumer-loan": {
      id: "consumer-loan",
      title: "Consumer Loan",
      description:
        "Solve your daily needs without financial pressure. Easy conditions, fast approval loan.",
      image: "/assets/images/iphone17.png",
      conditions: {
        amount: "Up to 10 million MNT",
        interestRate: "2.4-3.4%",
        duration: "Up to 30 months",
        downPayment: "Up to 50%",
        collateral: "Movable property",
      },
      tabs: {
        conditions: true,
        purpose: false,
        requirements: false,
        documents: true,
      },
      documents: {
        citizens: [
          "ID card certificate",
          "Residential address confirmation",
          "Income proof for the last 1 year / Social insurance certificate, Bank statement/",
          "Certificate of no debt to others by court decision",
          "Credit information bureau certificate /FICO credit rating score certificate/",
          "Others /If necessary/",
        ],
      },
    },
    "auto-loan": {
      id: "auto-loan",
      title: "Auto Loan",
      description:
        "We support you in buying your dream car. Low down payment, flexible payment terms.",
      image: "/assets/images/land300.jpeg",
      conditions: {
        amount: "Not exceeding 60% of the vehicle purchase price",
        interestRate: "2.9-3.2%",
        duration: "Up to 60 months",
        downPayment: "40%",
        collateral: "Vehicle",
      },
      tabs: {
        conditions: true,
        purpose: false,
        requirements: false,
        documents: true,
      },
      documents: {
        citizens: [
          "ID card certificate",
          "Residential address confirmation",
          "Income proof for the last 1 year / Social insurance certificate, Bank statement/",
          "Certificate of no debt to others by court decision",
          "Credit information bureau certificate /FICO credit rating score certificate/",
          "Others /If necessary/",
        ],
      },
    },
    "salary-loan": {
      id: "salary-loan",
      title: "Salary Loan",
      description:
        "You can get a loan even if you don't receive your salary through XasBank. It's enough to just pay social insurance.",
      image: "/assets/images/Salary.png",
      conditions: {
        amount: "Up to 10 million MNT",
        interestRate: "2.5-5%",
        duration: "Up to 60 months",
        downPayment: "",
        collateral: "Future salary income",
      },
      tabs: {
        conditions: true,
        purpose: false,
        requirements: true,
        documents: true,
      },
      requirements: [
        "Must have worked for a legal entity for at least 12 months and be a permanent employee;",
        "Must not have a bad credit history.",
      ],
      documents: {
        citizens: [
          "ID card certificate",
          "Residential address confirmation",
          "Income proof for the last 1 year / Social insurance certificate, Bank statement/",
          "Certificate of no debt to others by court decision",
          "Credit information bureau certificate /FICO credit rating score certificate/",
          "Others /If necessary/",
        ],
      },
    },
    "business-loan": {
      id: "business-loan",
      title: "Business Loan",
      description:
        "We provide the capital you need to expand your business. All you need is a trusted partner.",
      image: "/assets/images/Business.png",
      conditions: {
        amount: "Up to 300 million MNT /Up to 50%-60% of collateral value/",
        interestRate: "2.9-5%",
        duration: "Up to 60 months",
        downPayment: "",
        collateral:
          "Real estate, Future cash income, Movable property, Vehicle",
      },
      tabs: {
        conditions: true,
        purpose: true,
        requirements: true,
        documents: true,
      },
      purpose: [
        "If you are planning to start a new business or want to increase your working capital and expand your business to increase your profit, the 'working capital financing' loan will help you;",
        "Even if you have business income, you can take a loan for household consumption purposes such as buying furniture, electrical appliances for your home, repairing your house or apartment, paying for your child's tuition, or traveling.",
      ],
      requirements: [
        "Have sufficient business income to repay the loan;",
        "Have been operating the business for more than 6 months;",
        "Have movable or immovable property as collateral.",
      ],
      documents: {
        citizens: [
          "ID card certificate",
          "Residential address confirmation",
          "Income proof for the last 1 year / Social insurance certificate, Bank statement/",
          "Certificate of no debt to others by court decision",
          "Credit information bureau certificate /FICO credit rating score certificate/",
          "Others /If necessary/",
        ],
      },
    },
  },
  mn: {
    "consumer-loan": {
      id: "consumer-loan",
      title: "Хэрэглээний зээл",
      description:
        "Өдөр тутмын хэрэгцээгээ санхүүгийн дарамтгүйгээр шийдээрэй. Хялбар нөхцөлтэй, хурдан олголттой зээл.",
      image: "/assets/images/iphone17.png",
      conditions: {
        amount: "10 сая төгрөг хүртэл",
        interestRate: "2.4-3.4%",
        duration: "30 сар хүртэл",
        downPayment: "50% хүртэл",
        collateral: "Хөдлөх хөрөнгө",
      },
      tabs: {
        conditions: true,
        purpose: false,
        requirements: false,
        documents: true,
      },
      documents: {
        citizens: [
          "Иргэний үнэмлэх лавлагаа",
          "Оршин суугаа хаяг тодорхойлолт",
          "Сүүлийн 1 жил орлого нотлох баримт / Нийгмийн даатгалын лавлагаа, Дансны хуулга/",
          "Шүүхийн шийдвэрээр бусдад өр төлбөргүй лавлагаа",
          "Зээлийн мэдээллийн сангын лавлагаа /FICO зээлжих зэрэглэлийн оноо лавлагаа/",
          "Бусад /Шаардлагатай тохиолдолд/",
        ],
      },
    },
    "auto-loan": {
      id: "auto-loan",
      title: "Авто машин худалдан авах зээл",
      description:
        "Мөрөөдлийн машинаа худалдан авахад тань дэмжлэг үзүүлнэ. Урьдчилгаа бага, уян төлбөрийн нөхцөлтэй.",
      image: "/assets/images/land300.jpeg",
      conditions: {
        amount: "Худалдан авж буй авто машины 60%-с хэтрэхгүй",
        interestRate: "2.9-3.2%",
        duration: "60 сар хүртэл",
        downPayment: "40%",
        collateral: "Авто машин",
      },
      tabs: {
        conditions: true,
        purpose: false,
        requirements: false,
        documents: true,
      },
      documents: {
        citizens: [
          "Иргэний үнэмлэх лавлагаа",
          "Оршин суугаа хаяг тодорхойлолт",
          "Сүүлийн 1 жил орлого нотлох баримт / Нийгмийн даатгалын лавлагаа, Дансны хуулга/",
          "Шүүхийн шийдвэрээр бусдад өр төлбөргүй лавлагаа",
          "Зээлийн мэдээллийн сангын лавлагаа /FICO зээлжих зэрэглэлийн оноо лавлагаа/",
          "Бусад /Шаардлагатай тохиолдолд/",
        ],
      },
    },
    "salary-loan": {
      id: "salary-loan",
      title: "Цалингийн зээл",
      description:
        "Та ХасБанкаар цалингаа авдаггүй байсан ч зээл авах боломжтой. Ердөө НДШ төлдөг байхад хангалттай.",
      image: "/assets/images/Salary.png",
      conditions: {
        amount: "10 сая төгрөг хүртэл",
        interestRate: "2.5-5%",
        duration: "60 сар хүртэл",
        downPayment: "",
        collateral: "Ирээдүйд орж ирэх цалингийн орлого",
      },
      tabs: {
        conditions: true,
        purpose: false,
        requirements: true,
        documents: true,
      },
      requirements: [
        "Хуулийн этгээдэд 12 сараас доошгүй хугацаанд ажилласан, үндсэн ажилтан байх;",
        "Зээлийн муу түүхгүй байх.",
      ],
      documents: {
        citizens: [
          "Иргэний үнэмлэх лавлагаа",
          "Оршин суугаа хаяг тодорхойлолт",
          "Сүүлийн 1 жил орлого нотлох баримт / Нийгмийн даатгалын лавлагаа, Дансны хуулга/",
          "Шүүхийн шийдвэрээр бусдад өр төлбөргүй лавлагаа",
          "Зээлийн мэдээллийн сангын лавлагаа /FICO зээлжих зэрэглэлийн оноо лавлагаа/",
          "Бусад /Шаардлагатай тохиолдолд/",
        ],
      },
    },
    "business-loan": {
      id: "business-loan",
      title: "Бизнесийн зээл",
      description:
        "Бизнесээ өргөжүүлэхэд шаардлагатай хөрөнгийг бид олгоно. Итгэлтэй хамтрагч тань байхад л хангалттай.",
      image: "/assets/images/Business.png",
      conditions: {
        amount: "300 сая төгрөг хүртэл /Барьцаа хөрөнгийн 50%-60% хүртэл/",
        interestRate: "2.9-5%",
        duration: "60 сар хүртэл",
        downPayment: "",
        collateral:
          "Үл хөдлөх хөрөнгө, Ирээдүйд орж ирэх мөнгөн орлого, Хөдлөх хөрөнгө, Авто машин",
      },
      tabs: {
        conditions: true,
        purpose: true,
        requirements: true,
        documents: true,
      },
      purpose: [
        'Та шинээр бизнес эрхлэх гэж буй болон эргэлтийн хөрөнгөө нэмэгдүүлэх, бизнесээ өргөжүүлж ашиг орлогоо өсгөхөөр зорьж байгаа бол "эргэлтийн хөрөнгийн санхүүжилт"-ийн зээл танд туслана;',
        "Та бизнесийн орлоготой ч гэртээ тавилга, цахилгаан бараа авах, хашаа байшин, орон сууцаа засварлах, хүүхдийнхээ сургалтын төлбөрийг төлөх, аялаж зугаалах зорилгоор өрхийн хэрэглээндээ зориулж зээл авч болно.",
      ],
      requirements: [
        "Зээлээ эргэн төлөхүйц бизнесийн орлоготой, баталгаажсан байх;",
        "Тухайн бизнесээ 6 сараас дээш хугацаанд эрхэлсэн байх;",
        "Хөдлөх болон үл хөдлөх хөрөнгийн барьцаатай байх.",
      ],
      documents: {
        citizens: [
          "Иргэний үнэмлэх лавлагаа",
          "Оршин суугаа хаяг тодорхойлолт",
          "Сүүлийн 1 жил орлого нотлох баримт / Нийгмийн даатгалын лавлагаа, Дансны хуулга/",
          "Шүүхийн шийдвэрээр бусдад өр төлбөргүй лавлагаа",
          "Зээлийн мэдээллийн сангын лавлагаа /FICO зээлжих зэрэглэлийн оноо лавлагаа/",
          "Бусад /Шаардлагатай тохиолдолд/",
        ],
      },
    },
  },
};
