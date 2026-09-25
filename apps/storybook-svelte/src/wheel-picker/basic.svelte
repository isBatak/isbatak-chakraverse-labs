<script lang="ts">
  import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
  import { frameworkCollection, type WheelPickerControls } from "@isbatak/storybook-shared"
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { normalizeProps, useMachine } from "@zag-js/svelte"

  const styles = wheelPickerRecipe()

  interface Props extends Partial<WheelPickerControls> {
    onValueChange?: (details: wheelPicker.ValueChangeDetails) => void
  }

  const props: Props = $props()
  const id = $props.id()
  const service = useMachine(wheelPicker.machine, () => ({
    id,
    collection: frameworkCollection,
    defaultValue: "react",
    name: "framework",
    ...props,
  }))
  const api = $derived(wheelPicker.connect(service, normalizeProps))
</script>

<main class="wheel-picker">
  <div {...api.getRootProps()} class={styles.root}>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label {...api.getLabelProps()} class={styles.label}>Framework</label>
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
      {#each frameworkCollection.items as item (item.value)}
        <option value={item.value} disabled={item.disabled}>{item.label}</option>
      {/each}
    </select>
  </div>
  <output data-testid="value">Selected: {api.valueAsString}</output>
</main>
