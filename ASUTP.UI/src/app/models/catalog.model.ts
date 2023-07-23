export interface CatalogElem {
    //id: string,
    id: number,
    element: string,
    reference: string,
    name: string,
    //price: number,
    price_wo_tax: number,
    //curr: string,
    currency: string,
    //note: string
    comment: string,
    desc?: string
}