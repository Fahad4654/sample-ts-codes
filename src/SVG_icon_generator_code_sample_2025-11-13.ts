type SVGProps = {
  size?: number;
  color?: string;
};

const generateSVGIcon = (path: string, props: SVGProps = {}): string => {
  const { size = 24, color = "currentColor" } = props;

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="${color}"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      ${path}
    </svg>
  `;
};

const ArrowRight = generateSVGIcon('<path d="M5 12h14M12 5l7 7-7 7"/>');

const Checkmark = generateSVGIcon('<path d="M20 6L9 17l-5-5"/>', { color: 'green' });

const CustomIcon = generateSVGIcon('<path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/>', {size: 32, color: 'purple'});

export { generateSVGIcon, ArrowRight, Checkmark, CustomIcon };