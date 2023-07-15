import webpack from 'webpack-stream'

// Функция для обработки js-файлов
export const js = () => {
	return (
		app.gulp
			// Создание карты исходников .map
			.src(app.path.src.js, { sourcemaps: app.isDev })
			// Обработка ошибок
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'JS',
						message: 'Error <%= error.message %>',
					})
				)
			)
			// Сборка модулей и оптимизация js-файлов
			.pipe(
				webpack({
					mode: app.isBuild ? 'production' : 'development',
					output: {
						filename: 'app.min.js',
					},
				})
			)
			.pipe(app.gulp.dest(app.path.build.js))
			// Обновление страницы в браузере при изменении данных
			.pipe(app.plugins.browsersync.stream())
	)
}
