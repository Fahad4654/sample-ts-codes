interface GestureEvents {
  swipeLeft?: () => void;
  swipeRight?: () => void;
  swipeUp?: () => void;
  swipeDown?: () => void;
  tap?: () => void;
  longPress?: () => void;
}

class GestureDetector {
  private startX: number = 0;
  private startY: number = 0;
  private startTime: number = 0;
  private isLongPress: boolean = false;
  private longPressTimeout: number | null = null;

  constructor(private element: HTMLElement, private events: GestureEvents) {
    this.element.addEventListener('touchstart', this.handleTouchStart);
    this.element.addEventListener('touchmove', this.handleTouchMove);
    this.element.addEventListener('touchend', this.handleTouchEnd);
    this.element.addEventListener('mousedown', this.handleTouchStart);
    this.element.addEventListener('mousemove', this.handleTouchMove);
    this.element.addEventListener('mouseup', this.handleTouchEnd);
    this.element.addEventListener('mouseleave', this.handleTouchEnd);
  }

  private handleTouchStart = (e: TouchEvent | MouseEvent) => {
    const touch = (e instanceof TouchEvent) ? e.touches[0] : e;
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startTime = Date.now();
    this.isLongPress = false;

    this.longPressTimeout = setTimeout(() => {
      this.isLongPress = true;
      if (this.events.longPress) {
        this.events.longPress();
      }
    }, 500);
  };

  private handleTouchMove = (e: TouchEvent | MouseEvent) => {
    if (this.longPressTimeout) {
      clearTimeout(this.longPressTimeout);
      this.longPressTimeout = null;
    }
  };

  private handleTouchEnd = (e: TouchEvent | MouseEvent) => {
    if (this.longPressTimeout) {
      clearTimeout(this.longPressTimeout);
      this.longPressTimeout = null;
    }

    const touch = (e instanceof TouchEvent) ? e.changedTouches[0] : e;
    const endX = touch ? touch.clientX : this.startX;
    const endY = touch ? touch.clientY : this.startY;
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    const deltaTime = Date.now() - this.startTime;

    if (this.isLongPress) return;

    if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && this.events.swipeRight) {
          this.events.swipeRight();
        } else if (deltaX < 0 && this.events.swipeLeft) {
          this.events.swipeLeft();
        }
      } else {
        if (deltaY > 0 && this.events.swipeDown) {
          this.events.swipeDown();
        } else if (deltaY < 0 && this.events.swipeUp) {
          this.events.swipeUp();
        }
      }
    } else if (deltaTime < 300 && this.events.tap) {
      this.events.tap();
    }
  };

  public destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
    this.element.removeEventListener('mousedown', this.handleTouchStart);
    this.element.removeEventListener('mousemove', this.handleTouchMove);
    this.element.removeEventListener('mouseup', this.handleTouchEnd);
    this.element.removeEventListener('mouseleave', this.handleTouchEnd);
    if (this.longPressTimeout) clearTimeout(this.longPressTimeout);
  }
}