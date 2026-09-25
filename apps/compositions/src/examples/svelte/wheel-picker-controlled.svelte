<script lang="ts">
  import { css } from "@isbatak/panda-ds/css"
  import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { normalizeProps, useMachine } from "@zag-js/svelte"

  const collection = wheelPicker.collection({
    items: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
      { label: "Solid", value: "solid" },
    ],
  })

  const styles = wheelPickerRecipe()

  const classes = {
    root: css({ display: "grid", gap: "4" }),
    actions: css({ display: "flex", justifyContent: "center", gap: "2" }),
    button: css({
      px: "3",
      py: "1.5",
      borderWidth: "1px",
      borderRadius: "l2",
      textStyle: "sm",
      cursor: "pointer",
      _hover: { bg: "bg.muted" },
    }),
    output: css({ color: "fg.muted", textStyle: "sm", textAlign: "center" }),
  }

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

<div class={classes.root}>
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
  </div>
  <div class={classes.actions}>
    <button type="button" class={classes.button} onclick={() => (value = "react")}>React</button>
    <button type="button" class={classes.button} onclick={() => (value = "svelte")}>Svelte</button>
  </div>
  <output class={classes.output}>Value: {value}</output>
</div>
