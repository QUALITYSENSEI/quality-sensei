export interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'cursor' | 'comment' | 'error';
  content: string;
  delay?: number;
}