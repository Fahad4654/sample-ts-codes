type DragEventHandler = (e: DragEvent) => void;

interface DraggableOptions {
  onDragStart?: DragEventHandler;
  onDragEnd?: DragEventHandler;
}

interface DroppableOptions {
  onDrop?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDragEnter?: DragEventHandler;
  onDragLeave?: DragEventHandler;
}

const makeDraggable = (element: HTMLElement, options: DraggableOptions = {}) => {
  element.draggable = true;

  element.addEventListener('dragstart', (e: DragEvent) => {
    options.onDragStart?.(e);
  });

  element.addEventListener('dragend', (e: DragEvent) => {
    options.onDragEnd?.(e);
  });
};


const makeDroppable = (element: HTMLElement, options: DroppableOptions = {}) => {

  element.addEventListener('dragover', (e: DragEvent) => {
    e.preventDefault();
    options.onDragOver?.(e);
  });

  element.addEventListener('dragenter', (e: DragEvent) => {
    e.preventDefault();
    options.onDragEnter?.(e);
  });

  element.addEventListener('dragleave', (e: DragEvent) => {
    options.onDragLeave?.(e);
  });

  element.addEventListener('drop', (e: DragEvent) => {
    e.preventDefault();
    options.onDrop?.(e);
  });
};

export { makeDraggable, makeDroppable, DragEventHandler, DraggableOptions, DroppableOptions };