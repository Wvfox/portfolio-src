import { deleteAsync } from 'del'
import zipPlugin from 'gulp-zip'

// Функция создания архива с результатом
export const zip = () => {
	// Удаление существующего архива
	deleteAsync([`./${app.path.rootFolder}.zip`])
	return (
		app.gulp
			.src(`${app.path.buildFolder}/**/*.*`, {})
			// Обработка ошибок
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'ZIP',
						message: 'Error <%= error.message %>',
					})
				)
			)
			// Создание архива
			.pipe(zipPlugin(`${app.path.rootFolder}.zip`))
			.pipe(app.gulp.dest('./'))
	)
}
