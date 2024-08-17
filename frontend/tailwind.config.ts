/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		containerPolicy: {
			center: true,
			padding: "5rem",
		},
		screens: {
			xs: "450px",
			sm: "575px",
			md: "768px",
			lg: "992px",
			xl: "1200px",
			"2xl": "1400px",
		},
		extend: {
			fontFamily: {
				sans: ['"DM Sans"', "sans-serif"],
			},
			lineHeight: {
				64: "16rem",
			},
			colors: {
				linear: "#c6d1ed",
				current: "currentColor",
				transparent: "transparent",
				white: "#FFFFFF",
				black: "#121723",
				dark: "#1D2430",
				primary: "#8E54E9",
				secondary: "#E8456B",
				yellow: "#FBB040",
				neutral: "#14142B",
				danger: "red",

				"bg-color-dark": "#171C28",
				"body-color": {
					DEFAULT: "#788293",
					dark: "#959CB1",
				},
				stroke: {
					stroke: "#E3E8EF",
					dark: "#353943",
				},
				grayCookies: "#6F6C90",
				gray: {
					...colors.gray,
					dark: "#1E232E",
					light: "#F0F2F9",
				},
				"custom-blue": "#3A6AE5",
				"custom-black": "#000000",
			},
			boxShadow: {
				one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
				two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
				three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
				sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
				"sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
				"feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
				submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
				"submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
				btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
				"btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
				"btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
			},
			dropShadow: {
				three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
			},
			background: {
				"custom-gradient": "#c6d1ed",
			},
		},
	},
	plugins: [],
};
