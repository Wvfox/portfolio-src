// Получение названия каталога проекта
import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

//Каталог с результатом
const buildFolder = './dist'
// Каталог с исходниками
const srcFolder = './src'

// Основная информация о путях к различным файлам
export const path = {
	// Куда копировать
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
	},
	// Откуда копировать
	src: {
		js: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`,
		files: `${srcFolder}/files/**/*.*`,
	},
	// За какими файлами следить
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		files: `${srcFolder}/files/**/*.*`,
	},
	// Каталог с результатом
	buildFolder: buildFolder,
	// Каталог с исходниками
	srcFolder: srcFolder,
	// Корневой каталог
	rootFolder: rootFolder,
}
