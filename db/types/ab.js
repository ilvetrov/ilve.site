import ABTesting from "~/plugins/ab-testing"
import Processor from "./processor"

export default class ABProcessor extends Processor {
  constructor(context) {
    super()
    this.abTesting = new ABTesting(context)
  }
  block(key, data) {
    return this.abTesting.getValue(`db_${key}`, data.variants)
  }
}