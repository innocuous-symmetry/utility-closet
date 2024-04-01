# Utility Closet

I've collected a few personal favorite problem-solvers that I reuse often. They tend to solve common problems that I
encounter across domains, and often gravitate towards object- and type-wrangling.

## Installation

```bash
npm install utility-closet
pnpm install utility-closet
bun install utility-closet
```

## Examples

Quick and easy object manipulation:

```ts
import { excludeFromObject, pickFromObject } from "utility-closet/obj";

const starting = {
    one: "one",
    two: "two"
}

const result = excludeFromObject(starting, 'one') satisfies Exclude<typeof starting, 'one'>;
const otherResult = pickFromObject(starting, 'one') satisfies Pick<typeof starting, 'one'>;
```

Moving fast in React:

```tsx
import type { PickElementProps, ElementProps } from "utility-closet/dom"

type ButtonProps = PickElementProps<'button', 'onClick' | 'className'>;

function Button({ onClick, className }: ButtonProps) {
    return (
        <button onClick={onClick} className={className}>
            Cool button
        </button>
    )
}

// or if you want to skip some more steps:
type LinkProps = PickElementProps<'a', 'className' | 'href' | 'target' | 'rel'>;
function Link(props: LinkProps) {
    return <a {...props}>Link</a>
}

// this also pairs well with your own generics
type SVGProps<
    TProps extends ElementProps<'svg'> = ElementProps<'svg'>
> = PickElementProps<'svg', TProps>;

function FirstSVG(props: SVGProps<'onClick'>) {
    return <svg {...props} />
}

function SecondSVG(props: SVGProps<'className'>) {
    return <svg {...props} />
}

// assigning a default value to the type parameter allows us to optionally reference an element's full subset of props
function UnboundedSVG(props: SVGProps) {
    return <svg {...props} />
}

```
