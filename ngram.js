/**
* Author: Rey
* Description: utilizes n-gram approach to generate
*              webnovels
**/
class NGram {
  constructor (n) {
    this.n = n;
    this.placeholder = '';
    this.grams = {};
  }
  add (resource) {
    const n = this.n;
    
    if (n === 0) return;
    
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
  generate (characters) {
    let gen = this.placeholder;
    let gram = gen;
    let choices = this.grams[gram];
  }
  clear () {
    this.n = 0;
    this.grams = {};
    return this;
  }
}
