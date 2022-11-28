import { InterProductos, ProductoVendido } from "../../../../interface"

interface PropsAgregarProductos{
    prtsPorVender:InterProductos[],
    cantidad:number,
    eleSelc:InterProductos,
    setPrtsPorVender:React.Dispatch<React.SetStateAction<InterProductos[]>>
}

export const AgregarProducto = ({
    prtsPorVender,
    cantidad,
    eleSelc,
}:PropsAgregarProductos):InterProductos[] => {
    let aux:InterProductos = prtsPorVender.filter(n => n.nombre === eleSelc.nombre)[0]

    if(aux !== undefined) aux.vendidos += cantidad
    else{
        aux = {
            id: eleSelc.id,
            nombre: eleSelc.nombre,
            precio: eleSelc.precio,
            vendidos: cantidad
        } 
    }

    let retorno:InterProductos[] = prtsPorVender.filter(n => n.nombre !== eleSelc.nombre)

    return [aux , ...retorno]
}