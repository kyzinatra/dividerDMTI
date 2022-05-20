// Строка, потом столбец
export class Matrix {
  private M: number[][];
  private module: number | null;
  constructor(M: number[][], module?: number) {
    this.M = M;
    this.module = module || null;
    if (this.module) this.matrixModuleConvert();
  }

  get matrix() {
    return this.M;
  }

  add(a: number, b: number, k: number = 1) {
    if (!this.M[a - 1] || !this.M[b - 1]) throw RangeError("Range Error!");
    const lineA = this.M[a - 1].map(a => this.round(this.mod(a * k)));
    this.M[b - 1] = this.M[b - 1].map((b, i) => this.round(this.mod(lineA[i] + b)));
  }
  mult(a: number, k: number) {
    this.M[a - 1] = this.M[a - 1].map(a => this.round(this.mod(a * k)));
    this.matrixModuleConvert();
  }

  private round(num: number, power: number = 5) {
    return Math.round(num * 10 ** power) / 10 ** power;
  }

  swap(a: number, b: number) {
    let fir = a - 1;
    let sec = b - 1;
    let firstRow = [...this.M[fir]];
    this.M.splice(fir, 1, this.M[sec]);
    this.M.splice(sec, 1, firstRow);
  }

  gaussMethod() {
    const width = this.M[0].length;
    const height = this.M.length;
    // столбцы
    for (let i = 0; i < width; i++) {
      let isNonZeroI = false;
      // строки
      for (let j = i; j < height; j++) {
        if (!isNonZeroI && this.M[j][i] != 0) {
          this.swap(i + 1, j + 1);
          j = i;
          isNonZeroI = true;
          continue;
        }
        if (isNonZeroI && j != i) {
          let main = this.M[i][i];

          this.add(i + 1, j + 1, -this.M[j][i] / main);
        }
      }
    }
  }

  private mod(a: number, mod: number | null = this.module): number {
    if (!mod) return a;
    if (a > 0) return a % mod;
    if (a < 0) return a + Math.ceil(-a / mod) * mod;
    return a;
  }

  private matrixModuleConvert(mod: number = this.module || 2) {
    for (let i = 0; i < this.M.length; i++) {
      for (let j = 0; j < this.M[i].length; j++) {
        let item = this.M[i][j];
        if (item > 0) this.M[i][j] %= mod;
        if (item < 0) this.M[i][j] = item + Math.ceil(-item / mod) * mod;
      }
    }
  }

  excludeMinusZero() {
    this.M = this.M.map(a => a.map(b => (b == 0 ? 0 : b)));
  }
}
