/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module '*.svg' {
  import React from 'react';
  const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
