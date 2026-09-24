<script lang="ts">
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { normalizeProps, useMachine } from "@zag-js/svelte"
  import "../../styles/wheel-picker.css"

  const collection = wheelPicker.collection({
    items: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
      { label: "Solid", value: "solid" },
    ],
  })

  const id = $props.id()
  let value = $state<string | null>("react")

  const service = useMachine(wheelPicker.machine, () => ({
    id,
    collection,
    value,
    onValueChange: (details: wheelPicker.ValueChangeDetails) => (value = details.value),
  }))

  const api = $derived(wheelPicker.connect(service, normalizeProps))
</script>

<div class="wheel-picker-example">
  <div {...api.getRootProps()} class="wheel-picker">
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
    <button type="button" onclick={() => (value = "react")}>React</button>
    <button type="button" onclick={() => (value = "svelte")}>Svelte</button>
  </div>
  <output>Value: {value}</output>
</div>
