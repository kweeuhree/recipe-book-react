// format passed date
export const formattedDate = (dateToFormat) => {
    const formatted = new Date(dateToFormat).toDateString();
    return formatted;
}
