import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'

// Функция для обработки изображений
export const images = () => {
	return (
		app.gulp
			.src(app.path.src.images)
			// Обработка ошибок
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'IMAGES',
						message: 'Error <%= error.message %>',
					})
				)
			)
			// Проверка обновления изображений
			.pipe(app.plugins.newer(app.path.build.images))
			// Создание .webp
			.pipe(app.plugins.if(app.isBuild, webp()))
			.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
			.pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images)))
			// Проверка обновления изображений
			.pipe(
				app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images))
			)
			// Оптимизация изображений
			.pipe(
				app.plugins.if(
					app.isBuild,
					imagemin({
						progressive: true,
						svgoPlugins: [{ removeViewBox: false }],
						interlaced: true,
						optimizationLevel: 3, // 0 to 7
					})
				)
			)
			.pipe(app.gulp.dest(app.path.build.images))
			.pipe(app.gulp.src(app.path.src.svg))
			.pipe(app.gulp.dest(app.path.build.images))
			// Обновление страницы в браузере при изменении данных
			.pipe(app.plugins.browsersync.stream())
	)
}
