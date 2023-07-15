import { deleteAsync } from 'del'

// Функция для очистки папки с результатом
export const reset = () => {
	return deleteAsync(['dist'])
}
