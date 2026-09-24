<script lang="ts">
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { normalizeProps, useMachine } from "@zag-js/svelte"
  import "../../styles/wheel-picker.css"

  const collection = wheelPicker.collection({
    items: Array.from({ length: 60 }, (_, minute) => {
      const label = String(minute).padStart(2, "0")
      return { label, value: label }
    }),
  })

  const id = $props.id()
  const service = useMachine(wheelPicker.machine, {
    id,
    collection,
    defaultValue: "30",
    infinite: true,
  })

  const api = $derived(wheelPicker.connect(service, normalizeProps))
</script>

<div {...api.getRootProps()} class="wheel-picker">
  <!-- svelte-ignore a11y_label_has_associated_control -->
  <label {...api.getLabelProps()}>Minute</label>
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
