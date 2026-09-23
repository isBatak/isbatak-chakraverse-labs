import type { ComponentType } from "react";
import * as runtime from "react/jsx-runtime";

type MDXComponents = Record<string, ComponentType<any>>;

const sharedComponents: MDXComponents = {};

function getMDXComponent(
  code: string,
): ComponentType<{ components?: MDXComponents }> {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

interface MDXContentProps {
  code: string;
  components?: MDXComponents;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = getMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
}
