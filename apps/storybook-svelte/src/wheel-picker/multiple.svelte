<script lang="ts">
  import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
  import { hourCollection, meridiemCollection, minuteCollection } from "@isbatak/storybook-shared"
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { normalizeProps, useMachine } from "@zag-js/svelte"

  const styles = wheelPickerRecipe()

  const id = $props.id()
  const hourService = useMachine(wheelPicker.machine, {
    id: `${id}:hour`,
    collection: hourCollection,
    defaultValue: "9",
    infinite: true,
    name: "hour",
  })
  const minuteService = useMachine(wheelPicker.machine, {
    id: `${id}:minute`,
    collection: minuteCollection,
    defaultValue: "41",
    infinite: true,
    name: "minute",
  })
  const meridiemService = useMachine(wheelPicker.machine, {
    id: `${id}:meridiem`,
    collection: meridiemCollection,
    defaultValue: "AM",
    name: "meridiem",
  })

  const hourApi = $derived(wheelPicker.connect(hourService, normalizeProps))
  const minuteApi = $derived(wheelPicker.connect(minuteService, normalizeProps))
  const meridiemApi = $derived(wheelPicker.connect(meridiemService, normalizeProps))
  const pickers = $derived([
    { api: hourApi, collection: hourCollection, label: "Hour" },
    { api: minuteApi, collection: minuteCollection, label: "Minute" },
    { api: meridiemApi, collection: meridiemCollection, label: "Meridiem" },
  ])
</script>

<main class="wheel-picker">
  <div class="wheel-picker-group" role="group" aria-label="Time">
    {#each pickers as { api, collection, label } (label)}
      <div {...api.getRootProps()} class={styles.root}>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label {...api.getLabelProps()} class={styles.label}>{label}</label>
        <div {...api.getControlProps()} class={styles.control}>
          <div {...api.getViewportProps()} class={styles.viewport}>
            <ul {...api.getItemGroupProps()} class={styles.itemGroup}>
              {#each api.items as { item, index, key } (key)}
                <li {...api.getItemProps({ item, index })} class={styles.item}>{item.label}</li>
              {/each}
            </ul>
            <div {...api.getHighlightProps()} class={styles.highlight}>
              <ul {...api.getHighlightItemGroupProps()} class={styles.highlightItemGroup}>
                {#each api.highlightItems as { item, index, key } (key)}
                  <li {...api.getHighlightItemProps({ item, index })} class={styles.highlightItem}>{item.label}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
        <select {...api.getHiddenSelectProps()}>
          {#each collection.items as item (item.value)}
            <option value={item.value}>{item.label}</option>
          {/each}
        </select>
      </div>
    {/each}
  </div>
  <output data-testid="value">
    Selected time: {hourApi.valueAsString}:{minuteApi.valueAsString}
    {meridiemApi.valueAsString}
  </output>
</main>
