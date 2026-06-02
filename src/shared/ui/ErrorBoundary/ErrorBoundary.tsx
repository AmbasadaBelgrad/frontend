import { Component, type ReactNode } from "react";
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "./ErrorBoundary.types";

import { ErrorFallback } from "./ErrorFallback";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
    };
  }

  render(): ReactNode {
    const { hasError } = this.state;

    if (hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
