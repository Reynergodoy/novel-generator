/**
* Author: Rey
* Description: utilizes n-gram approach to generate
*              webnovels
**/
class NGram {
  constructor (n) {
    this.n = (typeof n === "number") ? n : 1;
    this.placeholder = '';
    this.grams = {};
  }
  add (resource) {
    const n = this.n;
    
    if (n === 0) return;
    if (typeof resource !== 'string') return;
    
    this.placeholder = resource.substring(0, n);
    
    const resLen = resource.length;
    const len = resLen - n;
    const grams = this.grams;
    for (let i = 0; i <= len; i++) {
      const gram = resource.substring(i, i + this.n);
      if (!grams[gram]) grams[gram] = {};
      if ((i + n) >= resLen) break;
      const _gram = grams[gram];
      const _res = resource[i + n];
      
      if (!_gram[_res]) _gram[_res] = 1;
      else _gram[_res]++;
    }
    return this;
  }
  generate (iterations) {
    if (typeof iterations !== "number") return;
    const n = this.n;
    const grams = this.grams;
    let gen = this.placeholder;
    let gram = gen;
    for (let i = 0; i < iterations; i++) {
      const choices = this.grams[gram];
      let total = 0;
      for (const choice in choices) {
        total += choices[choice];
      }
      const random = Math.ceil(Math.random() * total);
      total = 0;
      for (const choice in choices) {
        total += choices[choice];
        if (total >= random) {
          gen += choice;
          break;
        }
      }
      const _gLen = gen.length;
      gram = gen.substring(_gLen - n, _gLen);
    }
    return gen;
  }
  clear () {
    this.n = 0;
    this.grams = {};
    return this;
  }
}
