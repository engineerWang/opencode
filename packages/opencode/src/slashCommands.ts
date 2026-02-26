export interface SlashCommand {
  name: string;
  description: string;
  shortcut?: string;
}

export const SLASH_COMMANDS: SlashCommand[] = [
  { name: 'undo', description: 'Undo last action', shortcut: '<leader>u' },
  { name: 'redo', description: 'Redo last undone action', shortcut: '<leader>r' },
];