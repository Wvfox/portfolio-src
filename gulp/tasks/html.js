import fileinclude from 'gulp-file-include'
import versionNumber from 'gulp-version-number'
import webpHtmlNosvg from 'gulp-webp-html-nosvg'

// Функция для копирования html файлов
export const html = () => {
	return (
		app.gulp
			.src(app.path.src.html)
			// Обработка ошибок
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'HTML',
						message: 'Error <%= error.message %>',
					})
				)
			)
			.pipe(fileinclude())
			// Форматирование алиасов
			.pipe(app.plugins.replace(/@img\//g, 'img/'))
			// Оптимизация изображений
			.pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
			// Настройка кеширования
			.pipe(
				app.plugins.if(
					app.isBuild,
					versionNumber({
						value: '%DT%',
						append: {
							key: '_v',
							cover: 0,
							to: ['css', 'js'],
						},
						output: {
							file: 'gulp/version.json',
						},
					})
				)
			)
			.pipe(app.gulp.dest(app.path.build.html))
			// Обновление страницы в браузере при изменении данных
			.pipe(app.plugins.browsersync.stream())
	)
}
