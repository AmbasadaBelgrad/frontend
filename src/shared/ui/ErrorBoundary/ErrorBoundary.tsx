import { Component, type ErrorInfo, type ReactNode } from "react";
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
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return <ErrorFallback error={error} errorInfo={errorInfo} />;
    }

    return this.props.children;
  }
}
