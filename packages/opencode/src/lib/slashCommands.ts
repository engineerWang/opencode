import { SLASH_COMMANDS } from '../slashCommands';

export function getSlashCommandSuggestions(input: string) {
  const command = input.slice(1).toLowerCase();
  return SLASH_COMMANDS.filter(cmd => 
    cmd.name.startsWith(command)
  ).map(cmd => ({
    label: `/${cmd.name}`,
    detail: cmd.description
  }));
}