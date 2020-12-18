export default interface Worker {
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
}