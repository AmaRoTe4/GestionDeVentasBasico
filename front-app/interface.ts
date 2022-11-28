export interface InterProductos{
    id:number;
    precio:number;
    nombre:string;
    vendidos:number;
}

export interface ProductoVendido{
    id:number,
    vendidos:number;
}

export interface InterVentas{
    id?:number
    precio?:number
    cantidad?:number
    venta:string
    productos?:ProductoVendido[] 
}