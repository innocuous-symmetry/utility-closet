import React from 'react';

export type PickElementProps<
  TElement extends keyof React.JSX.IntrinsicElements,
  TProps extends keyof React.ComponentProps<TElement>
> = Pick<React.ComponentProps<TElement>, TProps>;

export function clickVirtualDownloadLink(
    url: string,
    filename: string,
) {
    const a = document.createElement('a');

    a.href = url;
    a.download = filename;
    a.target = "_blank";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
