
function toInterger(value: number): number {
  const remainder = value % 1

  return remainder ? value - remainder : value
}


export default toInterger