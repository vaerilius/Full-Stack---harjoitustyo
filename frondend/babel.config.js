
module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          useBuiltIns: "entry"
        }
      }
    ]
  ],
  plugins: [
    ["styled-components", { ssr: true, displayName: true, preprocess: false }],
    [
      "module-resolver",
      {
        root: ["./"]
      }
    ]
  ],
  env: {
    dev: {
      plugins: [
        ["module-resolver", { root: ["./"] }],
        "transform-class-properties"
      ]
    },

      plugins: [
        ["transform-define", enviroments],
        ["module-resolver", { root: ["./"] }]
      ],
      comments: false,
      compact: true,
      minified: true
    }
  }
};