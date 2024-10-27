export enum EmployeeRole {
    DRIVER = "driver",
    COOK = "cook",
    WAITER = "waiter",
}
export enum EmployeeRoleRu {
    DRIVER = "Водитель",
    COOK = "Повар",
    WAITER = "Официант",
}

export interface IEmployee {
    id: string;
    name: string;
    isArchive: boolean;
    role: EmployeeRole | string;
    phone: string;
    birthday: string
}

