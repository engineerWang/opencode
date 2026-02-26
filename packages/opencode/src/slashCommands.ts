export interface SlashCommand {
  name: string;
  description: string;
}

export const SLASH_COMMANDS: SlashCommand[] = [
  { name: 'undo', description: 'Undo last action' },
  { name: 'redo', description: 'Redo last undone action' },
];