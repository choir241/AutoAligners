export interface ButtonProps {
  text: string;
  handleButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  classNames?: string;
  key?: string;
}

export interface ButtonSubmitProps {
  text: string;
  handleButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export interface ButtonLinkProps {
  domain: string;
  text: string;
  classNames?: string;
}

export interface Search {
  searchValue: string;
  setSearchValue: (e: string) => void;
  setData: (e: any[]) => void;
  suggestions: React.JSX.Element | undefined;
  setSuggestions: (e: React.JSX.Element) => void;
  hidden: boolean;
  setHidden: (e: boolean) => void;
  database: string;
  collection: string;
  filterArray: string[];
}

export interface nav {
  pageHeading: string;
}

export interface buttons {
  cartLength: number;
  setCurrentPage: (e: number) => void;
  currentPage: number;
  rowsPerPage: number;
  className?: string;
}

export interface DisplayDate {
  date: string;
  quantityTotal: number;
  totalProfit?: number;
}

//interface type for Car type
export interface Car {
  id_: number;
  manufacturer: string;
  model: string;
  year: number;
  vin: string;
}

//interface type for selecting car data (model, year, make)
export interface CarSelectData {
  onMakeSelect: (e: React.JSX.Element[]) => void;
  onModelSelect: (e: React.JSX.Element[]) => void;
  onYearSelect: (e: React.JSX.Element[]) => void;
  carMake: string;
  carModel: string;
}

//interface type for resetting car make/car year/and car model values
export interface SelectOptions {
  defaultValue: string;
  options: React.JSX.Element[];
  onChange: (e: string) => void;
  resetModel: (e: string) => void;
  resetYear: (e: string) => void;
  resetMake: (e: string) => void;
  carYear: string;
  carMake: string;
  carModel: string;
}

//interface type for comment input
export interface TextBox {
  height: number;
  width: number;
  onChange: (e: string) => void;
  placeholder: string;
}

//interface type for general inputs
export interface GeneralInput {
  type: string;
  onChange: (e: any) => void;
  placeholder?: string;
  minlength?: number;
  maxlength?: number;
  value?: string;
  defaultValue?: string;
  id?: string;
}

export interface ChooseInput {
  text1: string;
  text2: string;
  name: string;
  onChange: (e: string) => void;
}

export interface Choose {
  text1: string;
  text2: string;
  name: string;
  onChange: (e: string) => void;
  defaultValue: string | undefined;
}

//interface type for estimates
export interface ServiceEstimate {
  carModel: string;
  carMake: string;
  carYear: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  contact: string;
  comment: string;
  stayLeave: string;
  service: string;
}

export interface Estimate {
  $id?: string;
  service: string;
  carMake: string;
  carModel: string;
  carYear: string;
  stayLeave?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  zipCode?: string;
  contact?: string;
  comment?: string;
}

//interface type for appointments
export interface Appointment {
  $createdAt: string;
  $id?: string;
  date: string;
  time: string;
  carModel: string;
  carMake: string;
  carYear: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  contact: string;
  comment: string;
  stayLeave: string;
  service: string;
}

export interface RenderCalendar {
  currentMonth: number;
  currentDay: number;
  currentYear: number;
  daysOfWeek: string[];
  currentDayOfWeek: number;
  setDate: (e: string) => void;
  i: number;
}

export interface TimeDateAppointments {
  setTime: (e: string) => void;
  appointments: Appointment[];
  setDate: (e: string) => void;
  date?: string;
  time?: string;
}

export interface ChangeTime {
  i: number;
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  time: string;
  setTime: (e: string) => void;
}

export interface DisplayInventory {
  pricePerUnit: number;
  itemName: string;
  manufacturer: string;
  description: string;
  reorderLevel: string;
  category: string;
}

export interface PurchasedItem {
  $createdAt: string;
  $id: string;
  name: string;
  price: string;
  quantity: string;
  cartItems: string[];
  email?: string;
}

export interface DisplayBy {
  purchases: PurchasedItem[];
  startIndex: number;
  endIndex: number;
  currentPage: number;
  setCurrentPage: (e: number) => void;
  rowsPerPage: number;
}

export interface GraphLabels {
  quantities: number[];
  profits: any[];
  dates: any[];
  cartLength: number;
  currentPage: number;
  setCurrentPage: (e: number) => void;
  rowsPerPage: number;
  startIndex: number;
  endIndex: number;
  setLimit: (e: number) => void;
  limit: number;
  length: number;
}

export interface ListLabels {
  currentPage: number;
  setCurrentPage: (e: number) => void;
  rowsPerPage: number;
  startIndex: number;
  endIndex: number;
}

export interface InputTypes {
  type: string;
  name: string;
  onChange: (e: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
}

export interface User {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: object;
  registration: string;
  status: boolean;
}

export interface SignUp {
  email: string;
  name: string;
  password: string;
}

export interface Login {
  email: string;
  name: string;
  password: string;
}

export interface InventoryItem {
  $id?: string;
  name: string;
  category: string;
  quantity: number;
  manufacturer: string;
  reOrderLV: string;
  price: string;
  description: string;
}

export interface Item {
  inventory: InventoryItem;
  itemQuantity: number | undefined;
}

export interface DefaultInventoryDisplay {
  setItemQuantity: (e: number) => void;
  inventory: InventoryItem[];
  itemQuantity: number | undefined;
}

export interface InventoryQuantity {
  itemName: string;
  cart: CartItem[];
  setItemQuantity: (e: number) => void;
  quantity: number;
}

export interface DisplayCurrentInventory {
  inventory: InventoryItem[];
  cart: CartItem[];
  setItemQuantity: (e: number) => void;
  quantity: number | undefined;
}

export interface CartItem {
  $id: string;
  itemID: string;
  category: string;
  description: string;
  manufacturer: string;
  name: string;
  price: string;
  email: string;
  quantity: string;
}

export interface CardInfo {
  cardNumber: number;
  securityNumber: string;
  expirationDate: string;
  type: string;
}

export interface renderCartQuantity {
  name: string;
  quantity: string;
  inventory: InventoryItem[];
  cartItemQuantity: string | undefined;
  setCartItemQuantity: (e: string) => void;
}

export interface AddToCart {
  cart: CartItem[];
  $id: string | undefined;
  inventory: InventoryItem[];
  quantity: any;
}

export interface CartPurchase {
  inventory: InventoryItem[];
  cart: CartItem[];
  cardInfo: CardInfo | undefined;
  total: string;
}

export interface Cart {
  cart: CartItem[];
  inventory: InventoryItem[];
  cartItemQuantity: string | undefined;
  setCartItemQuantity: (e: string) => void;
  cardInfo: CardInfo | undefined;
  setCardInfo: (e: CardInfo) => void;
  startIndex: number;
  endIndex: number;
}

export interface FinanceDisplay {
  text: string;
  display: boolean;
  setDisplay: (e: boolean) => void;
  cardInfo: CardInfo | undefined;
  setCardInfo: (e: CardInfo) => void;
  email: string;
  setEmail: (e: string) => void;
}

export interface ClientFinance {
  $id: string;
  $updatedAt: string;
  $createdAt: string;
  cardAmount: number;
  cardNumber: number;
  email: string;
  expirationDate: string;
  financeTotal: string;
  securityNumber: string;
  type: string;
}

export interface EditFinance {
  display: boolean;
  setDisplay: (e: boolean) => void;
  client: string;
  clientFinance: ClientFinance[];
  financeTotal: string;
  setFinanceTotal: (e: string) => void;
  email: string;
  setEmail: (e: string) => void;
}

export interface TableContent {
  clientFinance: ClientFinance[];
  startIndex: number;
  endIndex: number;
  displayFinance: boolean;
  setDisplayFinance: (e: boolean) => void;
  client: string;
  setClient: (e: string) => void;
  financeTotal: string;
  setFinanceTotal: (e: string) => void;
  email: string;
  setEmail: (e: string) => void;
}

export interface Profile {
  $id: string;
  email?: string;
  fileName: string;
  image: string;
  position: string;
  PTO: string;
  salary: string;
  requestedPTO: string;
  requests: string[];
}

export interface PTO {
  PTO: string;
  PTOStartDate: string;
  PTOEndDate: string;
  userID: string;
  $id: string;
  email: string;
  name: string;
}

export interface PTORequests {
  currentPTOPage: number;
  setCurrentPTOPage: (e: number) => void;
  rows: number;
  setPTODisplay: (e: boolean) => void;
  PTODisplay: boolean;
  PTORequests: PTO[];
  firstIndex: number;
  lastIndex: number;
}

export interface Approve {
  PTO: string;
  email: string;
  name: string;
  userID: string;
  startDate: string;
  endDate: string;
  $id: string;
}

export interface History {
  currentPage: number;
  setCurrentPage: (e: number) => void;
  rows: number;
  startIndex: number;
  endIndex: number;
  requests?: string[];
}

export interface Customize {
  listOfUsers: User[];
  email: string;
  salary: string;
  position: string;
  PTO: string;
}

export interface Notification {
  requests: string[] | undefined;
}
