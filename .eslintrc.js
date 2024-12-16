import module from "node:module";
import process from "node:process";

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential", // 基本规则
    "eslint:recommended", // ESLint 推荐规则
    "@vue/prettier", // 使用 Prettier 格式化代码
  ],
  parserOptions: {
    parser: "babel-eslint", // 使用 Babel 解析器
  },
  rules: {
    // 自定义规则
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境下警告 console
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境下警告 debugger
    "vue/multi-word-component-names": "off", // 关闭组件名必须多词的规则
    eqeqeq: ["warn", "smart"], // 使用 === 和 !== 而不是 == 和 !=，但允许在比较 null 时使用 ==
    // 将 no-unused-vars 配置为警告，并忽略对象解构中的剩余属性
    "no-unused-vars": ["warn", { ignoreRestSiblings: true }],
    "space-before-function-paren": ["warn", "always"], // 函数定义时括号前面是否需要空格
    "prettier/prettier": ["error", { singleQuote: true, semi: false }], // Prettier 配置
    "no-const-assign": "error", // 禁止修改 const 声明的变量
    "comma-dangle": ["error", "never"], // 要求或禁止末尾逗号
    semi: ["warn", "always"], // 强制在代码结尾添加分号
    "no-undef": "warn", // 未声明的变量
  },
};
