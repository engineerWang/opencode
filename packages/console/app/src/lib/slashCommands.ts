import { SLASH_COMMANDS } from '@opencode-ai/opencode/src/slashCommands';

export function getSlashCommandSuggestions(input: string) {
  return SLASH_COMMANDS.filter(cmd => 
    cmd.name.startsWith(input.slice(1).toLowerCase())
  ).map(cmd => ({
    label: `/${cmd.name}`,
    detail: cmd.description,
    documentation: cmd.shortcut
  }));
}