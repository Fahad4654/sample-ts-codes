namespace Easing {

  export type EasingFunction = (t: number) => number;

  export const linear: EasingFunction = t => t;

  export const easeInQuad: EasingFunction = t => t * t;

  export const easeOutQuad: EasingFunction = t => t * (2 - t);

  export const easeInOutQuad: EasingFunction = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  export const easeInCubic: EasingFunction = t => t * t * t;

  export const easeOutCubic: EasingFunction = t => 1 + --t * t * t;

  export const easeInOutCubic: EasingFunction = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  export const easeInQuart: EasingFunction = t => t * t * t * t;

  export const easeOutQuart: EasingFunction = t => 1 - --t * t * t * t;

  export const easeInOutQuart: EasingFunction = t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

  export const easeInQuint: EasingFunction = t => t * t * t * t * t;

  export const easeOutQuint: EasingFunction = t => 1 + --t * t * t * t * t;

  export const easeInOutQuint: EasingFunction = t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;

  export const easeInSine: EasingFunction = t => 1 - Math.cos((t * Math.PI) / 2);

  export const easeOutSine: EasingFunction = t => Math.sin((t * Math.PI) / 2);

  export const easeInOutSine: EasingFunction = t => -(Math.cos(Math.PI * t) - 1) / 2;

  export const easeInExpo: EasingFunction = t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1));

  export const easeOutExpo: EasingFunction = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  export const easeInOutExpo: EasingFunction = t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (2 - Math.pow(2, -10 * --t));
  };

  export const easeInCirc: EasingFunction = t => 1 - Math.sqrt(1 - t * t);

  export const easeOutCirc: EasingFunction = t => Math.sqrt(1 - --t * t);

  export const easeInOutCirc: EasingFunction = t => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);

}