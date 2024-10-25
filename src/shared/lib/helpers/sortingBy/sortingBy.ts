
const enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
} 
const enum SortBy {
    NAME = "name",
    DATE = "date"
}


export function sortingBy(by: any, order: any, arr: any[]) {
    switch(by){
        case SortBy.NAME:
            console.log('213')
            return arr.sort( (a, b) => a.name > b.name ? 1 : -1)
        case SortBy.DATE:
            arr.sort( (a, b) => {
                //@ts-ignore
                const dateA = a.split('.').reverse().join()
                //@ts-ignore
                const dateB = b.split('.').reverse().join()
                return dateA < dateB ? -1 : (dateA > dateB ? 1 : 0)
            })
    }
}




    // const sortingByName = () => {
    //     const sorting = [...employees].sort((a, b) =>
    //         a.name > b.name ? 1 : -1,
    //     )
    //     setEmployees(sorting)
    // }
    // const sortingByData = () => {
    //     const sorting = [...employees].sort((a, b) => {
    //         const dateA = a.birthday.split('.').reverse().join()
    //         const dateB = b.birthday.split('.').reverse().join()
    //         return dateA < dateB ? -1 : (dateA > dateB ? 1 : 0)
    //     })
        
    //     setEmployees(sorting)
    // }