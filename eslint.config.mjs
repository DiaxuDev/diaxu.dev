import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import next from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

import prettier from "eslint-config-prettier";

export default tseslint.config(
	{
		ignores: [".next"],
	},

	// Base eslint
	eslint.configs.recommended,
	tseslint.configs.recommended,

	// React
	react.configs.flat.recommended,
	react.configs.flat["jsx-runtime"],
	reactHooks.configs["recommended-latest"],

	// Other plugins
	prettier,

	// Legacy plugins
	{
		plugins: {
			"@next/next": next,
		},
		rules: {
			...next.configs.recommended.rules,
			...next.configs["core-web-vitals"].rules,
		},
	},

	// Settings
	{
		settings: {
			react: {
				version: "detect",
			},
			tailwindcss: {
				callees: ["clsx", "cn"],
			},
		},

		rules: {
			eqeqeq: "error",
			"@typescript-eslint/no-unused-vars": "warn",
			"@next/next/no-img-element": "off",
		},
	},
);
