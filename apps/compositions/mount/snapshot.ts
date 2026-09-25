import type * as wheelPicker from "@isbatak/zag-wheel-picker"

type Machine = typeof wheelPicker.machine

const registry = globalThis as typeof globalThis & { __compositionsSnapshots?: Map<string, string | null> }
const snapshots = (registry.__compositionsSnapshots ??= new Map())

export function resetSnapshot(exampleId: string) {
  for (const key of snapshots.keys()) if (key.startsWith(`${exampleId}:`)) snapshots.delete(key)
}

export function withSnapshot(machine: Machine, exampleId: string): Machine {
  return {
    ...machine,
    props(params) {
      const key = `${exampleId}:${params.props.collection?.getValues().join()}`
      return machine.props!({
        ...params,
        props: {
          ...params.props,
          ...(snapshots.has(key) && { defaultValue: snapshots.get(key) }),
          onValueChange(details) {
            snapshots.set(key, details.value)
            params.props.onValueChange?.(details)
          },
        },
      })
    },
  }
}
