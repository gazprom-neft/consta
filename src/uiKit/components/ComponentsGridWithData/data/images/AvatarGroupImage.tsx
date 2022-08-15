import * as React from 'react';

const AvatarGroupImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <circle cx={70} cy={60} r={18} fill="#fff" />
      <path
        d="M83.814 71.478a17.985 17.985 0 00-24.172-26.207A17.984 17.984 0 0052 60a17.867 17.867 0 004.179 11.48l-.026.021c.09.108.193.2.286.308.115.132.24.257.36.385.36.39.73.766 1.118 1.118.118.108.24.209.36.312.411.354.834.691 1.273 1.005.056.038.108.088.164.128v-.015a17.87 17.87 0 0020.567 0v.015c.057-.04.107-.09.165-.128.437-.315.861-.65 1.273-1.005.12-.103.241-.205.36-.312.388-.353.758-.727 1.118-1.118.12-.128.243-.253.36-.385.091-.107.195-.2.285-.309l-.028-.02zM69.996 49.716a5.785 5.785 0 110 11.57 5.785 5.785 0 010-11.57zM59.722 71.478a6.422 6.422 0 016.418-6.337h7.713a6.422 6.422 0 016.418 6.337 15.349 15.349 0 01-20.55 0z"
        fill="#002033"
        fillOpacity={0.35}
      />
      <rect
        x={112}
        y={42}
        width={36}
        height={36}
        rx={4}
        fill="#002033"
        fillOpacity={0.35}
      />
      <path
        d="M129.996 49.716a5.785 5.785 0 110 11.57 5.785 5.785 0 010-11.57zM119.312 75.75c.023-1.688 1.118-7.57 2.319-8.757a6.422 6.422 0 014.509-1.852h7.713c1.688.001 3.308.666 4.509 1.852 1.201 1.186 2.303 7.07 2.326 8.757h-21.376z"
        fill="#fff"
      />
    </svg>
  );
};

export default AvatarGroupImage;
