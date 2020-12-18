import Worker from "./worker.type";

export default interface Store {
    /**
     * The amount it costs to buy said store
     */
    cost: number;

    /**
     * Amount the store can be sold for
     */
    sellPrice: number;

    /**
     * All the workers in the store
     */
    workers: Worker[];

}