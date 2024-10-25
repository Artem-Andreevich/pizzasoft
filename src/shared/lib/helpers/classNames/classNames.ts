// Mods это обьект, ключ которого это css класс, а значение - флаг для установки этого класса
type Mods = Record<string, string | boolean>

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            // Если значение !true, класс не применяем 
            .filter( ([className, value]) => Boolean(value))
            .map( ([className]) => className)
    ].join(" ")
}