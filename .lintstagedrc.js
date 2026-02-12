export default {
  // 1) 先格式化（对这些文件类型最有效）
  "*.{js,jsx,ts,tsx,mjs,cjs,cts,mts,vue,css,scss,less,html,json,md,yml,yaml}": ["prettier --write"],

  // 2) 再跑 eslint（只对代码文件；--fix 自动修能修的）
  "*.{js,jsx,ts,tsx,mjs,cjs,cts,mts,vue}": ["eslint --fix"],

  // 3) 最后拼写检查（只扫常见“会写字”的文件，减少噪音）
  "*.{js,jsx,ts,tsx,mjs,cjs,cts,mts,vue,md}": ["cspell lint --no-progress --gitignore"],
};
