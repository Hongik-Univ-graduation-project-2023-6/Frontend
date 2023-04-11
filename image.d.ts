declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
// declare module '*.svg' {
//   import React from 'react';
//   export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   export default src;
// }
declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
