module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.tsx?$": "babel-jest", // or ts-jest for TypeScript
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // Transpile axios and other ESM modules
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
