interface CalendlyWidget {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
  }) => void;
}

declare global {
  interface Window {
    Calendly: CalendlyWidget;
  }
}
