export function getEnumValues<T extends string, TEnumValue extends string>
(enumVariable: { [key in T]: TEnumValue }) {
    return Object.values(enumVariable) as Array<T>;
}