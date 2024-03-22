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

export interface EmployeeNavInterface extends ButtonLinkInterface {
  condition: boolean;
}

export interface GeneralInputInterface {
  key?: string;
  type: string;
  name?: string;
  onChange: (e: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  id?: string;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
}

export interface ChooseTwoInputInterface {
  text1: string;
  text2: string;
  name: string;
  onChange: (e: string) => void;
}

export interface TextBoxInputInterface {
  height: number;
  width: number;
  onChange: (e: string) => void;
  placeholder: string;
}
