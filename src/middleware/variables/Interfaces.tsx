export interface ButtonLinkInterface {
  domain: string;
  text: string;
  classNames?: string;
  key?: string;
}

export interface ButtonInterface {
  classNames?: string;
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface HeaderInterface {
  pageHeading?: string;
}

export interface InputInterface {
  key?: string;
  type: string;
  name: string;
  onChange: (e: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
}

export interface LogoutInterface {
  setEmailCookie: (e: string) => void;
}

export interface AuthInterface extends LogoutInterface {
  email: string;
  name: string;
  password: string;
  navigate?: void
}

export interface Auth {
  setEmail: (e: string) => void;
  setName: (e: string) => void;
  setPassword: (e: string) => void;
}

export interface EmployeeNavInterface extends ButtonLinkInterface {
  condition: boolean;
}

export interface FinanceInterface{
  bronzeFinanceDisplay?: boolean,
  silverFinanceDisplay?: boolean,
  goldFinanceDisplay?: boolean,
  setBronzeFinanceDisplay?: (e:boolean)=>void,
  setSilverFinanceDisplay?: (e:boolean)=>void,
  setGoldFinanceDisplay?: (e:boolean)=>void,
  display: boolean,
  setDisplay: (e: boolean) => void,
  email: string,
  setEmail: (e:string) => void
}