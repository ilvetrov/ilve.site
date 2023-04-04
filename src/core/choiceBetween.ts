export default function choiceBetween<Condition, First, Second>(
  condition: Condition,
  first: First,
  second: Second,
): First | Second {
  return condition ? first : second
}
