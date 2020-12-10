export default interface Worker {
    /**
     * The workers ID
     */
    workerId: string;
    /**
     * The workers name
     */
    workerName: string;
    /**
     * The type of item said worker sells
     */
    specialty: string;
    /**
     * The amount the worker can sell said item for
     */
    sellPrice: number;
    /**
     * Multiplier specific worker has on their sell price 
     */
    sellMulti: number;
    /**
     * Last time the user has interacted with said worker (Last time items were sold)
     */
    checkIn: number;
    /**
     * The amount of item said worker can put out
     */
    output: number;
}