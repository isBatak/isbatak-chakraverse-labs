<script lang="ts">
  import { controlledCollection } from "@isbatak/storybook-shared"
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { normalizeProps, useMachine } from "@zag-js/svelte"

  const id = $props.id()
  let value = $state("react")
  const service = useMachine(wheelPicker.machine, () => ({
    id,
    collection: controlledCollection,
    value,
    onValueChange: (details: wheelPicker.ValueChangeDetails) => (value = details.value ?? "react"),
  }))
  const api = $derived(wheelPicker.connect(service, normalizeProps))
</script>

<main class="wheel-picker">
  <div {...api.getRootProps()}>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label {...api.getLabelProps()}>Framework</label>
    <div {...api.getControlProps()}>
      <div {...api.getViewportProps()}>
        <ul {...api.getItemGroupProps()}>
          {#each api.items as { item, index, key } (key)}
            <li {...api.getItemProps({ item, index })}>{item.label}</li>
          {/each}
        </ul>
        <div {...api.getHighlightProps()}>
          <ul {...api.getHighlightItemGroupProps()}>
            {#each api.highlightItems as { item, index, key } (key)}
              <li {...api.getHighlightItemProps({ item, index })}>{item.label}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="wheel-picker-actions">
    <button type="button" onclick={() => (value = "react")}>Select React</button>
    <button type="button" onclick={() => (value = "svelte")}>Select Svelte</button>
  </div>
  <output data-testid="value">Controlled value: {api.valueAsString}</output>
</main>
