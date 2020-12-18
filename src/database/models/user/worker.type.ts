export default interface Worker {
<<<<<<< HEAD
  /**
   * The type of worker
   */
  type: string;
  /**
   * The level of a worker
   */
  level: string;
  /**
   * How much each worker outputs
   */
  output: string;
=======
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
>>>>>>> 2fd40b04c7fd75792ae2e30fe85a941df19b91cb
}