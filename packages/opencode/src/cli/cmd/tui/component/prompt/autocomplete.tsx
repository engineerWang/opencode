import type { BoxRenderable, TextareaRenderable, KeyEvent, ScrollBoxRenderable } from "@opentui/core"
import { pathToFileURL } from "bun"
import fuzzysort from "fuzzysort"
import { firstBy } from "remeda"
import { createMemo, createResource, createEffect, onMount, onCleanup, Index, Show, createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import { useSDK } from "@tui/context/sdk"
import { useSync } from "@tui/context/sync"
import { useTheme, selectedForeground } from "@tui/context/theme"
import { SplitBorder } from "@tui/component/border"
import { useCommandDialog } from "@tui/component/dialog-command"
import { useTerminalDimensions } from "@opentui/solid"
import { Locale } from "@/util/locale"
import type { PromptInfo } from "./history"
import { useFrecency } from "./frecency"
import { getSlashCommandSuggestions } from "../../../../../lib/slashCommands" // Added import

function removeLineRange(input: string) {
  const hashIndex = input.lastIndexOf("#")
  return hashIndex !== -1 ? input.substring(0, hashIndex) : input
}

// ... existing code ...

  const commands = createMemo((): AutocompleteOption[] => {
    // Use the new slash command suggestions
    const searchValue = search()
    if (searchValue?.startsWith("/")) {
      return getSlashCommandSuggestions(searchValue).map(cmd => ({
        display: cmd.label,
        description: cmd.detail,
        onSelect: () => {
          const newText = cmd.label + " "
          const cursor = props.input().logicalCursor
          props.input().deleteRange(0, 0, cursor.row, cursor.col)
          props.input().insertText(newText)
          props.input().cursorOffset = Bun.stringWidth(newText)
        },
      }))
    }

    const results: AutocompleteOption[] = [...command.slashes()]

    for (const serverCommand of sync.data.command) {
      if (serverCommand.source === "skill") continue
      const label = serverCommand.source === "mcp" ? ":mcp" : ""
      results.push({
        display: "/" + serverCommand.name + label,
        description: serverCommand.description,
        onSelect: () => {
          const newText = "/" + serverCommand.name + " "
          const cursor = props.input().logicalCursor
          props.input().deleteRange(0, 0, cursor.row, cursor.col)
          props.input().insertText(newText)
          props.input().cursorOffset = Bun.stringWidth(newText)
        },
      })
    }

    results.sort((a, b) => a.display.localeCompare(b.display))

    const max = firstBy(results, [(x) => x.display.length, "desc"])?.display.length
    if (!max) return results
    return results.map((item) => ({
      ...item,
      display: item.display.padEnd(max + 2),
    }))
  })

// ... rest of existing code ...