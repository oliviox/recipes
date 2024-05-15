export const weekDiff = (store, currentDate = new Date()) => {
    const storedDate = store.getItem('lastDate');
    if (!storedDate || isNaN(Date.parse(storedDate))) {
        store.setItem('lastDate', currentDate.toISOString());
        return 0;
    }
    const startDate = new Date(storedDate);
    const diffInDays = Math.floor((currentDate - startDate) / (1000 * 3600 * 24));

    // Calculate the number of weeks, considering Sunday as the last day of the week
    const startDayOfWeek = (startDate.getDay() + 6) % 7; // Adjust so Monday is 0 and Sunday is 6
    const currentDayOfWeek = (currentDate.getDay() + 6) % 7;
    const diffInWeeks = Math.floor(diffInDays / 7) + (currentDayOfWeek < startDayOfWeek ? 1 : 0);

    return diffInWeeks;
};

export const getStoredLastDate = (store) => {
    const storedDate = store.getItem('lastDate');
    return storedDate !== null ? new Date(storedDate) : null;
};

export const setStoredLastDate = (store, date) => {
    store.setItem('lastDate', date.toISOString());
};

export const getStoredWeek = (store) => {
    const storedWeek = store.getItem('selectedWeek');
    return storedWeek !== null ? Number(storedWeek) : 0;
};

export const setStoredWeek = (store, week) => {
    store.setItem('selectedWeek', week);
};
