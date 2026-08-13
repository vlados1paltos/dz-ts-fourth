declare module "simple-react-validator" {
  type ValidatorOptions = {
    element?: (message: string, className: string) => React.ReactNode;
    messages?: Record<string, string>;
    className?: string;
    autoForceUpdate?: unknown;
  };

  export default class SimpleReactValidator {
    constructor(options?: ValidatorOptions);

    message(
      field: string,
      value: unknown,
      validators: string
    ): React.ReactNode;

    showMessageFor(field: string): void;
    showMessages(): void;
    hideMessages(): void;
    allValid(): boolean;
  }
}
