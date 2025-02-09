import { SyncExpectationResult } from "expect/build/types"
import { getElementText, getMessage, InputArguments } from "../utils"

const toEqualValue: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const { elementHandle, expectedValue } = await getElementText(...args)
    /* istanbul ignore next */
    const actualTextContent = await elementHandle.evaluate(
      (el) => (el as HTMLInputElement).value
    )

    return {
      pass: actualTextContent?.includes(expectedValue),
      message: () =>
        getMessage(this, "toEqualValue", expectedValue, actualTextContent),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toEqualValue
