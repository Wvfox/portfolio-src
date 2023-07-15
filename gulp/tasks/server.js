// Функция для настройки и запуска локального сервера
export const server = done => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}`,
		},
		notify: false,
		port: 3000,
	})
}
