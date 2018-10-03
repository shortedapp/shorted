export const findMinMax = arr => {
  let min = arr[0].y
  let max = arr[0].y
  for (let i = 1, len = arr.length; i < len; i++) {
    let v = arr[i].y
    if (v) {
        min = v < min ? v : min
        max = v > max ? v : max
    }
  }
  return [min, max]
}
