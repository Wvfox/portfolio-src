import rename from 'gulp-rename'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'

import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import webpcss from 'gulp-webpcss'

const sass = gulpSass(dartSass)

// Функция для обработки scss файлов
export const scss = () => {
	return (
		app.gulp
			// Создание карты исходников .map
			.src(app.path.src.scss, { sourcemaps: app.isDev })
			// Обработка ошибок
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'SCSS',
						message: 'Error <%= error.message %>',
					})
				)
			)
			// Форматирование алиасов
			.pipe(app.plugins.replace(/@img\//g, '../img/'))
			// Сжатие scss файла
			.pipe(
				sass({
					outputStyle: 'expanded',
				})
			)
			// Группировка медиа-запросов
			.pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
			// Обработка изображений
			.pipe(
				app.plugins.if(
					app.isBuild,
					webpcss({
						webpClass: '.webp',
						noWebpClass: '.no-webp',
					})
				)
			)
			// Добавление префиксов для свойств
			.pipe(
				app.plugins.if(
					app.isBuild,
					autoprefixer({
						grid: true,
						overrideBrowserslist: ['last 3 versions'],
						cascade: true,
					})
				)
			)
			// Создание не сжатой версии .css стилей
			//.pipe(app.gulp.dest(app.path.build.css))
			// Создание сжатой версии .min.css стилей
			.pipe(app.plugins.if(app.isBuild, cleanCss()))
			.pipe(
				rename({
					extname: '.min.css',
				})
			)
			.pipe(app.gulp.dest(app.path.build.css))
			// Обновление страницы в браузере при изменении данных
			.pipe(app.plugins.browsersync.stream())
	)
}
