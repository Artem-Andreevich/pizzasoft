export function convertDate(date: string): string{
    if(date.match(/^\d{2}.\d{2}.\d{4}/g)) {
        return date.split('.').reverse().join('-')
    } else if (date.match(/^\d{4}-\d{2}-\d{2}/g)) {
        return date.split('-').reverse().join('.')
    }
    return date
}