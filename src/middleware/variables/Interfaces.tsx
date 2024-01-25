export interface ButtonLinkInterface {
  domain: string;
  text: string;
  classNames?: string;
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
  type: string;
  name: string;
  onChange: (e: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
}