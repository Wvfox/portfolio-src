import browsersync from 'browser-sync'
import ifPlugin from 'gulp-if'
import newer from 'gulp-newer'
import notify from 'gulp-notify'
import plumber from 'gulp-plumber'
import replace from 'gulp-replace'

// Экспортируемый объект
export const plugins = {
	replace: replace, // Поиск и замена
	plumber: plumber, // Обработка ошибок
	notify: notify, // Сообщения (подсказки)
	browsersync: browsersync, // Локальный сервер
	newer: newer, // Проверка обновления (картинок)
	if: ifPlugin, // Условное ветвление
}
