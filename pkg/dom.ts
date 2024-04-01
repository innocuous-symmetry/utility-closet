import React from 'react';

/**
 * Given an JSX element type `TElement`, returns a subset of its props
 * specified in the union `TProps`.
 */
export type PickElementProps<
  TElement extends keyof React.JSX.IntrinsicElements,
  TProps extends keyof React.ComponentProps<TElement>
> = Pick<React.ComponentProps<TElement>, TProps>;

/**
 * Given an JSX element type `TElement`, returns its full set of props,
 * excluding members of the union `TProps`.
 */
export type ExcludeElementProps<
  TElement extends keyof React.JSX.IntrinsicElements,
  TProps extends keyof React.ComponentProps<TElement>
> = Exclude<keyof React.ComponentProps<TElement>, TProps>;

export type ElementProps<TElement extends keyof React.JSX.IntrinsicElements> = React.ComponentProps<TElement>;

/**
 * Mounts a virtual <a> tag and virtually clicks it, intiating a download
 * on the client's device.
 *
 * @param url the URL location of the desired resource
 * @param filename the name to assign to the download once completed
 */
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
