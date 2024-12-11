module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "perf",
        "revamp",
      ],
    ],
    "type-case": [0], // Disable case checking
    "type-empty": [0], // Allow empty type
    "scope-empty": [0], // Allow empty scope
    "scope-case": [0], // Disable scope case checking
    "subject-case": [0], // Disable subject case checking
    "subject-empty": [0], // Allow empty subject
    "header-max-length": [0] // Disable max length check
  },
};
