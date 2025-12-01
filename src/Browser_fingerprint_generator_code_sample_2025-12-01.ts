class BrowserFingerprint {
  private components: { [key: string]: string | number | boolean | null };

  constructor() {
    this.components = {};
    this.gatherComponents();
  }

  private gatherComponents(): void {
    this.components['userAgent'] = navigator.userAgent;
    this.components['platform'] = navigator.platform;
    this.components['language'] = navigator.language;
    this.components['webdriver'] = navigator.webdriver;
    this.components['deviceMemory'] = navigator.deviceMemory || null;
    this.components['hardwareConcurrency'] = navigator.hardwareConcurrency || null;
    this.components['screenResolution'] = `${screen.width}x${screen.height}`;
    this.components['availableScreenResolution'] = `${screen.availWidth}x${screen.availHeight}`;
    this.components['colorDepth'] = screen.colorDepth;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = "top";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.font = "11pt Arial";
        ctx.fillText("BrowserFingerprint", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("BrowserFingerprint", 4, 17);
        this.components['canvasFingerprint'] = canvas.toDataURL();
      } else {
        this.components['canvasFingerprint'] = null;
      }
    } catch (e) {
      this.components['canvasFingerprint'] = null;
    }

    this.components['timezoneOffset'] = new Date().getTimezoneOffset();
    this.components['sessionStorage'] = !!sessionStorage;
    this.components['localStorage'] = !!localStorage;
    this.components['indexedDB'] = !!(window.indexedDB);
    this.components['addBehavior'] = !!(document.body && document.body.addBehavior);

    try {
        this.components['plugins'] = Array.from(navigator.plugins).map(p => p.name).join(',');
    } catch (e) {
        this.components['plugins'] = null;
    }

    try {
        this.components['fonts'] = this.detectFonts();
    } catch (e) {
        this.components['fonts'] = null;
    }
  }

  private detectFonts(): string {
      const baseFonts = ['monospace', 'sans-serif', 'serif'];
      const testString = 'mmmmmmmmmmlli';
      const testSize = '72px';
      const body = document.body;
      const span = document.createElement('span');
      span.style.fontSize = testSize;
      span.innerHTML = testString;
      const defaultWidth: { [key: string]: number } = {};

      baseFonts.forEach(font => {
          span.style.fontFamily = font;
          body.appendChild(span);
          defaultWidth[font] = span.offsetWidth;
          body.removeChild(span);
      });

      const detectedFonts: string[] = [];
      const fontList = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Comic Sans MS', 'Trebuchet MS', 'Impact', 'Wingdings'];

      fontList.forEach(font => {
          span.style.fontFamily = font + ',' + baseFonts[0];
          body.appendChild(span);
          const width = span.offsetWidth;
          body.removeChild(span);

          if (width !== defaultWidth[baseFonts[0]]) {
              detectedFonts.push(font);
          }
      });

      return detectedFonts.join(',');
  }

  public getFingerprint(): string {
    return btoa(JSON.stringify(this.components));
  }
}

(function() {
  const fingerprintGenerator = new BrowserFingerprint();
  const fingerprint = fingerprintGenerator.getFingerprint();
  console.log("Browser Fingerprint:", fingerprint);
})();