export interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'cursor' | 'comment';
  content: string;
  delay?: number;
}