"use client"

import { createListCollection } from "@ark-ui/react/collection"
import { Portal } from "@ark-ui/react/portal"
import { useTheme } from "next-themes"
import { styled } from "styled-system/jsx"

import { type FrameworkId, useFramework } from "../docs/framework"
import { Button, type ButtonProps } from "../ui/button"
import { Icon, type IconName } from "../ui/icon"
import { Select } from "../ui/select"

const react = { label: "React", value: "react" }
const vue = { label: "Vue", value: "vue" }
const svelte = { label: "Svelte", value: "svelte" }
const solid = { label: "Solid", value: "solid" }
const preact = { label: "Preact", value: "preact" }
const vanilla = { label: "Vanilla JS", value: "vanilla" }

const frameworks = createListCollection({ items: [react, vue, svelte, solid, preact, vanilla] })

const frameworkIcons: Record<FrameworkId, IconName> = {
  react: "brand-react",
  vue: "brand-vue",
  svelte: "brand-svelte",
  solid: "brand-solidjs",
  preact: "brand-preact",
  vanilla: "brand-javascript",
}

function ToolbarButton(props: ButtonProps) {
  return <Button variant="subtle" size="sm" px="0" aspectRatio="square" {...props} />
}

function FrameworkSelect() {
  const { framework, setFramework } = useFramework()

  return (
    <Select.Root
      collection={frameworks}
      value={[framework]}
      onValueChange={(details) => details.value[0] && setFramework(details.value[0] as FrameworkId)}
      positioning={{ placement: "bottom-start" }}
      size="sm"
      width="auto"
    >
      <Select.Trigger asChild>
        <ToolbarButton aria-label={`Framework: ${frameworks.stringify(framework)}`}>
          <Icon size="md" name={frameworkIcons[framework]} />
        </ToolbarButton>
      </Select.Trigger>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="44">
            <Select.Item item={react}>
              <Icon size="sm" name="brand-react" />
              <Select.ItemText flex="1">React</Select.ItemText>
              <Select.ItemIndicator>
                <Icon name="check" />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item item={vue}>
              <Icon size="sm" name="brand-vue" />
              <Select.ItemText flex="1">Vue</Select.ItemText>
              <Select.ItemIndicator>
                <Icon name="check" />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item item={svelte}>
              <Icon size="sm" name="brand-svelte" />
              <Select.ItemText flex="1">Svelte</Select.ItemText>
              <Select.ItemIndicator>
                <Icon name="check" />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item item={solid}>
              <Icon size="sm" name="brand-solidjs" />
              <Select.ItemText flex="1">Solid</Select.ItemText>
              <Select.ItemIndicator>
                <Icon name="check" />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item item={preact}>
              <Icon size="sm" name="brand-preact" />
              <Select.ItemText flex="1">Preact</Select.ItemText>
              <Select.ItemIndicator>
                <Icon name="check" />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item item={vanilla}>
              <Icon size="sm" name="brand-javascript" />
              <Select.ItemText flex="1">Vanilla JS</Select.ItemText>
              <Select.ItemIndicator>
                <Icon name="check" />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export interface PreviewToolbarProps {
  fullscreen: boolean
  onFullscreenChange: (fullscreen: boolean) => void
  showSource: boolean
  onShowSourceChange: (showSource: boolean) => void
  onReset: () => void
}

export function PreviewToolbar({
  fullscreen,
  onFullscreenChange,
  showSource,
  onShowSourceChange,
  onReset,
}: PreviewToolbarProps) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <styled.div
      role="toolbar"
      aria-label="Preview"
      display="flex"
      gap="1.5"
      p="1.5"
      borderRadius="l3"
      borderWidth="1px"
      bg="bg/80"
      backdropFilter="blur(8px)"
    >
      <FrameworkSelect />
      <ToolbarButton
        aria-label={showSource ? "Show preview" : "Show source"}
        aria-pressed={showSource}
        onClick={() => onShowSourceChange(!showSource)}
      >
        <Icon size="md" name={showSource ? "components" : "code"} />
      </ToolbarButton>
      <ToolbarButton aria-label="Reset preview" onClick={onReset}>
        <Icon size="md" name="refresh" />
      </ToolbarButton>
      <ToolbarButton
        aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
        aria-pressed={fullscreen}
        onClick={() => onFullscreenChange(!fullscreen)}
      >
        <Icon size="md" name={fullscreen ? "minimize" : "maximize"} />
      </ToolbarButton>
      <ToolbarButton
        aria-label="Toggle color mode"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <Icon size="md" name="contrast" />
      </ToolbarButton>
    </styled.div>
  )
}
