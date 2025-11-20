interface ScrollbarOptions {
  trackColor?: string;
  thumbColor?: string;
  thumbHoverColor?: string;
  animationDuration?: number;
}

class CustomScrollbar {
  private element: HTMLElement;
  private scrollbarTrack: HTMLDivElement;
  private scrollbarThumb: HTMLDivElement;
  private options: ScrollbarOptions;
  private isDragging: boolean = false;
  private startY: number = 0;
  private thumbOffsetY: number = 0;

  constructor(element: HTMLElement, options: ScrollbarOptions = {}) {
    this.element = element;
    this.options = {
      trackColor: options.trackColor || '#f0f0f0',
      thumbColor: options.thumbColor || '#ccc',
      thumbHoverColor: options.thumbHoverColor || '#aaa',
      animationDuration: options.animationDuration || 200,
    };

    this.scrollbarTrack = document.createElement('div');
    this.scrollbarThumb = document.createElement('div');

    this.init();
  }

  private init() {
    this.scrollbarTrack.classList.add('custom-scrollbar-track');
    this.scrollbarThumb.classList.add('custom-scrollbar-thumb');

    Object.assign(this.scrollbarTrack.style, {
      backgroundColor: this.options.trackColor,
      position: 'absolute',
      top: '0',
      right: '0',
      width: '8px',
      height: '100%',
      borderRadius: '4px',
      overflow: 'hidden',
      zIndex: '10'
    });

    Object.assign(this.scrollbarThumb.style, {
      backgroundColor: this.options.thumbColor,
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: `background-color ${this.options.animationDuration}ms ease`
    });

    this.scrollbarTrack.appendChild(this.scrollbarThumb);
    this.element.appendChild(this.scrollbarTrack);
    this.element.style.overflow = 'hidden';
    this.element.style.position = 'relative';

    this.updateThumbSize();
    this.updateThumbPosition();

    this.element.addEventListener('scroll', this.updateThumbPosition.bind(this));
    window.addEventListener('resize', this.updateThumbSize.bind(this));

    this.scrollbarThumb.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDragging = true;
      this.startY = e.clientY;
      this.thumbOffsetY = this.scrollbarThumb.offsetTop;
      document.addEventListener('mousemove', this.dragThumb.bind(this));
      document.addEventListener('mouseup', this.stopDragging.bind(this));
    });

    this.scrollbarThumb.addEventListener('mouseover', () => {
      this.scrollbarThumb.style.backgroundColor = this.options.thumbHoverColor || '';
    });

    this.scrollbarThumb.addEventListener('mouseout', () => {
      this.scrollbarThumb.style.backgroundColor = this.options.thumbColor || '';
    });
  }

  private updateThumbSize() {
    const trackHeight = this.scrollbarTrack.offsetHeight;
    const contentHeight = this.element.scrollHeight;
    const visibleHeight = this.element.offsetHeight;
    const thumbHeight = Math.max(20, trackHeight * (visibleHeight / contentHeight)); // Minimum thumb height

    this.scrollbarThumb.style.height = `${thumbHeight}px`;
  }

  private updateThumbPosition() {
    const contentHeight = this.element.scrollHeight;
    const visibleHeight = this.element.offsetHeight;
    const scrollTop = this.element.scrollTop;
    const trackHeight = this.scrollbarTrack.offsetHeight;
    const thumbHeight = this.scrollbarThumb.offsetHeight;

    const thumbPosition = (scrollTop / (contentHeight - visibleHeight)) * (trackHeight - thumbHeight);

    this.scrollbarThumb.style.top = `${thumbPosition}px`;
  }

  private dragThumb(e: MouseEvent) {
    if (!this.isDragging) return;

    const deltaY = e.clientY - this.startY;
    const trackHeight = this.scrollbarTrack.offsetHeight;
    const thumbHeight = this.scrollbarThumb.offsetHeight;
    const contentHeight = this.element.scrollHeight;
    const visibleHeight = this.element.offsetHeight;

    let newThumbPosition = this.thumbOffsetY + deltaY;
    newThumbPosition = Math.max(0, Math.min(newThumbPosition, trackHeight - thumbHeight));

    this.scrollbarThumb.style.top = `${newThumbPosition}px`;

    const scrollTop = (newThumbPosition / (trackHeight - thumbHeight)) * (contentHeight - visibleHeight);
    this.element.scrollTop = scrollTop;
  }

  private stopDragging() {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.dragThumb.bind(this));
    document.removeEventListener('mouseup', this.stopDragging.bind(this));
  }

  destroy() {
    this.element.style.overflow = '';
    this.element.style.position = '';
    this.element.removeChild(this.scrollbarTrack);
    this.element.removeEventListener('scroll', this.updateThumbPosition.bind(this));
    window.removeEventListener('resize', this.updateThumbSize.bind(this));
  }
}

export default CustomScrollbar;