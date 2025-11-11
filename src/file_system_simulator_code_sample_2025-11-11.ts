interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  parent: Directory | null;
}

class File implements FileSystemNode {
  name: string;
  type: 'file';
  parent: Directory | null;
  content: string;

  constructor(name: string, parent: Directory | null = null, content: string = "") {
    this.name = name;
    this.type = 'file';
    this.parent = parent;
    this.content = content;
  }

  read(): string {
    return this.content;
  }

  write(data: string): void {
    this.content = data;
  }
}

class Directory implements FileSystemNode {
  name: string;
  type: 'directory';
  parent: Directory | null;
  children: { [name: string]: FileSystemNode };

  constructor(name: string, parent: Directory | null = null) {
    this.name = name;
    this.type = 'directory';
    this.parent = parent;
    this.children = {};
  }

  add(node: FileSystemNode): void {
    this.children[node.name] = node;
  }

  remove(name: string): void {
    delete this.children[name];
  }

  getChild(name: string): FileSystemNode | undefined {
    return this.children[name];
  }
}

class FileSystem {
  root: Directory;
  currentDirectory: Directory;

  constructor() {
    this.root = new Directory('/');
    this.currentDirectory = this.root;
  }

  createFile(name: string, content: string = ""): void {
    const file = new File(name, this.currentDirectory, content);
    this.currentDirectory.add(file);
  }

  createDirectory(name: string): void {
    const dir = new Directory(name, this.currentDirectory);
    this.currentDirectory.add(dir);
  }

  changeDirectory(path: string): void {
    if (path === '/') {
      this.currentDirectory = this.root;
      return;
    }

    if (path === '..') {
      if (this.currentDirectory.parent) {
        this.currentDirectory = this.currentDirectory.parent;
      }
      return;
    }

    const targetDir = this.currentDirectory.getChild(path);
    if (targetDir && targetDir.type === 'directory') {
      this.currentDirectory = targetDir as Directory;
    }
  }

  readFile(name: string): string | undefined {
    const file = this.currentDirectory.getChild(name);
    if (file && file.type === 'file') {
      return (file as File).read();
    }
    return undefined;
  }

  writeFile(name: string, content: string): void {
      const file = this.currentDirectory.getChild(name);
      if (file && file.type === 'file'){
          (file as File).write(content);
      } else {
          this.createFile(name,content);
      }
  }

  listDirectory(): string[] {
    return Object.keys(this.currentDirectory.children);
  }
}