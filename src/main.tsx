import React, { ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught error inside React Tree:", error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', fontFamily: 'monospace', background: '#fff0f0', color: '#ff0000', border: '5px solid #ffcccc', borderRadius: '8px', margin: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Ops! Qualcosa è andato storto nell'applicazione.</h2>
          <p style={{ marginBottom: '12px' }}><strong>Errore:</strong> {this.state.error?.message}</p>
          <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '400px', overflow: 'auto', background: '#ffe0e0', padding: '12px', border: '1px solid #ff9999', fontSize: '12px', borderRadius: '4px' }}>
            {this.state.error?.stack}
          </pre>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '16px', marginBottom: '8px' }}>Dettagli dei componenti:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '200px', overflow: 'auto', background: '#ffe0e0', padding: '12px', border: '1px solid #ff9999', fontSize: '12px', borderRadius: '4px' }}>
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
