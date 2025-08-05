export interface IButton {
  text: string;
  handleButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  classNames?: string;
  key?: string;
}

export interface IButtonSubmit {
  className?: string;
  text: string;
  handleButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export interface IButtonLink {
  domain: string;
  text: string;
  classNames?: string;
}

export interface ITextInput {
  type: string;
  name: string;
  isDisabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
