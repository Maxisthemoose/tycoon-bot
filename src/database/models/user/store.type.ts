export default interface Store {
    /**
     * The type of store
     */
    type: string;
    /**
     * The amount it costs to buy said store
     */
    cost: number;
    /**
     * The number of items the store outputs per minute
     */
    output: number;
    /**
     * The amount the store can be sold to another user for [dynamic depending on upgrades]
     */
    sellPrice: number;
    /**
     * The designated items sell price in said store
     */
    itemSellPrice: number;
    /**
     * The ID of the specific store, only relates to the user (Two Users can have stores with the same ID's)
     */
    storeId: number;
    /**
     * The time in MS when the user last interacted with this store
     */
    lastCheckIn: number;

}