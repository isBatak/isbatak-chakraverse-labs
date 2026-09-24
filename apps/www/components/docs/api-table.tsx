import { styled } from "styled-system/jsx"

import api from "../../data/api.json"

interface ApiMember {
  type: string
  description: string
  defaultValue?: string
}

const Th = styled("th", {
  base: {
    pb: "3",
    pe: "4",
    textAlign: "start",
    fontSize: "xs",
    fontWeight: "normal",
    textTransform: "uppercase",
    letterSpacing: "wider",
    color: "fg.subtle",
    borderBottomWidth: "1px",
  },
})

const Td = styled("td", {
  base: {
    py: "4",
    pe: "4",
    verticalAlign: "top",
  },
})

const Mono = styled("span", {
  base: {
    fontFamily: "mono",
    fontSize: "0.925em",
    color: "fg.muted",
    overflowWrap: "anywhere",
  },
})

function formatType(type: string) {
  if (!type.endsWith(" | undefined")) return type
  return type.slice(0, -" | undefined".length).replace(/^\((.*)\)$/, "$1")
}

interface ApiTableProps {
  name: keyof typeof api
  kind: "context" | "api"
}

export function ApiTable({ name, kind }: ApiTableProps) {
  const members = Object.entries(api[name][kind] as Record<string, ApiMember>)
  const hasDefaults = members.some(([, member]) => member.defaultValue)

  return (
    <styled.div overflowX="auto" my="6">
      <styled.table w="full" borderCollapse="collapse">
        <colgroup>
          <styled.col w={{ base: "36%", md: "28%" }} />
          <col />
          {hasDefaults && <styled.col w={{ base: "18%", md: "20%" }} />}
        </colgroup>
        <thead>
          <tr>
            <Th>{kind === "context" ? "Prop" : "Property"}</Th>
            <Th>Type</Th>
            {hasDefaults && <Th>Default</Th>}
          </tr>
        </thead>
        <tbody>
          {members.map(([key, member]) => (
            <styled.tr key={key} borderBottomWidth="1px" _last={{ borderBottomWidth: "0" }}>
              <Td>
                <code>{key}</code>
              </Td>
              <Td>
                <Mono>{formatType(member.type)}</Mono>
                <styled.div mt="1.5" color="fg.muted">
                  {member.description}
                </styled.div>
              </Td>
              {hasDefaults && (
                <Td>
                  {member.defaultValue ? (
                    <Mono>{member.defaultValue}</Mono>
                  ) : (
                    <styled.span color="fg.subtle">—</styled.span>
                  )}
                </Td>
              )}
            </styled.tr>
          ))}
        </tbody>
      </styled.table>
    </styled.div>
  )
}
