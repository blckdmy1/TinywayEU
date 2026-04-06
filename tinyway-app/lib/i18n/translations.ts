export type Language = "en" | "lv" | "lt" | "et" | "ru";

export type TranslationKeys = {
  // Header
  deliverTo: string;
  europe: string;
  searchPlaceholder: string;
  allCategories: string;
  helloSignIn: string;
  hello: string;
  account: string;
  returns: string;
  orders: string;
  cart: string;
  todaysDeals: string;
  bestSellers: string;
  newArrivals: string;
  phones: string;
  computers: string;
  tvAudio: string;
  gaming: string;
  helpSupport: string;
  
  // Main Page
  shopByCategory: string;
  thisWeeksTopPicks: string;
  handPickedDeals: string;
  saveOnPopularProducts: string;
  viewDeals: string;
  whyCustomersChooseUs: string;
  clearPrices: string;
  easyBrowsing: string;
  fastCheckout: string;
  helpfulSupport: string;
  popularCategories: string;
  findWhatYouNeed: string;
  startWithPopular: string;
  viewAllCategories: string;
  exploreProducts: string;
  fastDelivery: string;
  fastDeliveryDesc: string;
  securePayment: string;
  securePaymentDesc: string;
  easyReturns: string;
  easyReturnsDesc: string;
  bestDealsToday: string;
  saveOnFavorites: string;
  greatPrices: string;
  seeAllDeals: string;
  sale: string;
  addToCart: string;
  latestProducts: string;
  freshAdditions: string;
  viewAllNewArrivals: string;
  new: string;
  viewProduct: string;
  mostPopularWeek: string;
  trustedPicks: string;
  browseAllBestSellers: string;
  popular: string;
  needHelpChoosing: string;
  browseByCategory: string;
  simpleReadable: string;
  contactSupport: string;
  usefulLinks: string;
  deliveryInfo: string;
  paymentMethods: string;
  returnsRefunds: string;
  customerSupport: string;
  
  // Auth
  welcomeBack: string;
  signInToAccount: string;
  loginWithEmail: string;
  newHere: string;
  createAccountSeconds: string;
  accountAccess: string;
  loginToContinue: string;
  email: string;
  password: string;
  login: string;
  noAccount: string;
  signUp: string;
  backToHome: string;
  backToLogin: string;
  newAccount: string;
  createYourAccount: string;
  chooseAccountType: string;
  selectedAccountType: string;
  customer: string;
  partner: string;
  registration: string;
  createAccount: string;
  accountType: string;
  alreadyHaveAccount: string;
  
  // Customer fields
  firstName: string;
  lastName: string;
  phoneNumber: string;
  
  // Partner fields
  companyName: string;
  registrationNumber: string;
  vatNumber: string;
  contactPerson: string;
  
  // Cart
  cartTitle: string;
  loadingCart: string;
  clearCart: string;
  emptyCart: string;
  noProductsYet: string;
  continueShopping: string;
  price: string;
  remove: string;
  orderSummary: string;
  items: string;
  subtotal: string;
  delivery: string;
  free: string;
  total: string;
  checkout: string;
  
  // Cabinet
  myCabinet: string;
  checkingAccount: string;
  home: string;
  logout: string;
  noPhoto: string;
  yourProfile: string;
  noEmail: string;
  accountInfo: string;
  deliveryAddress: string;
  deliveryDetails: string;
  currentDeliveryAddress: string;
  noDeliveryAddress: string;
  changeAddress: string;
  settings: string;
  changeYourInfo: string;
  profilePhoto: string;
  uploadPhoto: string;
  saveChanges: string;
  likedProducts: string;
  savedGoods: string;
  noLikedProducts: string;
  myGoods: string;
  addManageProducts: string;
  productName: string;
  productPrice: string;
  productStock: string;
  productDescription: string;
  addProduct: string;
  noProductsAdded: string;
  stockLeft: string;
  
  // Footer
  copyright: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Header
    deliverTo: "Deliver to",
    europe: "Europe",
    searchPlaceholder: "Search products, brands, categories...",
    allCategories: "All Categories",
    helloSignIn: "Hello, sign in",
    hello: "Hello",
    account: "Account",
    returns: "Returns",
    orders: "& Orders",
    cart: "Cart",
    todaysDeals: "Today's Deals",
    bestSellers: "Best Sellers",
    newArrivals: "New Arrivals",
    phones: "Phones",
    computers: "Computers",
    tvAudio: "TV & Audio",
    gaming: "Gaming",
    helpSupport: "Help & Support",
    
    // Main Page
    shopByCategory: "Shop by Category",
    thisWeeksTopPicks: "This week's top picks",
    handPickedDeals: "Hand-picked deals customers love",
    saveOnPopularProducts: "Save on popular products across electronics, home and lifestyle.",
    viewDeals: "View Deals",
    whyCustomersChooseUs: "Why customers choose us",
    clearPrices: "Clear prices with no confusion",
    easyBrowsing: "Easy category browsing",
    fastCheckout: "Fast and secure checkout",
    helpfulSupport: "Helpful customer support",
    popularCategories: "Popular Categories",
    findWhatYouNeed: "Find what you need faster",
    startWithPopular: "Start with the most popular sections to quickly reach the products you are looking for.",
    viewAllCategories: "View all categories",
    exploreProducts: "Explore products in this category",
    fastDelivery: "Fast delivery",
    fastDeliveryDesc: "Quick dispatch and reliable shipping updates.",
    securePayment: "Secure payment",
    securePaymentDesc: "Safe checkout with trusted payment methods.",
    easyReturns: "Easy returns",
    easyReturnsDesc: "Clear return policy and helpful support when needed.",
    bestDealsToday: "Best Deals Today",
    saveOnFavorites: "Save on selected favorites",
    greatPrices: "Great prices on products customers check most often.",
    seeAllDeals: "See all deals",
    sale: "Sale",
    addToCart: "Add to Cart",
    latestProducts: "Latest products in store",
    freshAdditions: "Fresh additions for work, home and entertainment.",
    viewAllNewArrivals: "View all new arrivals",
    new: "New",
    viewProduct: "View Product",
    mostPopularWeek: "Most popular products this week",
    trustedPicks: "Trusted picks customers return to again and again.",
    browseAllBestSellers: "Browse all best sellers",
    popular: "Popular",
    needHelpChoosing: "Need help choosing?",
    browseByCategory: "Browse by category, compare products, and find the right item faster",
    simpleReadable: "We designed the store to be simple and readable, so customers can find products quickly and shop with confidence.",
    contactSupport: "Contact Support",
    usefulLinks: "Useful Links",
    deliveryInfo: "Delivery Information",
    paymentMethods: "Payment Methods",
    returnsRefunds: "Returns & Refunds",
    customerSupport: "Customer Support",
    
    // Auth
    welcomeBack: "Welcome Back",
    signInToAccount: "Sign in to your TinyWay account",
    loginWithEmail: "Login with your email and password to access your personal cabinet.",
    newHere: "New here?",
    createAccountSeconds: "Create an account in a few seconds.",
    accountAccess: "Account Access",
    loginToContinue: "Login to continue",
    email: "Email",
    password: "Password",
    login: "Login",
    noAccount: "Do not have an account?",
    signUp: "Sign up",
    backToHome: "Back to home",
    backToLogin: "Back to login",
    newAccount: "New Account",
    createYourAccount: "Create your TinyWay account",
    chooseAccountType: "Choose your account type. The registration form changes automatically for customer or partner.",
    selectedAccountType: "Selected account type",
    customer: "Customer",
    partner: "Partner",
    registration: "Registration",
    createAccount: "Create account",
    accountType: "Account type",
    alreadyHaveAccount: "Already have an account?",
    
    // Customer fields
    firstName: "First name",
    lastName: "Last name",
    phoneNumber: "Phone number",
    
    // Partner fields
    companyName: "Company name",
    registrationNumber: "Registration number",
    vatNumber: "VAT number",
    contactPerson: "Contact person",
    
    // Cart
    cartTitle: "Cart",
    loadingCart: "Loading cart...",
    clearCart: "Clear cart",
    emptyCart: "Your cart is empty",
    noProductsYet: "Looks like you have not added any products yet.",
    continueShopping: "Continue shopping",
    price: "Price",
    remove: "Remove",
    orderSummary: "Order summary",
    items: "Items",
    subtotal: "Subtotal",
    delivery: "Delivery",
    free: "Free",
    total: "Total",
    checkout: "Checkout",
    
    // Cabinet
    myCabinet: "My Cabinet",
    checkingAccount: "Checking your account...",
    home: "Home",
    logout: "Logout",
    noPhoto: "No photo",
    yourProfile: "Your Profile",
    noEmail: "No email",
    accountInfo: "Account Information",
    deliveryAddress: "Delivery Address",
    deliveryDetails: "Delivery details",
    currentDeliveryAddress: "Current delivery address",
    noDeliveryAddress: "You have not added a delivery address yet.",
    changeAddress: "Change address",
    settings: "Settings",
    changeYourInfo: "Change your information",
    profilePhoto: "Profile Photo",
    uploadPhoto: "Upload Photo",
    saveChanges: "Save changes",
    likedProducts: "Liked products",
    savedGoods: "Saved Goods",
    noLikedProducts: "You have no liked products yet.",
    myGoods: "My Goods",
    addManageProducts: "Add and manage your products",
    productName: "Product name",
    productPrice: "Product price",
    productStock: "Stock quantity",
    productDescription: "Product description",
    addProduct: "Add product",
    noProductsAdded: "You have not added any products yet.",
    stockLeft: "Stock left",
    
    // Footer
    copyright: "© 2026 TinyWay.eu",
  },
  
  lv: {
    // Header
    deliverTo: "Piegādāt uz",
    europe: "Eiropu",
    searchPlaceholder: "Meklēt produktus, zīmolus, kategorijas...",
    allCategories: "Visas kategorijas",
    helloSignIn: "Sveiki, pierakstīties",
    hello: "Sveiki",
    account: "Konts",
    returns: "Atgriešana",
    orders: "un pasūtījumi",
    cart: "Grozs",
    todaysDeals: "Šodienas piedāvājumi",
    bestSellers: "Populārākās preces",
    newArrivals: "Jaunumi",
    phones: "Telefoni",
    computers: "Datori",
    tvAudio: "TV un audio",
    gaming: "Spēles",
    helpSupport: "Palīdzība",
    
    // Main Page
    shopByCategory: "Iepirkties pēc kategorijas",
    thisWeeksTopPicks: "Šīs nedēļas labākais",
    handPickedDeals: "Klientu iemīļoti piedāvājumi",
    saveOnPopularProducts: "Ietaupiet uz populāriem produktiem elektronikā, mājās un dzīvesveidā.",
    viewDeals: "Skatīt piedāvājumus",
    whyCustomersChooseUs: "Kāpēc klienti izvēlas mūs",
    clearPrices: "Skaidras cenas bez neskaidrībām",
    easyBrowsing: "Ērta kategoriju pārlūkošana",
    fastCheckout: "Ātra un droša apmaksa",
    helpfulSupport: "Izpalīdzīgs klientu atbalsts",
    popularCategories: "Populārās kategorijas",
    findWhatYouNeed: "Atrodiet vajadzīgo ātrāk",
    startWithPopular: "Sāciet ar populārākajām sadaļām, lai ātri atrastu meklētos produktus.",
    viewAllCategories: "Skatīt visas kategorijas",
    exploreProducts: "Izpētīt produktus šajā kategorijā",
    fastDelivery: "Ātra piegāde",
    fastDeliveryDesc: "Ātra nosūtīšana un uzticami piegādes atjauninājumi.",
    securePayment: "Droša apmaksa",
    securePaymentDesc: "Droša apmaksa ar uzticamām maksājumu metodēm.",
    easyReturns: "Vienkārša atgriešana",
    easyReturnsDesc: "Skaidra atgriešanas politika un palīdzība.",
    bestDealsToday: "Labākie šodienas piedāvājumi",
    saveOnFavorites: "Ietaupiet uz izvēlētajiem favorītiem",
    greatPrices: "Lieliskas cenas produktiem, kurus klienti pārbauda visbiežāk.",
    seeAllDeals: "Skatīt visus piedāvājumus",
    sale: "Izpārdošana",
    addToCart: "Pievienot grozam",
    latestProducts: "Jaunākie produkti veikalā",
    freshAdditions: "Jauni papildinājumi darbam, mājai un izklaidei.",
    viewAllNewArrivals: "Skatīt visus jaunumus",
    new: "Jauns",
    viewProduct: "Skatīt produktu",
    mostPopularWeek: "Šīs nedēļas populārākie produkti",
    trustedPicks: "Uzticami produkti, pie kuriem klienti atgriežas.",
    browseAllBestSellers: "Pārlūkot visus bestsellerus",
    popular: "Populārs",
    needHelpChoosing: "Vajag palīdzību izvēlē?",
    browseByCategory: "Pārlūkojiet pēc kategorijas, salīdziniet produktus un atrodiet pareizo preci ātrāk",
    simpleReadable: "Mēs izveidojām veikalu vienkāršu un lasāmu, lai klienti varētu ātri atrast produktus.",
    contactSupport: "Sazināties ar atbalstu",
    usefulLinks: "Noderīgas saites",
    deliveryInfo: "Piegādes informācija",
    paymentMethods: "Maksājumu metodes",
    returnsRefunds: "Atgriešana un atmaksa",
    customerSupport: "Klientu atbalsts",
    
    // Auth
    welcomeBack: "Laipni lūdzam atpakaļ",
    signInToAccount: "Pierakstieties savā TinyWay kontā",
    loginWithEmail: "Pierakstieties ar e-pastu un paroli, lai piekļūtu personīgajam kabinetam.",
    newHere: "Jauns šeit?",
    createAccountSeconds: "Izveidojiet kontu dažu sekunžu laikā.",
    accountAccess: "Piekļuve kontam",
    loginToContinue: "Pierakstieties, lai turpinātu",
    email: "E-pasts",
    password: "Parole",
    login: "Pierakstīties",
    noAccount: "Nav konta?",
    signUp: "Reģistrēties",
    backToHome: "Atpakaļ uz sākumu",
    backToLogin: "Atpakaļ uz pierakstīšanos",
    newAccount: "Jauns konts",
    createYourAccount: "Izveidojiet savu TinyWay kontu",
    chooseAccountType: "Izvēlieties konta veidu. Reģistrācijas forma automātiski mainās klientam vai partnerim.",
    selectedAccountType: "Izvēlētais konta veids",
    customer: "Klients",
    partner: "Partneris",
    registration: "Reģistrācija",
    createAccount: "Izveidot kontu",
    accountType: "Konta veids",
    alreadyHaveAccount: "Jau ir konts?",
    
    // Customer fields
    firstName: "Vārds",
    lastName: "Uzvārds",
    phoneNumber: "Tālruņa numurs",
    
    // Partner fields
    companyName: "Uzņēmuma nosaukums",
    registrationNumber: "Reģistrācijas numurs",
    vatNumber: "PVN numurs",
    contactPerson: "Kontaktpersona",
    
    // Cart
    cartTitle: "Grozs",
    loadingCart: "Ielādē grozu...",
    clearCart: "Iztīrīt grozu",
    emptyCart: "Jūsu grozs ir tukšs",
    noProductsYet: "Izskatās, ka vēl neesat pievienojis nevienu produktu.",
    continueShopping: "Turpināt iepirkties",
    price: "Cena",
    remove: "Noņemt",
    orderSummary: "Pasūtījuma kopsavilkums",
    items: "Preces",
    subtotal: "Starpsumma",
    delivery: "Piegāde",
    free: "Bezmaksas",
    total: "Kopā",
    checkout: "Noformēt pasūtījumu",
    
    // Cabinet
    myCabinet: "Mans kabinets",
    checkingAccount: "Pārbauda jūsu kontu...",
    home: "Sākums",
    logout: "Izrakstīties",
    noPhoto: "Nav foto",
    yourProfile: "Jūsu profils",
    noEmail: "Nav e-pasta",
    accountInfo: "Konta informācija",
    deliveryAddress: "Piegādes adrese",
    deliveryDetails: "Piegādes detaļas",
    currentDeliveryAddress: "Pašreizējā piegādes adrese",
    noDeliveryAddress: "Jūs vēl neesat pievienojis piegādes adresi.",
    changeAddress: "Mainīt adresi",
    settings: "Iestatījumi",
    changeYourInfo: "Mainīt savu informāciju",
    profilePhoto: "Profila foto",
    uploadPhoto: "Augšupielādēt foto",
    saveChanges: "Saglabāt izmaiņas",
    likedProducts: "Iemīļotie produkti",
    savedGoods: "Saglabātās preces",
    noLikedProducts: "Jums vēl nav iemīļotu produktu.",
    myGoods: "Manas preces",
    addManageProducts: "Pievienot un pārvaldīt savus produktus",
    productName: "Produkta nosaukums",
    productPrice: "Produkta cena",
    productStock: "Noliktavas daudzums",
    productDescription: "Produkta apraksts",
    addProduct: "Pievienot produktu",
    noProductsAdded: "Jūs vēl neesat pievienojis nevienu produktu.",
    stockLeft: "Atlikums noliktavā",
    
    // Footer
    copyright: "© 2026 TinyWay.eu",
  },
  
  lt: {
    // Header
    deliverTo: "Pristatyti į",
    europe: "Europą",
    searchPlaceholder: "Ieškoti produktų, prekių ženklų, kategorijų...",
    allCategories: "Visos kategorijos",
    helloSignIn: "Sveiki, prisijungti",
    hello: "Sveiki",
    account: "Paskyra",
    returns: "Grąžinimai",
    orders: "ir užsakymai",
    cart: "Krepšelis",
    todaysDeals: "Šiandienos pasiūlymai",
    bestSellers: "Perkamiausios prekės",
    newArrivals: "Naujienos",
    phones: "Telefonai",
    computers: "Kompiuteriai",
    tvAudio: "TV ir garso",
    gaming: "Žaidimai",
    helpSupport: "Pagalba",
    
    // Main Page
    shopByCategory: "Pirkti pagal kategoriją",
    thisWeeksTopPicks: "Šios savaitės geriausi",
    handPickedDeals: "Klientų mėgstami pasiūlymai",
    saveOnPopularProducts: "Sutaupykite populiariems elektronikos, namų ir gyvenimo būdo produktams.",
    viewDeals: "Žiūrėti pasiūlymus",
    whyCustomersChooseUs: "Kodėl klientai renkasi mus",
    clearPrices: "Aiškios kainos be painiavos",
    easyBrowsing: "Lengvas kategorijų naršymas",
    fastCheckout: "Greitas ir saugus apmokėjimas",
    helpfulSupport: "Pagalbinė klientų aptarnavimas",
    popularCategories: "Populiarios kategorijos",
    findWhatYouNeed: "Raskite tai, ko reikia, greičiau",
    startWithPopular: "Pradėkite nuo populiariausių skyrių, kad greitai rastumėte ieškomus produktus.",
    viewAllCategories: "Žiūrėti visas kategorijas",
    exploreProducts: "Naršyti produktus šioje kategorijoje",
    fastDelivery: "Greitas pristatymas",
    fastDeliveryDesc: "Greitas išsiuntimas ir patikimi pristatymo atnaujinimai.",
    securePayment: "Saugus mokėjimas",
    securePaymentDesc: "Saugus apmokėjimas patikimais mokėjimo būdais.",
    easyReturns: "Lengvas grąžinimas",
    easyReturnsDesc: "Aiški grąžinimo politika ir pagalba prireikus.",
    bestDealsToday: "Geriausi šiandienos pasiūlymai",
    saveOnFavorites: "Sutaupykite pasirinktiems mėgstamiems",
    greatPrices: "Puikios kainos produktams, kuriuos klientai tikrina dažniausiai.",
    seeAllDeals: "Žiūrėti visus pasiūlymus",
    sale: "Išpardavimas",
    addToCart: "Į krepšelį",
    latestProducts: "Naujausi produktai parduotuvėje",
    freshAdditions: "Nauji papildymai darbui, namams ir pramogoms.",
    viewAllNewArrivals: "Žiūrėti visas naujienas",
    new: "Nauja",
    viewProduct: "Žiūrėti produktą",
    mostPopularWeek: "Populiariausi šios savaitės produktai",
    trustedPicks: "Patikimi produktai, prie kurių klientai grįžta.",
    browseAllBestSellers: "Naršyti visus perkamiausius",
    popular: "Populiaru",
    needHelpChoosing: "Reikia pagalbos renkantis?",
    browseByCategory: "Naršykite pagal kategoriją, palyginkite produktus ir raskite tinkamą prekę greičiau",
    simpleReadable: "Sukūrėme parduotuvę paprastą ir aiškią, kad klientai galėtų greitai rasti produktus.",
    contactSupport: "Susisiekti su pagalba",
    usefulLinks: "Naudingos nuorodos",
    deliveryInfo: "Pristatymo informacija",
    paymentMethods: "Mokėjimo būdai",
    returnsRefunds: "Grąžinimai ir pinigų grąžinimas",
    customerSupport: "Klientų aptarnavimas",
    
    // Auth
    welcomeBack: "Sveiki sugrįžę",
    signInToAccount: "Prisijunkite prie savo TinyWay paskyros",
    loginWithEmail: "Prisijunkite el. paštu ir slaptažodžiu, kad pasiektumėte asmeninį kabinetą.",
    newHere: "Naujas čia?",
    createAccountSeconds: "Susikurkite paskyrą per kelias sekundes.",
    accountAccess: "Paskyros prieiga",
    loginToContinue: "Prisijunkite, kad tęstumėte",
    email: "El. paštas",
    password: "Slaptažodis",
    login: "Prisijungti",
    noAccount: "Neturite paskyros?",
    signUp: "Registruotis",
    backToHome: "Grįžti į pradžią",
    backToLogin: "Grįžti į prisijungimą",
    newAccount: "Nauja paskyra",
    createYourAccount: "Sukurkite savo TinyWay paskyrą",
    chooseAccountType: "Pasirinkite paskyros tipą. Registracijos forma automatiškai keičiasi klientui ar partneriui.",
    selectedAccountType: "Pasirinktas paskyros tipas",
    customer: "Klientas",
    partner: "Partneris",
    registration: "Registracija",
    createAccount: "Sukurti paskyrą",
    accountType: "Paskyros tipas",
    alreadyHaveAccount: "Jau turite paskyrą?",
    
    // Customer fields
    firstName: "Vardas",
    lastName: "Pavardė",
    phoneNumber: "Telefono numeris",
    
    // Partner fields
    companyName: "Įmonės pavadinimas",
    registrationNumber: "Registracijos numeris",
    vatNumber: "PVM numeris",
    contactPerson: "Kontaktinis asmuo",
    
    // Cart
    cartTitle: "Krepšelis",
    loadingCart: "Kraunamas krepšelis...",
    clearCart: "Išvalyti krepšelį",
    emptyCart: "Jūsų krepšelis tuščias",
    noProductsYet: "Atrodo, kad dar nepridėjote jokių produktų.",
    continueShopping: "Tęsti apsipirkimą",
    price: "Kaina",
    remove: "Pašalinti",
    orderSummary: "Užsakymo santrauka",
    items: "Prekės",
    subtotal: "Tarpinė suma",
    delivery: "Pristatymas",
    free: "Nemokamas",
    total: "Viso",
    checkout: "Apmokėti",
    
    // Cabinet
    myCabinet: "Mano kabinetas",
    checkingAccount: "Tikrinama jūsų paskyra...",
    home: "Pradžia",
    logout: "Atsijungti",
    noPhoto: "Nėra nuotraukos",
    yourProfile: "Jūsų profilis",
    noEmail: "Nėra el. pašto",
    accountInfo: "Paskyros informacija",
    deliveryAddress: "Pristatymo adresas",
    deliveryDetails: "Pristatymo detalės",
    currentDeliveryAddress: "Dabartinis pristatymo adresas",
    noDeliveryAddress: "Dar nepridėjote pristatymo adreso.",
    changeAddress: "Keisti adresą",
    settings: "Nustatymai",
    changeYourInfo: "Keisti savo informaciją",
    profilePhoto: "Profilio nuotrauka",
    uploadPhoto: "Įkelti nuotrauką",
    saveChanges: "Išsaugoti pakeitimus",
    likedProducts: "Patikusios prekės",
    savedGoods: "Išsaugotos prekės",
    noLikedProducts: "Dar neturite patikusių produktų.",
    myGoods: "Mano prekės",
    addManageProducts: "Pridėti ir valdyti savo produktus",
    productName: "Produkto pavadinimas",
    productPrice: "Produkto kaina",
    productStock: "Sandėlio kiekis",
    productDescription: "Produkto aprašymas",
    addProduct: "Pridėti produktą",
    noProductsAdded: "Dar nepridėjote jokių produktų.",
    stockLeft: "Likutis sandėlyje",
    
    // Footer
    copyright: "© 2026 TinyWay.eu",
  },
  
  et: {
    // Header
    deliverTo: "Tarni",
    europe: "Euroopasse",
    searchPlaceholder: "Otsi tooteid, kaubamärke, kategooriaid...",
    allCategories: "Kõik kategooriad",
    helloSignIn: "Tere, logi sisse",
    hello: "Tere",
    account: "Konto",
    returns: "Tagastused",
    orders: "ja tellimused",
    cart: "Ostukorv",
    todaysDeals: "Tänased pakkumised",
    bestSellers: "Enimmüüdud",
    newArrivals: "Uued tooted",
    phones: "Telefonid",
    computers: "Arvutid",
    tvAudio: "TV ja heli",
    gaming: "Mängud",
    helpSupport: "Abi",
    
    // Main Page
    shopByCategory: "Ostke kategooria järgi",
    thisWeeksTopPicks: "Selle nädala parimad",
    handPickedDeals: "Klientide lemmikpakkumised",
    saveOnPopularProducts: "Säästke populaarsete elektroonika-, kodu- ja elustiiitoodete pealt.",
    viewDeals: "Vaata pakkumisi",
    whyCustomersChooseUs: "Miks kliendid valivad meid",
    clearPrices: "Selged hinnad ilma segaduseta",
    easyBrowsing: "Lihtne kategooriate sirvimine",
    fastCheckout: "Kiire ja turvaline maksmine",
    helpfulSupport: "Abivalmis klienditugi",
    popularCategories: "Populaarsed kategooriad",
    findWhatYouNeed: "Leidke vajalik kiiremini",
    startWithPopular: "Alustage populaarseimatest jaotistest, et kiiresti leida otsitavad tooted.",
    viewAllCategories: "Vaata kõiki kategooriaid",
    exploreProducts: "Avasta selle kategooria tooteid",
    fastDelivery: "Kiire tarne",
    fastDeliveryDesc: "Kiire saatmine ja usaldusväärsed tarneuuendused.",
    securePayment: "Turvaline makse",
    securePaymentDesc: "Turvaline maksmine usaldusväärsete makseviisidega.",
    easyReturns: "Lihtne tagastamine",
    easyReturnsDesc: "Selge tagastuspoliitika ja abi vajaduse korral.",
    bestDealsToday: "Parimad tänased pakkumised",
    saveOnFavorites: "Säästke valitud lemmikute pealt",
    greatPrices: "Suurepärased hinnad toodetele, mida kliendid enim vaatavad.",
    seeAllDeals: "Vaata kõiki pakkumisi",
    sale: "Müük",
    addToCart: "Lisa korvi",
    latestProducts: "Uusimad tooted poes",
    freshAdditions: "Värsked täiendused tööks, koduks ja meelelahutuseks.",
    viewAllNewArrivals: "Vaata kõiki uusi tooteid",
    new: "Uus",
    viewProduct: "Vaata toodet",
    mostPopularWeek: "Selle nädala populaarseimad tooted",
    trustedPicks: "Usaldusväärsed tooted, mille juurde kliendid naasevad.",
    browseAllBestSellers: "Sirvi kõiki enimmüüduid",
    popular: "Populaarne",
    needHelpChoosing: "Vajate abi valikul?",
    browseByCategory: "Sirvige kategooria järgi, võrrelge tooteid ja leidke õige toode kiiremini",
    simpleReadable: "Kujundasime poe lihtsaks ja loetavaks, et kliendid saaksid tooteid kiiresti leida.",
    contactSupport: "Võta ühendust toega",
    usefulLinks: "Kasulikud lingid",
    deliveryInfo: "Tarneinfo",
    paymentMethods: "Makseviisid",
    returnsRefunds: "Tagastused ja tagasimaksed",
    customerSupport: "Klienditugi",
    
    // Auth
    welcomeBack: "Tere tulemast tagasi",
    signInToAccount: "Logige sisse oma TinyWay kontole",
    loginWithEmail: "Logige sisse e-posti ja parooliga, et pääseda oma isiklikku kabinetti.",
    newHere: "Uus siin?",
    createAccountSeconds: "Looge konto mõne sekundiga.",
    accountAccess: "Konto juurdepääs",
    loginToContinue: "Logige sisse jätkamiseks",
    email: "E-post",
    password: "Parool",
    login: "Logi sisse",
    noAccount: "Pole kontot?",
    signUp: "Registreeru",
    backToHome: "Tagasi avalehele",
    backToLogin: "Tagasi sisselogimisse",
    newAccount: "Uus konto",
    createYourAccount: "Looge oma TinyWay konto",
    chooseAccountType: "Valige konto tüüp. Registreerimisvorm muutub automaatselt kliendile või partnerile.",
    selectedAccountType: "Valitud konto tüüp",
    customer: "Klient",
    partner: "Partner",
    registration: "Registreerimine",
    createAccount: "Loo konto",
    accountType: "Konto tüüp",
    alreadyHaveAccount: "Juba on konto?",
    
    // Customer fields
    firstName: "Eesnimi",
    lastName: "Perekonnanimi",
    phoneNumber: "Telefoninumber",
    
    // Partner fields
    companyName: "Ettevõtte nimi",
    registrationNumber: "Registreerimisnumber",
    vatNumber: "KMKR number",
    contactPerson: "Kontaktisik",
    
    // Cart
    cartTitle: "Ostukorv",
    loadingCart: "Laadib ostukorvi...",
    clearCart: "Tühjenda korv",
    emptyCart: "Teie ostukorv on tühi",
    noProductsYet: "Tundub, et te pole veel ühtegi toodet lisanud.",
    continueShopping: "Jätka ostlemist",
    price: "Hind",
    remove: "Eemalda",
    orderSummary: "Tellimuse kokkuvõte",
    items: "Tooted",
    subtotal: "Vahesumma",
    delivery: "Tarne",
    free: "Tasuta",
    total: "Kokku",
    checkout: "Maksma",
    
    // Cabinet
    myCabinet: "Minu kabinet",
    checkingAccount: "Kontrollitakse teie kontot...",
    home: "Avaleht",
    logout: "Logi välja",
    noPhoto: "Foto puudub",
    yourProfile: "Teie profiil",
    noEmail: "E-post puudub",
    accountInfo: "Konto info",
    deliveryAddress: "Tarneaadress",
    deliveryDetails: "Tarne üksikasjad",
    currentDeliveryAddress: "Praegune tarneaadress",
    noDeliveryAddress: "Te pole veel tarneaadressi lisanud.",
    changeAddress: "Muuda aadressi",
    settings: "Seaded",
    changeYourInfo: "Muutke oma teavet",
    profilePhoto: "Profiilipilt",
    uploadPhoto: "Laadi foto üles",
    saveChanges: "Salvesta muudatused",
    likedProducts: "Meeldivad tooted",
    savedGoods: "Salvestatud kaubad",
    noLikedProducts: "Teil pole veel meeldivaid tooteid.",
    myGoods: "Minu kaubad",
    addManageProducts: "Lisage ja hallake oma tooteid",
    productName: "Toote nimi",
    productPrice: "Toote hind",
    productStock: "Laokogus",
    productDescription: "Toote kirjeldus",
    addProduct: "Lisa toode",
    noProductsAdded: "Te pole veel ühtegi toodet lisanud.",
    stockLeft: "Laojääk",
    
    // Footer
    copyright: "© 2026 TinyWay.eu",
  },
  
  ru: {
    // Header
    deliverTo: "Доставить в",
    europe: "Европу",
    searchPlaceholder: "Искать товары, бренды, категории...",
    allCategories: "Все категории",
    helloSignIn: "Здравствуйте, войти",
    hello: "Здравствуйте",
    account: "Аккаунт",
    returns: "Возвраты",
    orders: "и заказы",
    cart: "Корзина",
    todaysDeals: "Акции дня",
    bestSellers: "Бестселлеры",
    newArrivals: "Новинки",
    phones: "Телефоны",
    computers: "Компьютеры",
    tvAudio: "ТВ и аудио",
    gaming: "Игры",
    helpSupport: "Помощь",
    
    // Main Page
    shopByCategory: "Покупки по категориям",
    thisWeeksTopPicks: "Лучшее на этой неделе",
    handPickedDeals: "Любимые предложения покупателей",
    saveOnPopularProducts: "Экономьте на популярных товарах электроники, дома и образа жизни.",
    viewDeals: "Смотреть акции",
    whyCustomersChooseUs: "Почему покупатели выбирают нас",
    clearPrices: "Понятные цены без путаницы",
    easyBrowsing: "Удобный просмотр категорий",
    fastCheckout: "Быстрая и безопасная оплата",
    helpfulSupport: "Отзывчивая поддержка",
    popularCategories: "Популярные категории",
    findWhatYouNeed: "Найдите нужное быстрее",
    startWithPopular: "Начните с популярных разделов, чтобы быстро найти нужные товары.",
    viewAllCategories: "Все категории",
    exploreProducts: "Изучить товары в этой категории",
    fastDelivery: "Быстрая доставка",
    fastDeliveryDesc: "Быстрая отправка и надежное отслеживание.",
    securePayment: "Безопасная оплата",
    securePaymentDesc: "Безопасная оплата проверенными способами.",
    easyReturns: "Простой возврат",
    easyReturnsDesc: "Понятная политика возврата и помощь при необходимости.",
    bestDealsToday: "Лучшие акции сегодня",
    saveOnFavorites: "Экономьте на избранном",
    greatPrices: "Отличные цены на товары, которые покупатели смотрят чаще всего.",
    seeAllDeals: "Все акции",
    sale: "Распродажа",
    addToCart: "В корзину",
    latestProducts: "Новейшие товары в магазине",
    freshAdditions: "Новые поступления для работы, дома и развлечений.",
    viewAllNewArrivals: "Все новинки",
    new: "Новинка",
    viewProduct: "Смотреть товар",
    mostPopularWeek: "Самые популярные товары недели",
    trustedPicks: "Проверенные товары, к которым возвращаются покупатели.",
    browseAllBestSellers: "Все бестселлеры",
    popular: "Популярное",
    needHelpChoosing: "Нужна помощь в выборе?",
    browseByCategory: "Просматривайте по категориям, сравнивайте товары и находите нужное быстрее",
    simpleReadable: "Мы создали магазин простым и понятным, чтобы покупатели могли быстро находить товары.",
    contactSupport: "Связаться с поддержкой",
    usefulLinks: "Полезные ссылки",
    deliveryInfo: "Информация о доставке",
    paymentMethods: "Способы оплаты",
    returnsRefunds: "Возврат и возмещение",
    customerSupport: "Поддержка клиентов",
    
    // Auth
    welcomeBack: "С возвращением",
    signInToAccount: "Войдите в свой аккаунт TinyWay",
    loginWithEmail: "Войдите с помощью email и пароля для доступа к личному кабинету.",
    newHere: "Впервые здесь?",
    createAccountSeconds: "Создайте аккаунт за несколько секунд.",
    accountAccess: "Доступ к аккаунту",
    loginToContinue: "Войдите для продолжения",
    email: "Email",
    password: "Пароль",
    login: "Войти",
    noAccount: "Нет аккаунта?",
    signUp: "Зарегистрироваться",
    backToHome: "На главную",
    backToLogin: "К входу",
    newAccount: "Новый аккаунт",
    createYourAccount: "Создайте свой аккаунт TinyWay",
    chooseAccountType: "Выберите тип аккаунта. Форма регистрации автоматически меняется для клиента или партнера.",
    selectedAccountType: "Выбранный тип аккаунта",
    customer: "Покупатель",
    partner: "Партнер",
    registration: "Регистрация",
    createAccount: "Создать аккаунт",
    accountType: "Тип аккаунта",
    alreadyHaveAccount: "Уже есть аккаунт?",
    
    // Customer fields
    firstName: "Имя",
    lastName: "Фамилия",
    phoneNumber: "Номер телефона",
    
    // Partner fields
    companyName: "Название компании",
    registrationNumber: "Регистрационный номер",
    vatNumber: "Номер НДС",
    contactPerson: "Контактное лицо",
    
    // Cart
    cartTitle: "Корзина",
    loadingCart: "Загрузка корзины...",
    clearCart: "Очистить корзину",
    emptyCart: "Ваша корзина пуста",
    noProductsYet: "Похоже, вы еще не добавили ни одного товара.",
    continueShopping: "Продолжить покупки",
    price: "Цена",
    remove: "Удалить",
    orderSummary: "Итого заказа",
    items: "Товары",
    subtotal: "Промежуточный итог",
    delivery: "Доставка",
    free: "Бесплатно",
    total: "Итого",
    checkout: "Оформить заказ",
    
    // Cabinet
    myCabinet: "Мой кабинет",
    checkingAccount: "Проверка аккаунта...",
    home: "Главная",
    logout: "Выйти",
    noPhoto: "Нет фото",
    yourProfile: "Ваш профиль",
    noEmail: "Нет email",
    accountInfo: "Информация об аккаунте",
    deliveryAddress: "Адрес доставки",
    deliveryDetails: "Детали доставки",
    currentDeliveryAddress: "Текущий адрес доставки",
    noDeliveryAddress: "Вы еще не добавили адрес доставки.",
    changeAddress: "Изменить адрес",
    settings: "Настройки",
    changeYourInfo: "Изменить информацию",
    profilePhoto: "Фото профиля",
    uploadPhoto: "Загрузить фото",
    saveChanges: "Сохранить изменения",
    likedProducts: "Понравившиеся товары",
    savedGoods: "Сохраненные товары",
    noLikedProducts: "У вас пока нет понравившихся товаров.",
    myGoods: "Мои товары",
    addManageProducts: "Добавляйте и управляйте своими товарами",
    productName: "Название товара",
    productPrice: "Цена товара",
    productStock: "Количество на складе",
    productDescription: "Описание товара",
    addProduct: "Добавить товар",
    noProductsAdded: "Вы еще не добавили ни одного товара.",
    stockLeft: "Остаток на складе",
    
    // Footer
    copyright: "© 2026 TinyWay.eu",
  },
};
