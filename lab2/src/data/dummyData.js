// Генерація початкового масиву з 15 новин
export const INITIAL_NEWS = Array.from({ length: 15 }).map((_, i) => ({
    id: String(i + 1),
    title: `Новина ${i + 1}`,
    description: `Це детальний текст для новини номер ${i + 1}. Тут можуть бути описані дуже важливі події, технічні характеристики або просто цікава інформація.`,
    image: 'https://via.placeholder.com/150/000000/FFFFFF/?text=News'
}));

// Згруповані дані для SectionList (Контакти)
export const CONTACTS_DATA = [
    { title: 'А', data: ['Аліна', 'Андрій', 'Антон'] },
    { title: 'Б', data: ['Богдан', 'Борис'] },
    { title: 'В', data: ['Валентин', 'Вікторія', 'Володимир'] },
    { title: 'Г', data: ['Ганна', 'Григорій'] },
    { title: 'Д', data: ['Дарина', 'Дмитро', 'Денис'] },
];