<script lang="ts">
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { normalizeProps, useMachine } from "@zag-js/svelte"
  import "../../styles/wheel-picker.css"

  const collection = wheelPicker.collection({
    items: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Angular", value: "angular", disabled: true },
      { label: "Svelte", value: "svelte" },
      { label: "Solid", value: "solid" },
      { label: "Preact", value: "preact" },
      { label: "Qwik", value: "qwik" },
      { label: "Lit", value: "lit" },
    ],
  })

  const id = $props.id()
  const service = useMachine(wheelPicker.machine, {
    id,
    collection,
    defaultValue: "svelte",
  })

  const api = $derived(wheelPicker.connect(service, normalizeProps))
</script>

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
  <select {...api.getHiddenSelectProps()}>
    {#each collection.items as item (item.value)}
      <option value={item.value} disabled={item.disabled}>{item.label}</option>
    {/each}
  </select>
</div>
