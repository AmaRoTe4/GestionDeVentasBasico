export interface InterProductos{
    id:number;
    precio:number;
    nombre:string;
    vendidos:number;
}

export interface InterProductosVendidos{
    nombre:string;
    precioPorUnidad:number;
    cantidad:number;
}
export interface InterVentas{
    id:number;
    venta:InterProductosVendidos[]
}