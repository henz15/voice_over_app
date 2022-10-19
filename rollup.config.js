import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import uglify from "@lopatnov/rollup-plugin-uglify";

export default {
  input: "src/js/main.js",
  output: {
    file: "dist/js/app.js",
    format: "umd",
    name: "TTS",
    sourceMap: false,
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    commonjs({
      namedExports: {},
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve(),
    uglify(),
  ],
};
